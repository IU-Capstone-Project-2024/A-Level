import './QuestionsPage.css';
import axios from "axios";
import Dropdown from '../../components/DropdownQuestionsMenu/DropdownQuestionsMenu';
import Table from '../../components/QuestionsTable/QuestionsTable';
import markIcon from '../../images/markIcon.svg'
import yearIcon from '../../images/yearIcon.svg'
import topicIcon from '../../images/topicIcon.svg'
import cancelIcon from '../../images/cancelOptionIcon.svg'
import { useState, useEffect, useReducer } from 'react';
import Pagination from '../../components/PaginationUploaded/PaginationUploaded';
import { useTopics } from '../../context/TopicContext';
import { text } from 'stream/consumers';
import { Option } from '../../components/Option';


const maxQuestionsPerPage = 6;

export default function Questions() {
    const [ques, setQues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalQues, setTotalQues] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const {topics} = useTopics();
    const [yearsOptions, setYearsOptions] = useState<Option[]>([]);
    const [marksOptions, setMarksOptions] = useState<Option[]>([]);
    const [topicsOptions, setTopicsOptions] = useState<Option[]>([]);
    const [yearsFilter, setYearsFilter] = useState<number[]>([]);
    const [marksFilter, setMarksFilter] = useState<number[]>([]);
    const [topicFilter, setTopicsFilter] = useState<number[]>([]);

    async function getQues(page: number, length: number, marks: number[], years: number[], topics: number[]) {
        const par1 = 'http://localhost:8000/task?';
        const par2 = 'offset=' + (page - 1);
        const par3 = '&length=' + length;
        const par4 = '&marks=' + marks.join(',');
        const par5 = '&year=' + years.join(','); 
        const par6 = '&topic=' + topics.join(',');
        const req = par1 + par2 + par3 + par4 + par5 + par6;
        const res = await axios.get(req);
        return res.data;
    }

    async function getQuesTotal(page: number, length: number, marks: number[], years: number[], topics: number[]) {
        const par1 = 'http://localhost:8000/task/number?';
        const par2 = 'offset=' + (page - 1);
        const par3 = '&length=' + length;
        const par4 = '&marks=' + marks.join(',');
        const par5 = '&year=' + years.join(','); 
        const par6 = '&topic=' + topics.join(',');
        const req = par1 + par2 + par3 + par4 + par5 + par6;
        const res = await axios.get(req);
        return res.data;
    }

    async function getUtils() {
        const res = await axios.get('http://localhost:8000/utils');
        return res.data;
    }

    function transformString(input: string | undefined) {
        if(input == null) 
            return 'Unknown';
        let result = input.replace(/_/g, ' ');
        result = result.toLowerCase();
        result = result.charAt(0).toUpperCase() + result.slice(1);
        return result;
    }

    useEffect(() => {
        async function fetchUtils() {
            const utils = await getUtils();
            const yearsKeys = Object.keys(utils.years);
            const yearsOptions: Option[] = yearsKeys.map((val, index) => ({
                text: val,
                type_id: 2,
                backend_id: index,
                id: index,
            }));
            setYearsOptions(yearsOptions);
    
            const marksKeys = Object.keys(utils.marks);
            const marksOptions: Option[] = marksKeys.map((val, index) => ({
                text: val,
                type_id: 1,
                backend_id: index,
                id: index + yearsOptions.length,
            }));
            setMarksOptions(marksOptions);
    
            let topicsKeys: string[] = [];
            if (topics !== undefined) topicsKeys = topics.names;
    
            const topicsOptions: Option[] = topicsKeys.map((val, index) => ({
                text: val,
                type_id: 0,
                backend_id: index,
                id: index + yearsOptions.length + marksOptions.length,
            }));
            setTopicsOptions(topicsOptions);
        }
    
        // update filters
        let yearsFil: number[] = [];
        let marksFil: number[] = [];
        let topicsFil: number[] = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions[i].type_id === 0)
                topicsFil = [...topicsFil, selectedOptions[i].backend_id];
            else if (selectedOptions[i].type_id === 1)
                marksFil = [...marksFil, Number(selectedOptions[i].text)];
            else if (selectedOptions[i].type_id === 2)
                yearsFil = [...yearsFil, Number(selectedOptions[i].text)];
        }
        setTopicsFilter(topicsFil);
        setMarksFilter(marksFil);
        setYearsFilter(yearsFil);
    
        fetchUtils();
    }, [page, selectedOptions]);
    
    useEffect(() => {
        async function fetchQues() {
            setLoading(true);
            const fetchedQues = await getQues(page, maxQuestionsPerPage, marksFilter, yearsFilter, topicFilter);
            const totalQues = await getQuesTotal(page, maxQuestionsPerPage, marksFilter, yearsFilter, topicFilter);
            setTotalQues(totalQues);
            setQues(fetchedQues);
            setLoading(false);
        }
        fetchQues();
    }, [marksFilter, yearsFilter, topicFilter]);
    
    useEffect(() => {
        for (let i = 0; i < selectedOptions.length; i++) {
            console.log(selectedOptions[i].text);
        }
        console.log('topics:', topicFilter, 'marks:', marksFilter, 'years:', yearsFilter);
    }, [topicFilter, marksFilter, yearsFilter]);
    

    function test(updatedPage:number){
        setPage(updatedPage);
    }
    
    const handleOptionClick = (option: Option) => {
        setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
    };

    const handleOptionUnclick = (option: Option) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((selectedOption) => selectedOption.id !== option.id)
        );
    };

    const clearAllOptions = () => {
        setSelectedOptions([]);
    };


    const data = ques.map(({content, topic, _id}) => ({
        question: content, topic: transformString(topics?.names[topic]), id: _id
    }));

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="questions-page-content">
            <div className="dropdown-container">
                <Dropdown 
                    title='Topic'
                    icon={topicIcon}
                    options={topicsOptions} 
                    onOptionClick={handleOptionClick} 
                    onOptionUnclick={handleOptionUnclick} 
                    selectedOptions={selectedOptions}
                />
                <Dropdown 
                    title='Mark'
                    icon={markIcon}
                    options={marksOptions} 
                    onOptionClick={handleOptionClick} 
                    onOptionUnclick={handleOptionUnclick} 
                    selectedOptions={selectedOptions}
                />
                <Dropdown 
                    title='Year'
                    icon={yearIcon}
                    options={yearsOptions} 
                    onOptionClick={handleOptionClick} 
                    onOptionUnclick={handleOptionUnclick} 
                    selectedOptions={selectedOptions}
                />
            </div>
            <div className='hr'></div>
            <div className="selected-options">
                <div className="selected-options-list">
                    {selectedOptions.map((option) => (
                        <div key={option.id} className="selected-option-tile">
                            <span>{option.text}</span>
                            &nbsp; &nbsp;
                            <img src={cancelIcon} alt='cancel' className='cancel-btn' onClick={() => handleOptionUnclick(option)}></img>
                        </div>
                    ))}
                </div>
                <button className="clear-button" onClick={clearAllOptions}>Clear All</button>
            </div>
            <Table data={data} />
            <Pagination total={Math.ceil(totalQues/maxQuestionsPerPage)} onUpdatePage={test} page={page}/>
        </div>
    );
}

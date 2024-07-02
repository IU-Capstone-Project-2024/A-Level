import './QuestionsPage.css';
import axios from "axios";
import Dropdown from '../../components/DropdownQuestionsMenu/DropdownQuestionsMenu';
import Table from '../../components/QuestionsTable/QuestionsTable';
import markIcon from '../../images/markIcon.svg'
import yearIcon from '../../images/yearIcon.svg'
import topicIcon from '../../images/topicIcon.svg'
import cancelIcon from '../../images/cancelOptionIcon.svg'
import { useState, useEffect } from 'react';
import Pagination from '../../components/PaginationUploaded/PaginationUploaded';

const maxQuestionsPerPage = 5;
const totalQuestions = 12;

interface Option {
    id: number;
    text: string;
}

const topicOptions: Option[] = [
    { id: 0, text: 'Marketing mix and strategy and whatever it takes'},
    { id: 1, text: 'Marketing mix and strategy'},
    { id: 2, text: 'Entrepreneurs and leaders'},
    { id:10, text: 'Marketing mix and strategy and whatever it takes'},
    { id: 12, text: 'Marketing mix and strategy and whatever it takes'},
    { id: 13, text: 'Marketing mix and strategy and whatever it takes'},
    { id: 14, text: 'Marketing mix and strategy and whatever it takes'},
    { id: 15, text: 'Marketing mix and strategy and whatever it takes'},
];

const markOptions: Option[] = [
    { id: 3, text: '1 points'},
    { id: 4, text: '2 points'},
    { id: 5, text: '3 points'},
    { id: 6, text: '4 points'},
];

const yearOptions: Option[] = [
    { id: 7, text: '2021'},
    { id: 8, text: '2022'},
    { id: 9, text: '2023'},
];

interface TableData {
    topic: string;
    question: string;
    id: number;
}

const data: TableData[] = [
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 0},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 1},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 2},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 3},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 4},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 5},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 6},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 7},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 8},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 9},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 10},
    { topic: 'Marketing mix and strategy', question: 'Define the term ‘brand’.', id: 11},
];

let page = 1;

function test(updatedPage:number){
    page = updatedPage;
    console.log(page);
}

export default function Questions() {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

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

    useEffect(() => {
        console.log("Current filters are:", selectedOptions.map(option => option.text).join(", "));
    }, [selectedOptions]);

    return (
        <div className="questions-page-content">
            <div className="dropdown-container">
                <Dropdown 
                    title='Topic'
                    icon={topicIcon}
                    options={topicOptions} 
                    onOptionClick={handleOptionClick} 
                    onOptionUnclick={handleOptionUnclick} 
                    selectedOptions={selectedOptions}
                />
                <Dropdown 
                    title='Mark'
                    icon={markIcon}
                    options={markOptions} 
                    onOptionClick={handleOptionClick} 
                    onOptionUnclick={handleOptionUnclick} 
                    selectedOptions={selectedOptions}
                />
                <Dropdown 
                    title='Year'
                    icon={yearIcon}
                    options={yearOptions} 
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
            <Pagination total={Math.ceil(totalQuestions/maxQuestionsPerPage)} onUpdatePage={test} page={page}/>
        </div>
    );
}

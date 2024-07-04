import './QuestionsPage.css';
import axios from 'axios';
import Dropdown from '../../components/DropdownQuestionsMenu/DropdownQuestionsMenu';
import Table from '../../components/QuestionsTable/QuestionsTable';
import markIcon from '../../images/markIcon.svg';
import yearIcon from '../../images/yearIcon.svg';
import topicIcon from '../../images/topicIcon.svg';
import cancelIcon from '../../images/cancelOptionIcon.svg';
import { useState, useEffect } from 'react';
import Pagination from '../../components/PaginationUploaded/PaginationUploaded';
import { useTopics } from '../../context/TopicContext';

const maxQuestionsPerPage = 5;

interface Option {
  id: number;
  type_id: number;
  backend_id: number;
  text: string;
}

export default function Questions() {
  const [ques, setQues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalQues, setTotalQues] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const { topics } = useTopics();
  const [yearsOptions, setYearsOptions] = useState<Option[]>([]);
  const [marksOptions, setMarksOptions] = useState<Option[]>([]);
  const [topicsOptions, setTopicsOptions] = useState<Option[]>([]);
  const [yearsFilter, setYearsFilter] = useState<number[]>([]);
  const [marksFilter, setMarksFilter] = useState<number[]>([]);
  const [topicFilter, setTopicsFilter] = useState<number[]>([]);

  async function getQues(page: number, length: number) {
    const res = await axios.get('http://localhost:8000/task', {
      params: {
        offset: page - 1,
        length: length,
      },
    });
    return res.data;
  }

  async function getUtils() {
    const res = await axios.get('http://localhost:8000/utils');
    return res.data;
  }

  function transformString(input: string | undefined) {
    if (input == null) return 'Unknown';
    let result = input.replace(/_/g, ' ');
    result = result.toLowerCase();
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }

  useEffect(() => {
    async function fetchQues() {
      setLoading(true);
      const fetchedQues = await getQues(page, maxQuestionsPerPage);
      const totalQues = await axios.get('http://localhost:8000/task/number');
      setTotalQues(totalQues.data);
      setQues(fetchedQues);
      setLoading(false);
    }
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

    //update filters
    let yearsFil: number[] = [];
    let marksFil: number[] = [];
    let topicsFil: number[] = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i].type_id === 0)
        topicsFil = [...topicsFil, selectedOptions[i].backend_id];
      else if (selectedOptions[i].type_id === 1)
        marksFil = [...marksFil, selectedOptions[i].backend_id];
      else if (selectedOptions[i].type_id === 2)
        yearsFil = [...yearsFil, selectedOptions[i].backend_id];
    }
    setTopicsFilter(topicsFil);
    setMarksFilter(marksFil);
    setYearsFilter(yearsFil);

    fetchQues();
    fetchUtils();
    console.log(
      'topics:',
      topicFilter,
      'marks:',
      marksFilter,
      'years:',
      yearsFilter,
    );
  }, [page, selectedOptions, selectedOptions]);

  function test(updatedPage: number) {
    setPage(updatedPage);
  }

  const handleOptionClick = (option: Option) => {
    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions,
      option,
    ]);
  };

  const handleOptionUnclick = (option: Option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter(
        (selectedOption) => selectedOption.id !== option.id,
      ),
    );
  };

  const clearAllOptions = () => {
    setSelectedOptions([]);
  };

  const data = ques.map(({ content, topic, _id }) => ({
    question: content,
    topic: transformString(topics?.names[topic]),
    id: _id,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="questions-page-content">
      <div className="dropdown-container">
        <Dropdown
          title="Topic"
          icon={topicIcon}
          options={topicsOptions}
          onOptionClick={handleOptionClick}
          onOptionUnclick={handleOptionUnclick}
          selectedOptions={selectedOptions}
        />
        <Dropdown
          title="Mark"
          icon={markIcon}
          options={marksOptions}
          onOptionClick={handleOptionClick}
          onOptionUnclick={handleOptionUnclick}
          selectedOptions={selectedOptions}
        />
        <Dropdown
          title="Year"
          icon={yearIcon}
          options={yearsOptions}
          onOptionClick={handleOptionClick}
          onOptionUnclick={handleOptionUnclick}
          selectedOptions={selectedOptions}
        />
      </div>
      <div className="hr"></div>
      <div className="selected-options">
        <div className="selected-options-list">
          {selectedOptions.map((option) => (
            <div key={option.id} className="selected-option-tile">
              <span>{option.text}</span>
              &nbsp; &nbsp;
              <img
                src={cancelIcon}
                alt="cancel"
                className="cancel-btn"
                onClick={() => handleOptionUnclick(option)}
              ></img>
            </div>
          ))}
        </div>
        <button className="clear-button" onClick={clearAllOptions}>
          Clear All
        </button>
      </div>
      <Table data={data} />
      <Pagination
        total={Math.ceil(totalQues / maxQuestionsPerPage)}
        onUpdatePage={test}
        page={page}
      />
    </div>
  );
}

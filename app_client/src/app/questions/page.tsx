'use client';
import styles from './questions.module.css';
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
import { Option } from '../../components/Option';
import Image from 'next/image';

const maxQuestionsPerPage = 10;

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

  async function getQues(
    page: number,
    length: number,
    marks: number[],
    years: number[],
    topics: number[],
  ) {
    const par1 = 'https://chartreuse-binghamite1373.my-vm.work/task/?';
    const par2 = 'offset=' + (page - 1);
    const par3 = '&length=' + length;
    const par4 = '&marks=' + marks.join(',');
    const par5 = '&year=' + years.join(',');
    const par6 = '&topic=' + topics.join(',');
    const req = par1 + par2 + par3 + par4 + par5 + par6;
    const res = await axios.get(req);
    return res.data;
  }

  async function getQuesTotal(
    page: number,
    length: number,
    marks: number[],
    years: number[],
    topics: number[],
  ) {
    const par1 = 'https://chartreuse-binghamite1373.my-vm.work/task/number?';
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
    const res = await axios.get(
      'https://chartreuse-binghamite1373.my-vm.work/utils/',
    );
    return res.data;
  }

  function transformString(input: string | undefined) {
    if (input == null) return 'Not Assigned';
    let result = input.replace(/_/g, ' ');
    result = result.toLowerCase();
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }

  useEffect(() => {
    async function fetchUtils() {
      const utils = await getUtils();

      // there are no utils returned from the backend
      if(utils === null) {
        const yearsOptions: Option[] = [{
          text: 'No available option',
          type_id: 3,
          backend_id: 0,
          id: 100,
        }];
        setYearsOptions(yearsOptions);

        const marksOptions: Option[] = [{
          text: 'No available option',
          type_id: 3,
          backend_id: 0,
          id: 100,
        }];
        setMarksOptions(marksOptions);

        const topicsOptions: Option[] = [{
          text: 'No available option',
          type_id: 3,
          backend_id: 0,
          id: 100,
        }];
        setTopicsOptions(topicsOptions);
        return;
      }

      const yearsKeys = Object.keys(utils.years);
      const yearsOptions: Option[] = yearsKeys.map((val, index) => ({
          text: val,
          type_id: 2,
          backend_id: index,
          id: index,
      }));
      
      setYearsOptions(yearsOptions.length === 0 ? [{
        text: 'No available option',
        type_id: 3,
        backend_id: 0,
        id: 100,
      }] : yearsOptions);

      const marksKeys = Object.keys(utils.marks);
      const marksOptions: Option[] = marksKeys.map((val, index) => ({
          text: val,
          type_id: 1,
          backend_id: index,
          id: index + yearsOptions.length,
      }));
      setMarksOptions(marksOptions.length === 0 ? [{
        text: 'No available option',
        type_id: 3,
        backend_id: 0,
        id: 100,
      }] : marksOptions);

      let topicsKeys: string[] = [];
      if (topics !== undefined) topicsKeys = topics.names;

      const topicsOptions: Option[] = topicsKeys.map((val, index) => ({
          text: transformString(val),
          type_id: 0,
          backend_id: index,
          id: index + yearsOptions.length + marksOptions.length,
      }));
      setTopicsOptions(topicsOptions.length === 0 ? [{
        text: 'No available option',
        type_id: 3,
        backend_id: 0,
        id: 100,
      }] : topicsOptions);
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
      const fetchedQues = await getQues(
        page,
        maxQuestionsPerPage,
        marksFilter,
        yearsFilter,
        topicFilter,
      );
      const totalQues = await getQuesTotal(
        page,
        maxQuestionsPerPage,
        marksFilter,
        yearsFilter,
        topicFilter,
      );
      setTotalQues(totalQues);
      setQues(fetchedQues);
      setLoading(false);
    }
    fetchQues();
  }, [marksFilter, yearsFilter, topicFilter]);


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

  const data = ques.map(({ content, topic, id }) => ({
    question: content,
    topic: transformString(topics?.names[topic]),
    id: id,
  }));

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.questions_page_content}>
      <div className={styles.content_questions_table_without_pagination}>
      <div className={styles.questions_page_upper_part}>
        <div className={styles.dropdown_container}>
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

        <div className={styles.hr}></div>
        <div className={styles.selected_options}>
          <div className={styles.selected_options_list}>
            {selectedOptions.map((option) => (
              <div key={option.id} className={styles.selected_option_tile}>
                <span>{option.text}</span>
                &nbsp; &nbsp;
                <Image
                  src={cancelIcon}
                  alt="cancel"
                  className={styles.cancel_btn}
                  onClick={() => handleOptionUnclick(option)}
                ></Image>
              </div>
            ))}
          </div>
          <button className={styles.clear_button} onClick={clearAllOptions}>
            Clear All
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <div className={styles.no_data_questions}>No data to display</div>
      ) : (
        <Table data={data} />
      )}
      </div>
      <Pagination
        total={Math.ceil(totalQues / maxQuestionsPerPage)}
        onUpdatePage={test}
        page={page}
      />
    </div>
  );
}

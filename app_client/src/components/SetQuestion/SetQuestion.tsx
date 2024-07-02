import { FormEvent, useEffect, useState } from 'react';
import InputText from '../InputText/InputText';
import './SetQuestion.css';
import InputDropdown from '../InputDropdown/InputDropdown';
import InputNumber from '../InputNumber/InputNumber';
import YearPicker from '../YearPicker/YearPicker';
import axios, { AxiosResponse } from 'axios';
import { useTopics } from '../../context/TopicContext';



interface TaskCreateRequest {
    content: string;
    topic: number | null;
    verified: boolean | null;
    marks: number | undefined;
    year: number | null;
    document_id: string | null;
    page: number | null;
}

interface TaskResponse {
    _id: string | null;
    content: string;
    topic: number | null;
    verified: boolean | null;
    marks: number | null;
    year: number | null;
    document_id: string | null;
    page: number | null;
}

interface Option {
    value: number;
    label: string;
}

function transformString(input: string) {
    let result = input.replace(/_/g, ' ');
    result = result.toLowerCase();
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}

interface TopicResponse {
    topic: string;
    topic_id: number;
}

interface SetQuestionProps{
    task: TaskResponse | null;
    afterSave: () => void;
}



export default function SetQuestion({task, afterSave} : SetQuestionProps) {
    const {topics} = useTopics();
    const [inputValueText, setInputValueText] = useState(task !== null ? task.content : 'Enter the task...');
    const [valueMark, setValueMark] = useState<number | undefined>(task !== null && task.marks !== null ? task.marks : 1);
    const [topic, setTopic] = useState<string>(task !== null && topics !== undefined && task.topic !== null ? topics.names[task.topic] : "");
    const [topicIndex, setTopicIndex] = useState<number | null>(task !== null &&  task.topic!== null ? task.topic : null);
    const [selectedYear, setSelectedYear] = useState<number>(task !== null && task.year !== null ? task.year : new Date().getFullYear());
    const [errorMark, setErrorMark] = useState<string>("");
    const [errorYear, setErrorYear] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [errorTopic, setErrorTopic] = useState<string>("");
    const currentYear = new Date().getFullYear();
    const [selectedTopicLabel, setSelectedTopicLabel] = useState<string>(task !== null && topics !== undefined && task.topic !== null ? topics.names[task.topic] : "Select an option");


    useEffect(() => {
        setInputValueText(task !== null ? task.content : 'Enter the task...');
        setValueMark(task !== null && task.marks !== null ? task.marks : 1);
        setTopic(task !== null && topics !== undefined && task.topic !== null ? topics.names[task.topic] : "");
        setTopicIndex(task !== null &&  task.topic !== null  && task.topic !== -1? task.topic : null);
        setSelectedYear(task !== null && task.year !== null ? task.year : new Date().getFullYear());
        setSelectedTopicLabel(task !== null && topics !== undefined && task.topic !== null && topics.names[task.topic] !== undefined ? transformString(topics.names[task.topic]) : "Select an option");
      }, [task, topics]);


    const options: Option[] = topics ? topics.names.map((str, index) => ({
        value: index,
        label: transformString(str),
    })) : [];


    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    };

    const handleSelect = (value: number, label: string) => {
        setTopic(label);
        setTopicIndex(value);
        setSelectedTopicLabel(label);
        setErrorTopic("");
    };

    async function submitQuestion(event: FormEvent) {
        event.preventDefault();
        if (submitQuestionCheck() && errorMark === "" && errorYear === "") {
            if (task !== null && task._id !== null && valueMark !== undefined){
                const newTask: TaskResponse = {'_id': task?._id, 'content': inputValueText, 'document_id': task.document_id, 'marks': valueMark, 'page': task.page, 'topic': topicIndex, 'verified': null, 'year': selectedYear };
                const createResponse: AxiosResponse<TaskResponse> = await axios.patch(`http://localhost:8000/task/${task._id}`, newTask);
                if (createResponse.status === 200) {
                    console.log("submited");
                    afterSave();
                }
            } else {
                const newTask: TaskCreateRequest = {'content': inputValueText, 'document_id': null, 'marks': valueMark, 'page': null, 'topic': topicIndex, 'verified': null, 'year': selectedYear };
                const createResponse: AxiosResponse<TaskResponse> = await axios.post(`http://localhost:8000/task/`, newTask);
                if (createResponse.status === 200) {
                    console.log("submited");
                    afterSave();
                }
            }
            
        } else {
            console.log("ne submit");
        }
    }

    async function predictTopic() {
        if (inputValueText.trim().length === 0 || inputValueText === "Enter the task...") {
            setErrorText("Task cannot be empty.");
        } else {
            const formData = new FormData();
            formData.append('content', inputValueText as string);
            const predictResponse: AxiosResponse<TopicResponse> = await axios.post(`http://localhost:8000/task/unsavedPredict`, formData);
            if (predictResponse.status === 200) {
                handleSelect(predictResponse.data.topic_id, transformString(predictResponse.data.topic));
            } else {
                setErrorTopic("Choose topic manually");
                setTopic("");
                setTopicIndex(-1);
                setSelectedTopicLabel("Select an option");
            }
        }
    }

    function submitQuestionCheck() {
        let newErrors = 0;
        if (inputValueText.trim().length === 0 || inputValueText === "Enter the task...") {
            setErrorText("Task cannot be empty.");
            newErrors++;
        }
        if (topic === "" || topicIndex === -1) {
            setErrorTopic("Topic is not chosen.");
            newErrors++;
        }
        if (valueMark === undefined) {
            setErrorMark("Mark cannot be empty.")
        }
        if (valueMark !== undefined && valueMark > 0 && valueMark < 21) {
            setErrorMark("");
        }
        return newErrors === 0;
    }

    return (
        <form className="question-container-content" onSubmit={submitQuestion}>
            <div className='question-form-input'>
                <div className='question-container-text-out'>
                    <div className='question-container-text'>
                        <InputText
                            label={null}
                            value={inputValueText}
                            onChange={(e) => { setInputValueText(e.target.value); e.target.value !== "" ? setErrorText("") : setErrorText("Task cannot be empty."); }}
                        />
                    </div>
                    <span className="input-text-error">{errorText}</span>
                </div>

                <div className='question-details'>
                    <div className='choose'>
                        <label htmlFor='topic'>Topic</label>
                        <InputDropdown options={options} onSelect={handleSelect} error={errorTopic} selectedTopicLabel={selectedTopicLabel} />
                    </div>
                    <div className='choose'>
                        <label htmlFor='mark'>Mark</label>
                        <InputNumber valueNumber={valueMark} setNumberValue={setValueMark} error={errorMark} setError={setErrorMark} />
                    </div>
                    <div className='choose'>
                        <label htmlFor='year'>Year</label>
                        <YearPicker currentYear={currentYear} selectedYear={selectedYear} onChange={handleYearChange} error={errorYear} setError={setErrorYear} />
                    </div>
                </div>
            </div>
            <div className='question-buttons'>
                <button type='button' className="detect-topic-button" onClick={predictTopic}>Detect topic</button>
                <button type="submit" className={"save-button save-enabled"}>Save</button>
            </div>
        </form>
    );
};
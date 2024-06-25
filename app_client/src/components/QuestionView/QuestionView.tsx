import IconButton from '../IconButton/IconButton';
import './QuestionView.css';
import EditIcon from '../../images/edit.svg';
import DeleteIcon from '../../images/delete.svg';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from "axios";

interface QuestionProps {
    id: string;
    index: number;
    topics: string[] | undefined;
    onDelete: (id: string) => void;
}

interface TaskResponse {
    _id: string;
    content: string;
    topic: string | null;
    verified: boolean | null;
    marks: number | null;
    year: number | null;
    document_id: string| null;
    page: number | null;
}

interface TopicResponse {
        topic: string;
        topic_id: number;
}

function transformString(input: string) {
    let result = input.replace(/_/g, ' ');
    result = result.toLowerCase();
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }

export default function QuestionView(question: QuestionProps) {
    const [task, setTask] = useState<TaskResponse | null>(null);
    

    async function getQuestion(id : string) {
        const questionResponse: AxiosResponse<TaskResponse> = await axios.get(`http://0.0.0.0:8000/task/${id}`);
        if(questionResponse.status === 200){
            const taskData : TaskResponse = questionResponse.data;
            if (taskData.topic == null){
                const topicResponse: AxiosResponse<TopicResponse> = await axios.get(`http://0.0.0.0:8000/task/${id}/predict`);
                if(topicResponse.status === 200){
                    taskData.topic = transformString(topicResponse.data.topic);
                }else {
                    taskData.topic = "Not Assigned";
                }
            } else {
                if(question.topics != undefined){
                    taskData.topic = transformString(question.topics[parseInt(taskData.topic)]);
                } else {
                    taskData.topic = "Not Assigned";
                }
            }
            setTask(taskData);
        }
    }

    useEffect(()=>{
        getQuestion(question.id);

    }, []);

    return (
        <div className='question-container'>
            <h6 className='question-number'>Task {question.index}</h6>
            <div className='question-content'>
                <div className='question-text-container'>
                    <p className='question-text'>{task?.content}</p>
                </div>
                <div className='question-details'>
                    <div className='question-topic'>
                        <h2 className='topic'>{task?.topic}</h2>
                    </div>
                    <span className='question-mark'>Mark: {task?.marks}</span>
                    <span className='question-year'>Year: {task?.year}</span>
                    <div className='question-buttons'>
                        <IconButton icon={EditIcon} 
                            onClick={() => alert('Edit clicked!')} 
                            alt="Edit icon" 
                            title="Edit"/>
                        <IconButton icon={DeleteIcon} 
                            onClick={() => question.onDelete(question.id)} 
                            alt="Delete icon" 
                            title="Delete"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
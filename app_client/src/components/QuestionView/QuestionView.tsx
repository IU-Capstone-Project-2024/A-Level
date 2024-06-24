import IconButton from '../IconButton/IconButton';
import './QuestionView.css';
import EditIcon from '../../images/edit.svg';
import DeleteIcon from '../../images/delete.svg';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from "axios";

interface QuestionProps {
    id: string;
    index: number;
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

interface TopicTransformResp {
    names: string[];
}

export default function QuestionView(question: QuestionProps) {
    const [task, setTask] = useState<TaskResponse | null>(null);

    async function getQuestion(id : string) {
        const topicResponse: AxiosResponse<TopicResponse> = await axios.get(`http://0.0.0.0:8000/task/${id}/predict`);
        if(topicResponse.status === 200){
            const questionResponse: AxiosResponse<TaskResponse> = await axios.get(`http://0.0.0.0:8000/task/${id}`);
            if(questionResponse.status === 200){
                const taskData : TaskResponse = questionResponse.data;
                setTask(taskData);
            }
        }
    }

    useEffect(()=>{
        getQuestion(question.id);

    }, []);

    return (
        <div className='question-container'>
            <h6 className='question-number'>Question {question.index}</h6>
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
                            onClick={() => alert('Delete clicked!')} 
                            alt="Delete icon" 
                            title="Delete"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
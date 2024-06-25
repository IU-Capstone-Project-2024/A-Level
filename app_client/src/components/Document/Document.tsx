import { useState } from "react";
import DocumentHeader from "../DocumentHeader/DocumentHeader";
import QuestionView from "../QuestionView/QuestionView";
import "./Document.css";
import axios, { AxiosResponse } from "axios";

interface DocumentResponse {
    _id: string;
    path: string;
    filename: string;
    tasks: string[];
    img: string | null;
}
interface TopicTransformResp {
    names: string[];
}


interface DocProps {
    doc: (DocumentResponse | null);
    topics: TopicTransformResp | undefined;
}



export default function Document ({doc, topics}: DocProps){
    

    const [questions, setQuestions] = useState<string[] | undefined>(doc?.tasks);

    async function handleDeleteTask(id: string) {
        console.log(questions);
        console.log(id);
        const responseDeleteTask : AxiosResponse<null> = await axios.delete(`http://0.0.0.0:8000/task/${id}`);
        if(responseDeleteTask.status === 200){
            const responseDoc: AxiosResponse<DocumentResponse> =  await axios.get(`http://0.0.0.0:8000/document/${doc?._id}`);
            console.log(responseDoc.data.tasks);
            setQuestions(responseDoc.data.tasks);
        }
    }

        return (
            <div className="document-view">
                <div className="document">
                    <DocumentHeader filename={doc?.filename}/>
                    {questions?.map((task, index) => <QuestionView id={task} index={index + 1} key={task} topics={topics?.names} onDelete={handleDeleteTask}/>)}
                </div>
            </div>
        );
    }

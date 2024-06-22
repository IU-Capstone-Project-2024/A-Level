import DocumentHeader from "../DocumentHeader/DocumentHeader";
import QuestionView from "../QuestionView/QuestionView";
import "./Document.css"

interface DocumentProps {
    _id: string;
    path: string;
    filename: string;
    tasks: string[];
    img: string | null;
}



export default function Document (document: DocumentProps){
    return (
        <div className="document-view">
            <div className="document">
                <DocumentHeader filename={document.filename}/>
                {document.tasks.map((task, index) => <QuestionView id={task} index={index} key={task}/>)}
            </div>
        </div>
    );
}
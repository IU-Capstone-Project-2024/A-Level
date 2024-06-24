import DocumentHeader from "../DocumentHeader/DocumentHeader";
import QuestionView from "../QuestionView/QuestionView";
import "./Document.css"

interface DocumentResponse {
    _id: string;
    path: string;
    filename: string;
    tasks: string[];
    img: string | null;
}

interface DocProps {
    doc: (DocumentResponse | null);
}



export default function Document ({doc}: DocProps){
    return (
        <div className="document-view">
            <div className="document">
                <DocumentHeader filename={doc?.filename}/>
                {doc?.tasks.map((task, index) => <QuestionView id={task} index={index + 1} key={task}/>)}
            </div>
        </div>
    );
}
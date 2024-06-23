import DocumentHeader from "../DocumentHeader/DocumentHeader";
import QuestionView from "../QuestionView/QuestionView";
import "./Document.css"


export default function Document (){
    return (
        <div className="document-view">
            <div className="document">
                <DocumentHeader/>
                <QuestionView/>
                <QuestionView/>
                <QuestionView/>
            </div>
        </div>
    );
}
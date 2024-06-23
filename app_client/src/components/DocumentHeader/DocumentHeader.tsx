import IconButton from "../IconButton/IconButton";
import DeleteIcon from '../../images/delete.svg';
import './DocumentHeader.css';



export default function DocumentHeader(){
    return (
        <div className="document-header">
            <h2 className="document-title">exam_2021.pdf</h2>
            <div className="document-buttons">
                <button className="detect-topics-button">Detect topics</button>
                <IconButton icon={DeleteIcon} 
                            onClick={() => alert('Delete clicked!')} 
                            alt="Delete icon" 
                            title="Delete" 
                            className="delete-doc-button"/>
            </div>
        </div>
    );
}
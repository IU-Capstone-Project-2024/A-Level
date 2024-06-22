import IconButton from "../IconButton/IconButton";
import DeleteIcon from '../../images/delete.svg';
import './DocumentHeader.css';

interface DocumentHeaderProps{
    filename: string;
}

export default function DocumentHeader({filename}: DocumentHeaderProps){
    return (
        <div className="document-header">
            <h2 className="document-title">{filename}</h2>
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
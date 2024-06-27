import IconButton from "../IconButton/IconButton";
import DeleteIcon from '../../images/delete.svg';
import './DocumentHeader.css';
import { Dispatch, SetStateAction } from "react";

interface DocumentHeaderProps{
    filename: string | undefined;
    onDelete: () => void;
    onPredict: Dispatch<SetStateAction<boolean>>;
}

export default function DocumentHeader({filename, onDelete, onPredict}: DocumentHeaderProps){
    return (
        <div className="document-header">
            <h2 className="document-title">{filename}</h2>
            <div className="document-buttons">
                <button className="detect-topics-button" onClick={()=> {onPredict(true);}}>Detect topics</button>
                <IconButton icon={DeleteIcon} 
                            onClick={() => onDelete()} 
                            alt="Delete icon" 
                            title="Delete" 
                            className="delete-doc-button"/>
            </div>
        </div>
    );
}
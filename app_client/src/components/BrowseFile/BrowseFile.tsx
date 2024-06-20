import { useState } from "react";
import './BrowseFile.css';
import axios from "axios";
import CloudArrowUp from '../../images/CloudArrowUp.svg';
import PDF from '../../images/PDF.svg';
import done from '../../images/done.svg';


export default function BrowseFile(){
    const [browsed, setBrowsed] = useState(false);
    const [file, setFile] = useState<File>();


    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }
    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>){
        e.preventDefault();
    }
    function onDropHandler(e: React.DragEvent<HTMLDivElement>){
        e.preventDefault();
        let files = Array.from(e.dataTransfer.files);
        console.log(files[0]);
        setFile(files[0]);
        setBrowsed(true);

    }

    function onSubmitHandler(){
        const formData = new FormData();
        formData.append('uploaded_file', file as File);
        const response = axios.post('http://0.0.0.0:8000/document/upload', formData);
        console.log(response);
    }


    return (
        <>
        <div className="browsing-page">
            {!browsed && <div className="upload" onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => onDropHandler(e)}
            >
                <img className='upload-icon' src={CloudArrowUp} alt='File uploader'></img>
                <h3 className="upload-heading">Upload your file</h3>
                <p className="upload-description">Click to browse or drag and drop your file</p>
            {/* <input type="file" className='uploadInput'></input> */}
            </div>}

            {browsed && <div className="upload">
                <img className='upload-icon' src={PDF} alt='PDF file'></img>
                <h3 className="upload-heading">{file?.name}</h3>
                <div className="upload-description">
                    <img id="done" src={done} alt='completed'></img>
                    <p id="upload-text">Upload complete</p>
                </div>
            </div>}
            
        </div>
        <button className={"submit-button "+ (browsed ? "enabled" : "disabled")} onClick={browsed ? onSubmitHandler : () => ''}>Submit</button>
        </>
    );
}


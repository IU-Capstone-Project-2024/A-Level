import { useState } from "react";
import './BrowseFile.css';
import axios from "axios";


export default function BrowseFile(){
    const [drag, setDrag] = useState(false);

    function dragStartHandler(e: any) {
        e.preventDefault();
        setDrag(true);
    }
    function dragLeaveHandler(e: any){
        e.preventDefault();
        setDrag(false);
    }
    function onDropHandler(e: any){
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        const formData = new FormData();
        formData.append('uploaded_file', files[0]);
        axios.post('http://0.0.0.0:8000/document/upload', formData);
        setDrag(false);
    }

    return (
        <>
        <div>
            {drag  
            ? <div className="drop-area" 
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => onDropHandler(e)}>Drop your file</div>
            : <div onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            >drag your file</div>}
        </div>
        </>
    );
}


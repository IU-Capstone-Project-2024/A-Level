import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import DocumentHeader from "../DocumentHeader/DocumentHeader";
import QuestionView from "../QuestionView/QuestionView";
import "./Document.css";
import axios, { AxiosResponse } from "axios";
import Modal from "../Modal/Modal";

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

type tabType = 'browse' | 'uploaded' | 'questions' |'create' | null;

interface DocProps {
    doc: (DocumentResponse | null);
    topics: TopicTransformResp | undefined;
    setDocument: Dispatch<SetStateAction<DocumentResponse | null>>;
    setDisplayDoc: Dispatch<SetStateAction<boolean>>;
    setTab: Dispatch<SetStateAction<tabType>>;
}



export default function Document ({doc, topics, setDocument, setDisplayDoc, setTab}: DocProps){
    const [questions, setQuestions] = useState<string[] | undefined>(doc?.tasks);
    const [deleteDocumentModal, setDeleteDocumentModal] = useState<boolean>(false);
    const deleteDocModalRef = useRef<HTMLDialogElement>(null);


    useEffect(()=>{
        let handleClickOutside = (event: MouseEvent) =>{
            console.log(deleteDocModalRef);
            if (deleteDocModalRef.current && !deleteDocModalRef.current.contains(event.target as Node)){
                setDeleteDocumentModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
    }, [deleteDocModalRef]);

    async function handleDeleteTask(id: string) {
        const responseDeleteTask : AxiosResponse<null> = await axios.delete(`http://0.0.0.0:8000/task/${id}`);
        if(responseDeleteTask.status === 200){
            const responseDoc: AxiosResponse<DocumentResponse> =  await axios.get(`http://0.0.0.0:8000/document/${doc?._id}`);
            if(responseDoc.data.tasks.length === 0){
                handleDeleteDocument();
            } else{
                setQuestions(responseDoc.data.tasks);
            }
        }
    }

    function openDeleteDocumentModal(){
        setDeleteDocumentModal(true);
    }


    async function handleDeleteDocument() {
        if(doc != null){
            const responseDelete : AxiosResponse<DocumentResponse> = await axios.delete(`http://0.0.0.0:8000/document/${doc._id}`);
            if(responseDelete.status === 200){
                setDocument(null);
                setDisplayDoc(false);
                setTab("uploaded");
            }
        }
    }

        return (
            <div className="document-view">
                <div className="document">
                    <DocumentHeader filename={doc?.filename} onDelete={openDeleteDocumentModal}/>
                    <Modal open={deleteDocumentModal} ref={deleteDocModalRef}>
                        <h3>Delete this document?</h3>
                            <button className="delete-button" onClick={handleDeleteDocument}>Delete</button>
                    </Modal>
                    {questions?.map((task, index) => <QuestionView id={task} index={index + 1} key={task} topics={topics?.names} onDelete={handleDeleteTask}/>)}
                </div>
            </div>
        );
    }

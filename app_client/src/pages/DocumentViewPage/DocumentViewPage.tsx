import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './DocumentViewPage.css';
import { useState, useRef, useEffect } from 'react';
import DocumentHeader from '../../components/DocumentHeader/DocumentHeader';
import QuestionView from '../../components/QuestionView/QuestionView';
import axios, { AxiosResponse } from 'axios';
import Modal from '../../components/Modal/Modal';
import { useTab } from '../../context/TabContext';
import ModalPortal from '../../components/ModalPortal/ModalPortal';
import SetQuestion from '../../components/SetQuestion/SetQuestion';

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

interface TaskResponse {
  _id: string | null;
  content: string;
  topic: number | null;
  verified: boolean | null;
  marks: number | null;
  year: number | null;
  document_id: string | null;
  page: number | null;
}

export default function DocumentViewPage() {
  const { filename } = useParams<{ filename: string }>();
  const location = useLocation();
  const { doc, topics } = location.state as {
    doc: DocumentResponse;
    topics: TopicTransformResp;
  };
  const navigate = useNavigate();
  const { setTab } = useTab();

  const [questions, setQuestions] = useState<string[] | undefined>(doc?.tasks);
  const [deleteDocumentModal, setDeleteDocumentModal] =
    useState<boolean>(false);
  const deleteDocModalRef = useRef<HTMLDialogElement>(null);
  const [predict, setPredict] = useState<boolean>(false);

  const [editModal, setEditModal] = useState<boolean>(false);
  const editModalRef = useRef<HTMLDialogElement>(null);
  const [editTask, setEditTask] = useState<TaskResponse | null>(null);
  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        deleteDocModalRef.current &&
        !deleteDocModalRef.current.contains(event.target as Node)
      ) {
        setDeleteDocumentModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [deleteDocModalRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editModalRef.current &&
        !editModalRef.current.contains(event.target as Node)
      ) {
        setEditModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [editModalRef]);

  async function handleDeleteTask(id: string) {
    const responseDeleteTask: AxiosResponse<TaskResponse> = await axios.delete(
      `http://localhost:8000/task/${id}`,
    );
    if (responseDeleteTask.status === 200) {
      const responseDoc: AxiosResponse<DocumentResponse> = await axios.get(
        `http://localhost:8000/document/${doc?._id}`,
      );
      if (responseDoc.data.tasks.length === 0) {
        handleDeleteDocument();
      } else {
        setQuestions(responseDoc.data.tasks);
      }
    }
  }

  function openDeleteDocumentModal() {
    setDeleteDocumentModal(true);
  }

  async function handleDeleteDocument() {
    if (doc != null) {
      const responseDelete: AxiosResponse<DocumentResponse> =
        await axios.delete(`http://localhost:8000/document/${doc._id}`);
      if (responseDelete.status === 200) {
        navigate('/uploaded');
        setTab('uploaded');
      }
    }
  }

  async function handleEdit() {
    setEditModal(false);
    const responseDoc: AxiosResponse<DocumentResponse> = await axios.get(
      `http://localhost:8000/document/${doc?._id}`,
    );
    if (responseDoc.status === 200) {
      setQuestions(responseDoc.data.tasks);
      setEdited(!edited);
    } else {
      console.log('error');
    }
  }

  return (
    <div className="document-view">
      <ModalPortal open={editModal} ref={editModalRef} onClick={() => {}}>
        <div className="question-container-heading">
          <h2 className="question-container-heading-text">Edit question</h2>
        </div>
        <SetQuestion task={editTask} afterSave={handleEdit} />
      </ModalPortal>
      <div className="document">
        <DocumentHeader
          filename={filename}
          onDelete={openDeleteDocumentModal}
          onPredict={setPredict}
        />
        <Modal open={deleteDocumentModal} ref={deleteDocModalRef}>
          <h3>Delete this document?</h3>
          <button className="delete-button" onClick={handleDeleteDocument}>
            Delete
          </button>
        </Modal>
        {questions?.map((task, index) => (
          <QuestionView
            id={task}
            index={index + 1}
            key={task}
            topics={topics?.names}
            onDelete={handleDeleteTask}
            onEdit={(task) => {
              setEditModal(true);
              setEditTask(task);
            }}
            predict={predict}
            edited={edited}
            state="modify"
            onLink={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

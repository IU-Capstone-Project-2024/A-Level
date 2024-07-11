import { useNavigate, useParams } from 'react-router-dom';
import './QuestionViewPage.css';
import { useState, useRef, useEffect } from 'react';
import QuestionView from '../../components/QuestionView/QuestionView';
import axios, { AxiosResponse } from 'axios';
import ModalPortal from '../../components/ModalPortal/ModalPortal';
import SetQuestion from '../../components/SetQuestion/SetQuestion';
import { useTopics } from '../../context/TopicContext';

interface DocumentResponse {
  _id: string;
  path: string;
  filename: string;
  tasks: string[];
  img: string | null;
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

export default function QuestionViewPage() {
  const { taskID } = useParams<{ taskID: string }>();
  const { topics } = useTopics();

  const [predict] = useState<boolean>(false);
  const navigate = useNavigate();

  const [editModal, setEditModal] = useState<boolean>(false);
  const editModalRef = useRef<HTMLDialogElement>(null);
  const [editTask, setEditTask] = useState<TaskResponse | null>(null);
  const [edited, setEdited] = useState<boolean>(false);

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

  async function handleDeleteDocument(document_id: string) {
    const responseDelete: AxiosResponse<DocumentResponse> = await axios.delete(
      `http://localhost:8000/document/${document_id}`,
    );
    if (responseDelete.status !== 200) {
      console.log('Document still empty');
    }
  }

  async function handleDeleteTask(
    id: string,
    document_id: string | null | undefined,
  ) {
    const responseDeleteTask: AxiosResponse<TaskResponse> = await axios.delete(
      `http://localhost:8000/task/${id}`,
    );
    if (responseDeleteTask.status === 200) {
      if (document_id !== null && document_id !== undefined) {
        const responseDoc: AxiosResponse<DocumentResponse> = await axios.get(
          `http://localhost:8000/document/${document_id}`,
        );
        if (responseDoc.data.tasks.length === 0) {
          handleDeleteDocument(document_id);
        }
      }
      navigate('/questions');
    }
  }

  async function handleEdit() {
    setEditModal(false);
    setEdited(!edited);
  }

  return (
    <section id="question-view-page-container">
      <div className="question-view">
        <ModalPortal open={editModal} ref={editModalRef}>
          <div className="question-container-heading">
            <h2 className="question-container-heading-text">Edit question</h2>
          </div>
          <SetQuestion task={editTask} afterSave={handleEdit} />
        </ModalPortal>
        <div className="question">
          <div className="question-container-heading">
            <h2 className="question-container-heading-text">Question</h2>
          </div>
          <QuestionView
            id={taskID!}
            index={-1}
            key={taskID}
            topics={topics?.names}
            onDelete={handleDeleteTask}
            onEdit={(task) => {
              setEditModal(true);
              setEditTask(task);
            }}
            predict={predict}
            edited={edited}
            state="modify"
          />
        </div>
      </div>
    </section>
  );
}

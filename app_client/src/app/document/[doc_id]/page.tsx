'use client';
import styles from './document.module.css';
import { useState, useRef, useEffect } from 'react';
import DocumentHeader from '../../../components/DocumentHeader/DocumentHeader';
import QuestionView from '../../../components/QuestionView/QuestionView';
import axios, { AxiosResponse } from 'axios';
import Modal from '../../../components/Modal/Modal';
import { useTab } from '../../../context/TabContext';
import ModalPortal from '../../../components/ModalPortal/ModalPortal';
import SetQuestion from '../../../components/SetQuestion/SetQuestion';
import IconButton from '../../../components/IconButton/IconButton';
import Close from '../../../images/ic_round-close.svg';
import { useRouter, usePathname } from 'next/navigation';
import { useTopics } from '@/context/TopicContext';

interface DocumentResponse {
  id: string;
  path: string;
  filename: string;
  tasks: string[];
  img: string | null;
}

interface TaskResponse {
  id: string | null;
  content: string;
  topic: number | null;
  verified: boolean | null;
  marks: number | null;
  year: number | null;
  document_id: string | null;
  page: number | null;
}

export default function DocumentViewPage() {
  const router = useRouter();
  const pathname = usePathname();
  const doc_id = pathname.split('/')[2];
  const [doc, setDoc] = useState<DocumentResponse>();

  const { topics } = useTopics();
  const { setTab } = useTab();

  const [questions, setQuestions] = useState<string[] | undefined>(doc?.tasks);
  const [deleteDocumentModal, setDeleteDocumentModal] =
    useState<boolean>(false);
  const deleteDocModalRef = useRef<HTMLDialogElement>(null);
  const [predict, setPredict] = useState<boolean>(false);

  const [editModal, setEditModal] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<TaskResponse | null>(null);
  const [edited, setEdited] = useState<boolean>(false);

  const [showChart, setShowChart] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function docFetch() {
      const responseDoc: AxiosResponse<DocumentResponse> = await axios.get(
        `https://chartreuse-binghamite1373.my-vm.work/document/${doc_id}`,
      );
      if (responseDoc.status === 200) {
        setDoc(responseDoc.data);
        setQuestions(responseDoc.data.tasks);
      } else {
        console.log('Fetching document failed');
      }
    }

    docFetch();
  }, [doc_id]);

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

  async function handleDeleteTask(id: string) {
    const responseDeleteTask: AxiosResponse<TaskResponse> = await axios.delete(
      `https://chartreuse-binghamite1373.my-vm.work/task/${id}`,
    );
    if (responseDeleteTask.status === 200) {
      const responseDoc: AxiosResponse<DocumentResponse> = await axios.get(
        `https://chartreuse-binghamite1373.my-vm.work/document/${doc?.id}`,
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
        await axios.delete(
          `https://chartreuse-binghamite1373.my-vm.work/document/${doc.id}`,
        );
      if (responseDelete.status === 200) {
        router.push('/uploaded');
        setTab('uploaded');
      }
    }
  }

  async function handleEdit() {
    setEditModal(false);
    const responseDoc: AxiosResponse<DocumentResponse> = await axios.get(
      `https://chartreuse-binghamite1373.my-vm.work/document/${doc?.id}`,
    );
    if (responseDoc.status === 200) {
      setQuestions(responseDoc.data.tasks);
      setEdited(!edited);
    } else {
      console.log('error');
    }
  }

  return (
    <div className={styles.document_view}>
      <ModalPortal
        open={editModal}
        onClick={() => {
          setShowChart(false);
          setEditModal(false);
          setEditTask(null);
        }}
      >
        <div className={styles.question_container_heading}>
          <h2 className={styles.question_container_heading_text}>
            Edit question
          </h2>
          <IconButton
            icon={Close}
            alt="Close"
            onClick={() => {
              setShowChart(false);
              setEditModal(false);
              setEditTask(null);
            }}
          />
        </div>
        <SetQuestion
          task={editTask}
          afterSave={handleEdit}
          showChart={showChart}
          setShowChart={setShowChart}
        />
      </ModalPortal>
      <div className={styles.document}>
        <DocumentHeader
          filename={doc?.filename}
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

export const runtime = 'edge';

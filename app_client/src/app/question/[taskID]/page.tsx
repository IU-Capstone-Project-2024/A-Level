'use client';
import styles from './question.module.css';
import { useState } from 'react';
import QuestionView from '../../../components/QuestionView/QuestionView';
import axios, { AxiosResponse } from 'axios';
import ModalPortal from '../../../components/ModalPortal/ModalPortal';
import SetQuestion from '../../../components/SetQuestion/SetQuestion';
import { useTopics } from '../../../context/TopicContext';
import IconButton from '../../../components/IconButton/IconButton';
// prettier-ignore
import Close from '../../../images/ic_round-close.svg';
import { usePathname, useRouter } from 'next/navigation';

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

export default function QuestionViewPage() {
  const router = useRouter();
  const taskID = usePathname().split('/')[2];
  const { topics } = useTopics();

  const [predict] = useState<boolean>(false);

  const [editModal, setEditModal] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<TaskResponse | null>(null);
  const [edited, setEdited] = useState<boolean>(false);
  const [showChart, setShowChart] = useState<boolean>(false);

  async function handleDeleteDocument(document_id: string) {
    const responseDelete: AxiosResponse<DocumentResponse> = await axios.delete(
      `https://chartreuse-binghamite1373.my-vm.work/document/${document_id}`,
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
      `https://chartreuse-binghamite1373.my-vm.work/task/${id}`,
    );
    if (responseDeleteTask.status === 200) {
      if (document_id !== null && document_id !== undefined) {
        const responseDoc: AxiosResponse<DocumentResponse> = await axios.get(
          `https://chartreuse-binghamite1373.my-vm.work/document/${document_id}`,
        );
        if (responseDoc.data.tasks.length === 0) {
          handleDeleteDocument(document_id);
        }
      }
      router.push('/questions');
    }
  }

  async function handleEdit() {
    setEditModal(false);
    setEdited(!edited);
  }

  return (
    <section id={styles.question_view_page_container}>
      <div className={styles.question_view}>
        <ModalPortal
          open={editModal}
          onClick={() => {
            setShowChart(false);
            setEditModal(false);
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
        <div className={styles.question}>
          <div className={styles.question_container_heading}>
            <h2 className={styles.question_container_heading_text}>Question</h2>
          </div>
          {!Array.isArray(taskID) && taskID !== undefined ? (
            <QuestionView
              id={taskID}
              index={-1}
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
          ) : null}
        </div>
      </div>
    </section>
  );
}

export const runtime = 'edge';

import IconButton from '../IconButton/IconButton';
import './QuestionView.css';
import EditIcon from '../../images/edit.svg';
import DeleteIcon from '../../images/delete.svg';
import LinkIcon from '../../images/iconamoon_link.svg';
import { useEffect, useState, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import Modal from '../Modal/Modal';

type QuestionViewState = 'modify' | 'extracts' | 'simple';

interface QuestionProps {
  id: string;
  index: number;
  topics: string[] | undefined;
  onDelete: (id: string, document_id: string | null | undefined) => void;
  onEdit: (task: TaskResponse | null) => void;
  onLink: (document_id: string | null) => void;
  predict: boolean;
  edited: boolean;
  state: QuestionViewState;
}

interface TaskResponse {
  _id: string;
  content: string;
  topic: number | null;
  verified: boolean | null;
  marks: number | null;
  year: number | null;
  document_id: string | null;
  page: number | null;
}

interface TopicResponse {
  topic: string;
  topic_id: number;
}

function transformString(input: string) {
  let result = input.replace(/_/g, ' ');
  result = result.toLowerCase();
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}

export default function QuestionView(question: QuestionProps) {
  const [task, setTask] = useState<TaskResponse | null>(null);
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
  const deleteTaskModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        deleteTaskModalRef.current &&
        !deleteTaskModalRef.current.contains(event.target as Node)
      ) {
        setDeleteTaskModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [deleteTaskModalRef]);

  async function getQuestion(id: string) {
    const questionResponse: AxiosResponse<TaskResponse> = await axios.get(
      `https://chartreuse-binghamite1373.my-vm.work:80/task/${id}`,
    );
    if (questionResponse.status === 200) {
      const taskData: TaskResponse = questionResponse.data;
      if (taskData.topic == null) {
        if (question.predict) {
          const topicResponse: AxiosResponse<TopicResponse> = await axios.get(
            `https://chartreuse-binghamite1373.my-vm.work:80/task/${id}/predict`,
          );
          if (topicResponse.status === 200) {
            taskData.topic = topicResponse.data.topic_id;
          } else {
            taskData.topic = -1;
          }
        } else {
          taskData.topic = -1;
        }
      } else {
        if (question.topics === undefined) {
          taskData.topic = -1;
        }
      }
      setTask(taskData);
    }
  }

  useEffect(() => {
    getQuestion(question.id);
  }, [question.predict, question.id, question.edited]);

  function openDeleteTaskModal() {
    setDeleteTaskModal(true);
  }

  async function handleDeleteTask() {
    question.onDelete(question.id, task?.document_id);
    setDeleteTaskModal(false);
  }

  return (
    <div className="question-container">
      {question.index !== -1 && (
        <h6 className="question-number">Task {question.index}</h6>
      )}
      <div className="question-content">
        <div className="question-text-container">
          <p className="question-text">{task?.content}</p>
        </div>
        <div className="question-details">
          <div className="question-topic">
            <h2 className="topic">
              {task !== null &&
              task.topic !== null &&
              question.topics !== undefined &&
              question.topics[task.topic] !== undefined
                ? transformString(question.topics[task.topic])
                : 'Not Assigned'}
            </h2>
          </div>
          <span className="question-mark">Mark: {task?.marks}</span>
          <span className="question-year">Year: {task?.year}</span>
          <div className="question-buttons">
            {question.state === 'modify' && (
              <>
                <IconButton
                  icon={EditIcon}
                  onClick={() => question.onEdit(task)}
                  alt="Edit icon"
                  title="Edit"
                />
                <IconButton
                  icon={DeleteIcon}
                  onClick={() => openDeleteTaskModal()}
                  alt="Delete icon"
                  title="Delete"
                />
              </>
            )}
            {question.state === 'extracts' &&
              task !== null &&
              task?.document_id !== null && (
                <IconButton
                  icon={LinkIcon}
                  onClick={() => question.onLink(task.document_id)}
                  alt="Extracts view icon"
                  title="View Extracts"
                />
              )}
          </div>
        </div>
        <Modal open={deleteTaskModal} ref={deleteTaskModalRef}>
          <h3>Delete this task?</h3>
          <button className="delete-button" onClick={handleDeleteTask}>
            Delete
          </button>
        </Modal>
      </div>
    </div>
  );
}

import { useState } from 'react';
import './GenerateExamVariantPage.css';
import axios, { AxiosResponse } from 'axios';
import QuestionView from '../../components/QuestionView/QuestionView';
import { useTopics } from '../../context/TopicContext';
import ModalPortal from '../../components/ModalPortal/ModalPortal';
import Extract from '../../components/Extract/Extract';

interface GenerateResponse {
  sectionA: string[];
  sectionB: string[];
  sectionC: string;
}

interface ExtractsResponse {
  _id: string;
  document_id: string;
  literal: string;
  content: string;
}

export default function GenerateExamVariantPage() {
  const { topics } = useTopics();
  const [generated, setGenerated] = useState<boolean>(false);
  const [questionsA, setQuestionsA] = useState<string[]>([]);
  const [questionsB, setQuestionsB] = useState<string[]>([]);
  const [questionsC, setQuestionsC] = useState<string | null>(null);
  const [extractsModal, setExtractsModal] = useState<boolean>(false);
  // const extractsModalRef = useRef<HTMLDialogElement>(null);
  const [extracts, setExtracts] = useState<ExtractsResponse[] | null>(null);

  async function Generate() {
    const generateResponse: AxiosResponse<GenerateResponse> = await axios.get(
      'https://203.31.40.71:8000/utils/exam',
    );
    if (generateResponse.status === 200 && generateResponse.data !== null) {
      setQuestionsA(generateResponse.data['sectionA']);
      setQuestionsB(generateResponse.data['sectionB']);
      setQuestionsC(generateResponse.data['sectionC']);
    } else {
      console.log('error');
    }
    setGenerated(true);
  }

  async function getExtracts(document_id: string | null) {
    if (document_id !== null) {
      const extractsResponse: AxiosResponse<ExtractsResponse[]> =
        await axios.get(
          `https://203.31.40.71:8000/document/${document_id}/extracts`,
        );
      if (extractsResponse.status === 200) {
        setExtracts(extractsResponse.data);
        setExtractsModal(true);
      }
    }
  }

  return (
    <section id="generate">
      {!generated && (
        <div id="welcome-to-generate">
          <div className="generate-welcome-text">
            <h1 className="main-title">
              Create Your Custom A-Level Economics Exam
            </h1>
            <h2 className="section-title-generate">
              Here you can create a custom A-Level Economics exam based on our
              extensive question database. Click the button below to generate an
              exam variant that meets the official A-Level exam structure,
              including Sections A, B, and C.
            </h2>
          </div>
          <button className="generate-button" onClick={Generate}>
            Generate Exam
          </button>
        </div>
      )}
      {generated && (
        <div className="variant">
          <ModalPortal
            open={extractsModal}
            onClick={() => {
              setExtractsModal(false);
            }}
          >
            <div className="extracts-container">
              <div className="extracts-header">
                <h2 className="extracts-header-text">Extracts</h2>
              </div>
              {extracts?.map((extract) => (
                <Extract literal={extract.literal} text={extract.content} />
              ))}
            </div>
          </ModalPortal>
          <div className="variant-header">
            <h2 className="variant-title">Generated variant</h2>
          </div>
          <div className="variant-container">
            <div className="variant-section">
              <h2 className="variant-section-text">Section A</h2>
            </div>
            {questionsA?.map((task, index) => (
              <QuestionView
                id={task}
                index={index + 1}
                key={task}
                topics={topics?.names}
                onDelete={() => {}}
                onEdit={() => {}}
                predict={false}
                edited={false}
                state="extracts"
                onLink={getExtracts}
              />
            ))}
            <div className="variant-section">
              <h2 className="variant-section-text">Section B</h2>
            </div>
            {questionsB?.map((task, index) => (
              <QuestionView
                id={task}
                index={index + 1}
                key={task}
                topics={topics?.names}
                onDelete={() => {}}
                onEdit={() => {}}
                predict={false}
                edited={false}
                state="extracts"
                onLink={getExtracts}
              />
            ))}
            <div className="variant-section">
              <h2 className="variant-section-text">Section C</h2>
            </div>
            <QuestionView
              id={questionsC!}
              index={1}
              key={questionsC}
              topics={topics?.names}
              onDelete={() => {}}
              onEdit={() => {}}
              predict={false}
              edited={false}
              state="extracts"
              onLink={getExtracts}
            />
          </div>
        </div>
      )}
    </section>
  );
}

'use client';
import { useState } from 'react';
import styles from './generate.module.css';
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
  const [generatedCorrectly, setGeneratedCorrectly] = useState<boolean>(false);
  const [questionsA, setQuestionsA] = useState<string[]>([]);
  const [questionsB, setQuestionsB] = useState<string[]>([]);
  const [questionsC, setQuestionsC] = useState<string | null>(null);
  const [extractsModal, setExtractsModal] = useState<boolean>(false);
  const [extracts, setExtracts] = useState<ExtractsResponse[] | null>(null);

  async function Generate() {
    const generateResponse: AxiosResponse<GenerateResponse> = await axios.get(
      'https://chartreuse-binghamite1373.my-vm.work/utils/exam',
    );
    if (generateResponse.status === 200 && generateResponse.data !== null) {
      setQuestionsA(generateResponse.data['sectionA']);
      setQuestionsB(generateResponse.data['sectionB']);
      setQuestionsC(generateResponse.data['sectionC']);
      setGeneratedCorrectly(true);
    } else {
      console.log('error');
      setGeneratedCorrectly(false);
    }
    setGenerated(true);
  }

  async function getExtracts(document_id: string | null) {
    if (document_id !== null) {
      const extractsResponse: AxiosResponse<ExtractsResponse[]> =
        await axios.get(
          `https://chartreuse-binghamite1373.my-vm.work/document/${document_id}/extracts`,
        );
      if (extractsResponse.status === 200) {
        setExtracts(extractsResponse.data);
        setExtractsModal(true);
      }
    }
  }

  return (
    <section id={styles.generate}>
      {!generated && (
        <div id={styles.welcome_to_generate}>
          <div className={styles.generate_welcome_text}>
            <h1 className={styles.main_title}>
              Create Your Custom A-Level Economics Exam
            </h1>
            <h2 className={styles.section_title_generate}>
              Here you can create a custom A-Level Economics exam based on our
              extensive question database. Click the button below to generate an
              exam variant that meets the official A-Level exam structure,
              including Sections A, B, and C.
            </h2>
          </div>
          <button className={styles.generate_button} onClick={Generate}>
            Generate Exam
          </button>
        </div>
      )}
      {generated &&
        (generatedCorrectly ? (
          <div className={styles.variant}>
            <ModalPortal
              open={extractsModal}
              onClick={() => {
                setExtractsModal(false);
              }}
            >
              <div className={styles.extracts_container}>
                <div className={styles.extracts_header}>
                  <h2 className={styles.extracts_header_text}>Extracts</h2>
                </div>
                {extracts?.map((extract) => (
                  <Extract literal={extract.literal} text={extract.content} />
                ))}
              </div>
            </ModalPortal>
            <div className={styles.variant_header}>
              <h2 className={styles.variant_title}>Generated variant</h2>
            </div>
            <div className={styles.variant_container}>
              <div className={styles.variant_section}>
                <h2 className={styles.variant_section_text}>Section A</h2>
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
              <div className={styles.variant_section}>
                <h2 className={styles.variant_section_text}>Section B</h2>
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
              <div className={styles.variant_section}>
                <h2 className={styles.variant_section_text}>Section C</h2>
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
        ) : (
          <div className={styles.regenerate_container}>
            <h2 className={styles.regenerate_title}>The generation failed</h2>
            <button
              className={styles.regenerate_button}
              onClick={() => setGenerated(false)}
            >
              Regenerate
            </button>
          </div>
        ))}
    </section>
  );
}

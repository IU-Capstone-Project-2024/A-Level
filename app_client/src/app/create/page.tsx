'use client';
import { useState } from 'react';
import SetQuestion from '../../components/SetQuestion/SetQuestion';
import styles from './create.module.css';
import { useRouter } from 'next/navigation';

export default function CreateQuestionPage() {
  const [showChart, setShowChart] = useState<boolean>(false);
  const router = useRouter();
  function afterSave() {
    router.push('/saved');
  }
  return (
    <div className={styles.create_question_content}>
      <div className={styles.question_container_without_border}>
        <div className={styles.question_container_heading}>
          <h2 className={styles.question_container_heading_text}>
            Create question
          </h2>
        </div>
        <SetQuestion
          task={null}
          afterSave={afterSave}
          showChart={showChart}
          setShowChart={setShowChart}
        />
      </div>
    </div>
  );
}

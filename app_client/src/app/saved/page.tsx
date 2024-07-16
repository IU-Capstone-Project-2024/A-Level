'use client';
import { useRouter } from 'next/navigation';
import styles from './saved.module.css';

export default function SavedCreatedQuestionPage() {
  const router = useRouter();
  return (
    <div className={styles.saved_container}>
      <h2 className={styles.saved_title}>The task was successfully created!</h2>
      <button
        className={styles.create_button}
        onClick={() => router.push('/create')}
      >
        Create another question
      </button>
    </div>
  );
}

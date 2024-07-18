import Image from 'next/image';
import styles from './page.module.css';
import Illustration1 from '../images/illustration-green chairs-table.svg';
import Illustration2 from '../images/illustration-isometric-view-of-office-desk.svg';
import ReasonCard from '../components/ReasonCard/ReasonCard';
import StepOdd from '../components/StepOdd/StepOdd';
import StepEven from '../components/StepEven/StepEven';
import ActionButton from '@/components/ActionButton/ActionButton';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'A for A',
    description:
      'A for A enables interactive learning, efficient preparation, and enhanced exam performance for students who struggle upon A-level exam',
  };
}

export default function HomePage() {
  return (
    <div className={styles.main}>
      <section id={styles.welcome_container}>
        <h1 className={styles.main_title}>
          Transform Your A-Level Economics Revision
        </h1>
        <h2 className={styles.section_title}>
          Interactive flashcards powered by machine learning to help you achieve
          an A
        </h2>
        <div className={styles.welcome_content}>
          <Image
            id={styles.ill1}
            src={Illustration1}
            alt="Sage table and chairs"
          />
          <ActionButton title="Try It Now" />
        </div>
      </section>
      <section id={styles.why_A4A}>
        <h2 className={styles.section_title}>Why AforA?</h2>
        <div className={styles.reasons_cards}>
          <ReasonCard
            title="Interactive Learning"
            description="Say goodbye to passive reading. With AforA, you can actively engage with your study materials, making your revision sessions more effective."
          />
          <ReasonCard
            title="Efficient Preparation"
            description="Access a wealth of categorized flashcards that cover all key areas of the A-level Economics syllabus. Spend less time organizing your study materials and more time mastering them."
          />
          <ReasonCard
            title="Enhanced Exam Performance"
            description="Our interactive flashcards and structured approach help you retain information better, understand complex concepts, and ultimately achieve higher marks in your exams."
          />
        </div>
      </section>
      <section id={styles.problem_we_solve}>
        <h2 className={styles.section_title}>The Problem We Solve</h2>
        <div className={styles.problem_content}>
          <Image id={styles.ill2} src={Illustration2} alt="Workplace" />
          <p className={styles.problem_paragraph}>
            A-level Economics students often struggle with unstructured
            resources, monotonous study practices, and limited interactivity in
            their revision materials. AforA addresses these challenges by
            transforming static practice questions into interactive, categorized
            flashcards, providing a structured and engaging learning
            environment. Traditional study methods can be monotonous and
            ineffective, leaving students unprepared for their exams. AforA's
            innovative approach ensures that you have access to the best
            revision tools, enabling you to study smarter, not harder.
          </p>
        </div>
      </section>
      <section id={styles.how_it_works}>
        <h2 className={styles.section_title}>How It Works</h2>
        <div className={styles.steps}>
          <StepOdd
            color="var(--color-violet)"
            title="Upload"
            description="Import your PDF practice questions."
            index={1}
          />
          <StepEven
            color="var(--color-cambridge-blue)"
            title="Convert"
            description="Transform PDFs into interactive flashcards."
            index={2}
          />
          <StepOdd
            color="var(--color-lavender)"
            title="Engage"
            description="Actively study with personalized materials."
            index={3}
          />
          <StepEven
            color="var(--color-sage)"
            title="Track"
            description="Monitor your progress and improve."
            index={4}
          />
        </div>
      </section>
      <section id={styles.last_action}>
        <h1 className={styles.main_title}>
          Ready to Achieve an A in A-Level Economics?
        </h1>
        <ActionButton title="Get Started" />
      </section>
    </div>
  );
}

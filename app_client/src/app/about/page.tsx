'use client';
import styles from './about.module.css';
import Illustration3 from '../../images/illustration-calendar-reminders-for-time-management.svg';
import Illustration4 from '../../images/illustration-colleagues-working.svg';
import Value from '../../components/Value/Value';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className={styles.about_us}>
      <h1 className={styles.main_title}>About Us</h1>
      <section id={styles.our_goal}>
        <Image
          id={styles.ill3}
          src={Illustration3}
          alt="Calendar and reminders for time managment"
        />
        <div className={styles.goal_container}>
          <h2 className={`${styles.section_title_about} ${styles.violet}`}>
            Our Goal
          </h2>
          <p className={`${styles.section_paragraph} ${styles.align_right}`}>
            At AforA, our mission is to revolutionize A-level Economics revision
            by providing students with innovative, interactive learning tools
            that enhance understanding and exam preparation. We believe in
            empowering students to achieve their academic goals through smart,
            structured studying.
          </p>
        </div>
      </section>
      <section id={styles.who_we_are}>
        <div className={styles.who_we_are_container}>
          <h2 className={styles.section_title_about}>Who We Are</h2>
          <p className={`${styles.section_paragraph} ${styles.align_left}`}>
            AforA was founded by a team of computer science students who are
            passionate about education and technology. Recognizing the need for
            improved study resources in A-level Economics, our team is committed
            to leveraging their backgrounds in computer science, technology, and
            machine learning to revolutionize the learning experience and
            enhance student success.
          </p>
        </div>
        <Image
          id={styles.ill4}
          src={Illustration4}
          alt="Colleagues working and talking in the office"
        />
      </section>
      <section id={styles.our_values}>
        <h2 className={styles.section_title_about}>Our Values</h2>
        <Value
          value="Excellence"
          description="Striving for excellence in educational technology and student support."
        />
        <Value
          value="Innovation"
          description="Embracing innovation to continuously improve our learning tools."
        />
        <Value
          value="Empowerment"
          description=" Empowering students to take control of their learning and achieve academic success."
        />
      </section>
      <section id={styles.join_us}>
        <h2 className={`${styles.section_title_about} ${styles.sage_dark}`}>
          Join Us
        </h2>
        <p className={`${styles.section_paragraph} ${styles.align_center}`}>
          Experience the difference with AforA, where we're dedicated to
          enhancing your A-level Economics revision journey. Whether you're
          striving to excel in exams or deepen your understanding of economics,
          AforA is your trusted companion, ready to assist you at every stage.
        </p>
      </section>
    </div>
  );
}

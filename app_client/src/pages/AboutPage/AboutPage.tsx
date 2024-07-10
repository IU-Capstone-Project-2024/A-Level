import './AboutPage.css';
import Illustration3 from '../../images/illustration-calendar-reminders-for-time-management.svg';
import Illustration4 from '../../images/illustration-colleagues-working.svg';
import Value from '../../components/Value/Value';

export default function AboutPage() {
  return (
    <div className="about-us">
      <h1 className="main-title">About Us</h1>
      <section id="our-goal">
        <img
          src={Illustration3}
          alt="Calendar and reminders for time managment"
        />
        <div className="goal-container">
          <h2 className="section-title-about violet">Our Goal</h2>
          <p className="section-paragraph align-right">
            At AforA, our mission is to revolutionize A-level Economics revision
            by providing students with innovative, interactive learning tools
            that enhance understanding and exam preparation. We believe in
            empowering students to achieve their academic goals through smart,
            structured studying.
          </p>
        </div>
      </section>
      <section id="who-we-are">
        <div className="who-we-are-container">
          <h2 className="section-title-about">Who We Are</h2>
          <p className="section-paragraph align-left">
            AforA was founded by a team of computer science students who are
            passionate about education and technology. Recognizing the need for
            improved study resources in A-level Economics, our team is committed
            to leveraging their backgrounds in computer science, technology, and
            machine learning to revolutionize the learning experience and
            enhance student success.
          </p>
        </div>
        <img
          src={Illustration4}
          alt="Colleagues working and talking in the office"
        />
      </section>
      <section id="our-values">
        <h2 className="section-title-about">Our Values</h2>
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
      <section id="join-us">
        <h2 className="section-title-about sage-dark">Join Us</h2>
        <p className="section-paragraph align-center">
          Experience the difference with AforA, where we're dedicated to
          enhancing your A-level Economics revision journey. Whether you're
          striving to excel in exams or deepen your understanding of economics,
          AforA is your trusted companion, ready to assist you at every stage.
        </p>
      </section>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import SetQuestion from '../../components/SetQuestion/SetQuestion';
import './CreateQuestionPage.css';

export default function CreateQuestionPage() {
  const navigate = useNavigate();
  function afterSave() {
    navigate('/saved');
  }
  return (
    <div className="create-question-content">
      <div className="question-container-without-border">
        <div className="question-container-heading">
          <h2 className="question-container-heading-text">Create question</h2>
        </div>
        <SetQuestion task={null} afterSave={afterSave} />
      </div>
    </div>
  );
}

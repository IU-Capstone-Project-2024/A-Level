import { useNavigate } from "react-router";
import './SavedCreatedQuestionPage.css';

export default function SavedCreatedQuestionPage() {
    const navigate = useNavigate();
    return (<div className="saved-container">
        <h2 className="saved-title">The task was successfully created!</h2>
        <button className="create-button" onClick={() => navigate("/create")}>Create another question</button>
    </div>);
}
import IconButton from '../IconButton/IconButton';
import './QuestionView.css';
import EditIcon from '../../images/edit.svg';
import DeleteIcon from '../../images/delete.svg';

export default function QuestionView() {


    return (
        <div className='question-container'>
            <h6 className='question-number'>Question 1</h6>
            <div className='question-content'>
                <div className='question-text-container'>
                    <p className='question-text'>Define the term 'brand'fjdkvbdfjvbkjvbdjkbfjkbdfkbvdkfjb.</p>
                </div>
                <div className='question-details'>
                    <div className='question-topic'>
                        <h2 className='topic'>Marketing mix and strategy</h2>
                    </div>
                    <span className='question-mark'>Mark: 2</span>
                    <span className='question-year'>Year: 2021</span>
                    <div className='question-buttons'>
                        <IconButton icon={EditIcon} 
                            onClick={() => alert('Edit clicked!')} 
                            alt="Edit icon" 
                            title="Edit"/>
                        <IconButton icon={DeleteIcon} 
                            onClick={() => alert('Delete clicked!')} 
                            alt="Delete icon" 
                            title="Delete"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
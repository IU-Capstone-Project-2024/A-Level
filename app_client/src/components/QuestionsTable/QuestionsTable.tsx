import { useNavigate } from 'react-router';
import './QuestionsTable.css';

interface TableData {
  topic: string;
  question: string;
  id: string;
}

interface TableProps {
  data: TableData[];
}

export default function Table({ data }: TableProps) {
  const navigate = useNavigate();
  const handleQuestionClick = (row: TableData) => {
    navigate(`/question/${row.id}`);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Topic</th>
          <th>Question</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => handleQuestionClick(row)}>
            <td>{row.topic}</td>
            <td>{row.question}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import './QuestionsTable.css';
import { useRouter } from 'next/navigation';

interface TableData {
  topic: string;
  question: string;
  id: string;
}

interface TableProps {
  data: TableData[];
}

export default function Table({ data }: TableProps) {
  const router = useRouter();
  const handleQuestionClick = (row: TableData) => {
    router.push(`/question/${row.id}`);
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

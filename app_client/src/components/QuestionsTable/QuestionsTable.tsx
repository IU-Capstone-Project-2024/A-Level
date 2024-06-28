import './QuestionsTable.css';

interface TableData {
    topic: string;
    question: string;
}

interface TableProps {
    data: TableData[];
}

export default function Table({ data }: TableProps) {
    const handleQuestionClick = (row: TableData) => {
        console.log(`${row.topic} ${row.question} is clicked`);
    };

    return (
        <table className='table'>
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

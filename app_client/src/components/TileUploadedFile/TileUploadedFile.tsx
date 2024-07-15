import axios, { AxiosResponse } from 'axios';
import './TileUploadedFile.css';
import { useNavigate } from 'react-router-dom';
import { useTopics } from '../../context/TopicContext';

interface TileProps {
  image: string;
  title: string;
  id: number;
}

interface DocumentProps {
  _id: string;
  path: string;
  filename: string;
  tasks: string[];
  img: string | null;
}

export default function TileUploadedFile({ image, title, id }: TileProps) {
  const navigate = useNavigate();
  const { topics } = useTopics();

  async function switchToDoc(id: number) {
    //change the function here when a tile will be clicked
    const responseDoc: AxiosResponse<DocumentProps> = await axios.get(
      `https://203.31.40.71:8000/document/${id}`,
    );
    if (responseDoc.status === 200) {
      const doc: DocumentProps = responseDoc.data;
      navigate(`/document/${doc.filename}`, { state: { doc, topics } });
    } else {
      console.log('An error occurred while uploading the file');
    }
  }

  return (
    <div className="tile-outer" onClick={() => switchToDoc(id)}>
      <div className="tile-inner">
        <img src={image} alt={title} className="tile-image" />
        <div className="tile-title">{title}</div>
      </div>
    </div>
  );
}

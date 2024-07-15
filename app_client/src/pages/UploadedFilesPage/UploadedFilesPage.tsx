import './UploadedFilesPage.css';
import Grid from '../../components/GridUploadedFile/GridUploadedFile';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../components/PaginationUploaded/PaginationUploaded';

const maxTilesPerPage = 2;

export default function Uploaded() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);

  async function getDocs(page: number, length: number) {
    const res = await axios.get('https://203.31.40.71:8000/document', {
      params: {
        offset: page - 1,
        length: length,
      },
    });
    return res.data;
  }

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      const fetchedDocs = await getDocs(page, maxTilesPerPage);
      const totalDoc = await axios.get(
        'https://203.31.40.71:8000/document/number',
      );
      setTotalDocs(totalDoc.data);
      setDocs(fetchedDocs);
      setLoading(false);
      console.log(page);
    }
    fetchDocs();
  }, [page]);

  function test(updatedPage: number) {
    setPage(updatedPage);
    console.log(updatedPage);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const tiles = docs.map(({ filename, img, _id }) => ({
    image: img,
    title: filename,
    id: _id,
  }));

  return (
    <div className="uploaded-page-content">
      <div className="center-container">
        <Grid tiles={tiles} />
        <Pagination
          total={Math.ceil(totalDocs / maxTilesPerPage)}
          onUpdatePage={test}
          page={page}
        />
      </div>
    </div>
  );
}

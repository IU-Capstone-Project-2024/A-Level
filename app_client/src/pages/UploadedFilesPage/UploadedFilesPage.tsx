import './UploadedFilesPage.css';
import Grid from '../../components/GridUploadedFile/GridUploadedFile';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../components/PaginationUploaded/PaginationUploaded';

const maxTilesPerPage = 4;

export default function Uploaded() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);

  async function getDocs(page: number, length: number) {
    const res = await axios.get(
      'https://chartreuse-binghamite1373.my-vm.work/document/',
      {
        params: {
          offset: page - 1,
          length: length,
        },
      },
    );
    return res.data;
  }

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      const fetchedDocs = await getDocs(page, maxTilesPerPage);
      const totalDoc = await axios.get(
        'https://chartreuse-binghamite1373.my-vm.work/document/number',
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
    return <div className="no-data-uploaded">Loading...</div>;
  }

  if (docs.length === 0) {
    return <div className="no-data-uploaded">No data to display</div>;
  }

  const tiles = docs.map(({ filename, img, id }) => ({
    image: img,
    title: filename,
    id: id,
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

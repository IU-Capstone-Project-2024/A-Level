import './Uploaded.css';
import Grid from '../GridUploadedFile/GridUploadedFile';
import { useState, useEffect } from 'react';
import axios from "axios";
import Pagination from '../PaginationUploaded/PaginationUploaded';

const maxTilesPerPage = 2;

async function getDocs(page:number, length:number) {
    const offset = (page - 1) * length;
    const res = await axios.get(`http://localhost:8000/document`, {
        params: {
            offset: offset,
            length: length
        }
    });
    return res.data;
}

export default function Uploaded() {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchDocs() {
            setLoading(true);
            const fetchedDocs = await getDocs(page, maxTilesPerPage);
            setDocs(fetchedDocs);
            setLoading(false);
        }
        fetchDocs();
    }, [page]);

    function test(updatedPage:number) {
        setPage(updatedPage);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const tiles2 = docs.map(({ filename, img, _id }) => ({ image: img, title: filename, id: _id }));

    return (
        <div className="uploaded-page-content">
            <div className="center-container">
                <Grid tiles={tiles2} />
                <Pagination total={Math.ceil(docs.length / maxTilesPerPage)} onUpdatePage={test} />
            </div>
        </div>
    );
}

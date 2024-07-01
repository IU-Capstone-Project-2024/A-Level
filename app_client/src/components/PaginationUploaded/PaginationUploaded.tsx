import './PaginationUploaded.css'
import {useState } from "react";

interface PaginationPanelTotal {
    total:number;
    onUpdatePage: (currentPage:number)=>void;
    page:number;
}
export default function Pagination({total, onUpdatePage, page}: PaginationPanelTotal) {
    const [, setCurrentPage] = useState(1);
  
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        onUpdatePage(page);
    };
  
    const handlePreviousClick = () => {
        if (page > 1) {
            setCurrentPage(page - 1);
            onUpdatePage(page - 1);
        }
    };
  
    const handleNextClick = () => {
        if (page < total) {
            setCurrentPage(page + 1);
            onUpdatePage(page + 1);
        }
    };
  
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const range = 1;
  
        //first page
        pageNumbers.push(
            <button
            key={1}
            className={`page-button ${page === 1 ? 'active' : 'not-active'}`}
            onClick={() => handlePageClick(1)}
            >
            1
            </button>
        );
    
        //ellipsis between first page and current page
        if (page > range + 2) {
            pageNumbers.push(<span key="start-ellipsis" className="ellipsis">...</span>);
        }
    
        //pages around the current page
        for (let i = Math.max(2, page - range); i <= Math.min(total - 1, page + range); i++) {
            pageNumbers.push(
            <button
                key={i}
                className={`page-button ${page === i ? 'active' : 'not-active'}`}
                onClick={() => handlePageClick(i)}
            >
                {i}
            </button>
            );
        }
    
        //ellipsis between current page and last page
        if (page < total - range - 1) {
            pageNumbers.push(<span key="end-ellipsis" className="ellipsis">...</span>);
        }
    
        //last page (if there are more than 1 page)
        if (total > 1) {
            pageNumbers.push(
            <button
                key={total}
                className={`page-button ${page === total ? 'active' : 'not-active'}`}
                onClick={() => handlePageClick(total)}
            >
                {total}
            </button>
            );
        }
        return pageNumbers;
    };
    return (
      <div className="pagination-panel">
        <button onClick={handlePreviousClick} disabled={page === 1}>
          Prev
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextClick} disabled={page === total}>
          Next
        </button>
      </div>
    );
};
import './PaginationUploaded.css'
import { useState } from "react";

interface PaginationPanelTotal {
    total:number;
}
export default function Pagination(totalPages: PaginationPanelTotal) {
    const [currentPage, setCurrentPage] = useState(1);
  
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };
  
    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
  
    const handleNextClick = () => {
        if (currentPage < totalPages.total) {
            setCurrentPage(currentPage + 1);
        }
    };
  
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const range = 1;
  
        //first page
        pageNumbers.push(
            <button
            key={1}
            className={`page-button ${currentPage === 1 ? 'active' : 'not-active'}`}
            onClick={() => handlePageClick(1)}
            >
            1
            </button>
        );
    
        //ellipsis between first page and current page
        if (currentPage > range + 2) {
            pageNumbers.push(<span key="start-ellipsis" className="ellipsis">...</span>);
        }
    
        //pages around the current page
        for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages.total - 1, currentPage + range); i++) {
            pageNumbers.push(
            <button
                key={i}
                className={`page-button ${currentPage === i ? 'active' : 'not-active'}`}
                onClick={() => handlePageClick(i)}
            >
                {i}
            </button>
            );
        }
    
        //ellipsis between current page and last page
        if (currentPage < totalPages.total - range - 1) {
            pageNumbers.push(<span key="end-ellipsis" className="ellipsis">...</span>);
        }
    
        //last page (if there are more than 1 page)
        if (totalPages.total > 1) {
            pageNumbers.push(
            <button
                key={totalPages.total}
                className={`page-button ${currentPage === totalPages.total ? 'active' : 'not-active'}`}
                onClick={() => handlePageClick(totalPages.total)}
            >
                {totalPages.total}
            </button>
            );
        }
        return pageNumbers;
    };
    console.log(totalPages.total);
    return (
      <div className="pagination-panel">
        <button onClick={handlePreviousClick} disabled={currentPage === 1}>
          Prev
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextClick} disabled={currentPage === totalPages.total}>
          Next
        </button>
      </div>
    );
};
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Show the current page
    pageNumbers.push(
      <li
        key={currentPage}
        className={`cursor-pointer mx-1 px-3 py-1 rounded bg-purple-400`}
        onClick={() => handlePageChange(currentPage)}
      >
        {currentPage}
      </li>
    );

    // Show the next 3 pages
    for (
      let i = currentPage + 1;
      i <= Math.min(currentPage + 3, totalPages);
      i++
    ) {
      pageNumbers.push(
        <li
          key={i}
          className={`cursor-pointer mx-1 px-3 py-1 rounded hover:bg-purple-300 bg-secondary text-white`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    // Show the last page if it's not already shown
    if (currentPage + 3 < totalPages) {
      pageNumbers.push(
        <li
          key={totalPages}
          className={`cursor-pointer mx-1 px-3 py-1 rounded hover:bg-purple-300 bg-secondary text-white`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen p-4 bg-secondary">
      <ul className="flex justify-center bg-secondary text-white ">
        <li
          className={`cursor-pointer mx-1 px-3 py-1 rounded hover:bg-purple-300 ${
            currentPage === 1
              ? "bg-secondary text-white"
              : "bg-secondary text-white"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </li>
        {renderPageNumbers()}
        <li
          className={`cursor-pointer mx-1 px-3 py-1 rounded  hover:bg-purple-300 ${
            currentPage === totalPages
              ? "bg-secondary text-white"
              : "bg-secondary text-white"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

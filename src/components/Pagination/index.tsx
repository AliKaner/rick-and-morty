import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const PageButton: React.FC<{
  onClick: () => void;
  label: string | number;
}> = ({ onClick, label }) => (
  <li
    className="cursor-pointer mx-1 px-3 py-1 rounded hover:bg-purple-300 bg-secondary text-white"
    onClick={onClick}
  >
    {label}
  </li>
);

const Dots: React.FC = () => (
  <li className="cursor-pointer mx-1 px-3 py-1 bg-secondary text-white">...</li>
);

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);

      // Scroll to the top of the screen
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageButton = (pageNumber: number) => (
    <PageButton
      onClick={() => handlePageChange(pageNumber)}
      label={pageNumber}
    />
  );

  return (
    <div className="p-4 bg-secondary">
      <ul className="flex justify-center bg-secondary text-white">
        {currentPage > 1 && (
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            label="Previous"
          />
        )}
        {currentPage > 2 && <PageButton onClick={() => handlePageChange(1)} label={1} />}
        {currentPage > 3 && <Dots />}
        {currentPage > 1 && renderPageButton(currentPage - 1)}
        {renderPageButton(currentPage)}
        {currentPage < totalPages && renderPageButton(currentPage + 1)}
        {currentPage < totalPages - 1 && <Dots />}
        {currentPage < totalPages - 1 && (
          <PageButton
            onClick={() => handlePageChange(totalPages)}
            label={totalPages}
          />
        )}
        {currentPage < totalPages && (
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            label="Next"
          />
        )}
      </ul>
    </div>
  );
};

export default Pagination;

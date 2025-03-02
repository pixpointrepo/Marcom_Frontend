import React from "react";


const Pagination = ({ currentPage, totalFetchedPages, handlePageChange }) => {
  const pages = [];

  if (totalFetchedPages <= 5) {
    // Show all pages if total pages <= 5
    for (let i = 1; i <= totalFetchedPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Middle pages logic
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalFetchedPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalFetchedPages - 2) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalFetchedPages);
  }

  return (
    <div className="flex justify-center mt-10 space-x-2 text-sm">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-blue-500 hover:text-white"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 border rounded bg-gray-100">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalFetchedPages}
        className={`px-3 py-1 border rounded ${
          currentPage === totalFetchedPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-blue-500 hover:text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;


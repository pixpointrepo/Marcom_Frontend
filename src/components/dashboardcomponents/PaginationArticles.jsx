import React from "react";

const Pagination = ({ totalFetchedPages, page, setPage }) => {
  console.log(totalFetchedPages)
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const getPaginationRange = () => {
    const totalPages = totalFetchedPages || 0;
    const range = [];

    // Return empty array if 0 or 1 page
    if (totalPages <= 1) return [];

    const maxVisibleNumbers = 5; // Maximum numbers to show (excluding ellipsis)
    const sideNumbers = 2; // Numbers shown on each side of current page

    // If total pages is small enough, show all pages
    if (totalPages <= maxVisibleNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    // Calculate start and end of the sliding window
    let start = Math.max(1, page - sideNumbers);
    let end = Math.min(totalPages, page + sideNumbers);

    // Adjust start and end if we're near the edges
    if (page <= sideNumbers + 1) {
      start = 1;
      end = maxVisibleNumbers - 1;
    } else if (page >= totalPages - sideNumbers) {
      start = totalPages - (maxVisibleNumbers - 2);
      end = totalPages;
    }

    // Add first page and ellipsis if needed
    if (start > 2) {
      range.push(1);
      range.push("...");
    } else if (start === 2) {
      range.push(1);
    }

    // Add the sliding window of numbers
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add last page and ellipsis if needed
    if (end < totalPages - 1) {
      range.push("...");
      range.push(totalPages);
    } else if (end === totalPages - 1) {
      range.push(totalPages);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  if (totalFetchedPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => {
          setPage(page - 1);
          scrollToTop();
        }}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
      >
        Previous
      </button>

      {paginationRange.map((item, index) => (
        <div key={index}>
          {item === "..." ? (
            <span className="px-2 py-1">...</span>
          ) : (
            <button
              onClick={() => {
                setPage(item);
                scrollToTop();
              }}
              className={`px-4 py-2 rounded-lg ${
                page === item
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          setPage(page + 1);
          scrollToTop();
        }}
        disabled={page === totalFetchedPages}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
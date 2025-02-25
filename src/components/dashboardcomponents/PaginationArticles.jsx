import React from "react";

const Pagination = ({ totalFetchedPages, page, setPage }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Generate pagination range
  const getPaginationRange = () => {
    const totalPages = totalFetchedPages || 0;
    const range = [];
    const halfTotalPages = Math.floor(totalPages / 2); // Halfway point

    // If total pages is 0 or 1, return empty range
    if (totalPages <= 1) return [];

    let firstPage, secondPage;

    if (page === 1) {
      // On page 1, show 1 and 2
      firstPage = 1;
      secondPage = totalPages > 1 ? 2 : null;
    } else if (page <= halfTotalPages) {
      // Up to half, show current and next
      firstPage = page;
      secondPage = page < totalPages ? page + 1 : null;
    } else {
      // After half, including last page, show 1, ..., current, next (if not last)
      firstPage = 1; // Always start with 1
      range.push(firstPage);
      range.push("..."); // Ellipsis after 1
      firstPage = page; // Current page becomes the next number
      secondPage = page < totalPages ? page + 1 : null;
    }

    // Build the range
    range.push(firstPage);
    if (secondPage && secondPage !== firstPage) {
      range.push(secondPage);
    }

    // Add ellipsis if there's a gap to the last page (only if not already added)
    if (
      totalPages > 2 &&
      secondPage &&
      secondPage < totalPages &&
      range[range.length - 1] !== "..."
    ) {
      range.push("...");
    }

    // Add last page if not already included
    if (totalPages > 1 && totalPages !== range[range.length - 1]) {
      range.push(totalPages);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  // Don't render pagination if there's no pages or only one page
  if (totalFetchedPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* Previous Button */}
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

      {/* Pagination Numbers */}
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

      {/* Next Button */}
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
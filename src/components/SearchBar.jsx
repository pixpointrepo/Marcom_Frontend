import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ isDesktop }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?title=${searchQuery}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center ${isDesktop ? "gap-2" : "w-full bg-white px-4 py-2"}`}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
        className={`border text-black border-gray-300 px-4 py-1 focus:outline-none ${
          isDesktop ? "" : "w-full mr-2 focus:ring-2 focus:ring-blue-500"
        }`}
      />
      <button
        type="submit"
        className={`${
          isDesktop
            ? "bg-gradient-to-tr from-main to-purple-700 text-xs text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700"
            : ""
        }`}
        
        aria-label="Search"
      >
        {isDesktop ? (
          "Search"
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="bg-gray-200 p-2 w-10 h-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </form>
  );
};

export default SearchBar;

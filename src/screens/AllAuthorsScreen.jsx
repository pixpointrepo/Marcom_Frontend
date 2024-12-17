
import { useNavigate } from "react-router-dom";
import allNewsArticles from "../data/articles";

const AllAuthorsScreen = () => {
  const navigate = useNavigate();

  // Extract all unique authors from articles
  const allArticles = Object.values(allNewsArticles).flatMap(
    (category) => category.articles
  );

  const uniqueAuthors = Array.from(
    new Set(allArticles.map((article) => article.author))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium mb-6 text-center">All Authors</h1>

      {/* Display Authors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {uniqueAuthors.map((author) => (
          <div
            key={author}
            onClick={() =>
              navigate(`/authors/${author.toLowerCase().replace(/\s+/g, "-")}`)
            }
            className="flex flex-col items-center bg-white p-4 rounded-md shadow hover:shadow-lg cursor-pointer text-center transition"
          >
              <img
                      src='/src/assets/images/person.png'
                      alt={author}
                      className="h-32 w-32 object-contain border-1  rounded-full border-2 border-blue-500"
                />
              <h3 className="text-lg font-semibold text-blue-600 hover:underline capitalize">
                {author}
              </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAuthorsScreen;

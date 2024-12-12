import { useParams, useNavigate } from "react-router-dom";
import allArticles from "../data/articles";

const ArticleDetailScreen = () => {
  const { category, articleTitle } = useParams();
  const navigate = useNavigate();
  // Flatten all articles into a single array
  const allArticlesArray = Object.values(allArticles).flatMap((data) => data.articles);

  // Find the article matching the title
  const article = allArticlesArray.find(
    (a) =>
      a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === articleTitle &&
      a.category.toLowerCase().replace(/ /g, "-") === category
  );

  if (!article) {
    return <p>Article not found</p>;
  }

  // Filter other articles in the same category
  const relatedArticles = allArticlesArray.filter(
    (a) => a.category === article.category && a.id !== article.id
  );

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500">
        {article.date} · {article.readTime} · {article.author}
      </p>
      <img
        src={article.thumbnail}
        alt={article.title}
        className="w-full h-64 object-cover rounded-md mt-4 mb-6"
      />
      <p className="text-base leading-relaxed">{article.summary}</p>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Similar Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((related) => (
              <div
                key={related.id}
                className="bg-white border p-2 rounded-md cursor-pointer hover:shadow-lg transition"
                onClick={() =>{
                    navigate(
                      `/${category}/${related.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`
                    )
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth', 
                    });
                  }
                    
                  }
              >
                <img
                  src={related.thumbnail}
                  alt={related.title}
                  className="h-48 w-full object-cover rounded-md"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold hover:text-blue-500">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{related.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailScreen;

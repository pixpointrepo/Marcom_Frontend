import { useParams, useNavigate } from "react-router-dom";

import allNewsArticles from "../data/articles";
import useFetchArticleByUrl from "../components/hooks/useFetchArticleByUrl";


const NewsDetailScreen = () => {
  const { url } = useParams();
  // const navigate = useNavigate();

  const { article, loading, error } = useFetchArticleByUrl(url);

  // // Flatten all articles into a single array
  // const allNewsArticlesArray = Object.values(allNewsArticles).flatMap((data) => data.articles);

  // // Find the article matching the title
  // const article = allNewsArticlesArray.find(
  //   (a) =>
  //     a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === articleTitle &&
  //     a.category.toLowerCase().replace(/ /g, "-") === category
  // );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!article)
    return (
      <div className="text-gray-500 text-center mt-10">No article found.</div>
    );

  // Filter other articles in the same category
  // const relatedArticles = allNewsArticlesArray.filter(
  //   (a) => a.category === article.category && a.id !== article.id
  // );

  return (
    <div className="px-4 md:p-6 ">

      {/* Article Tags */}
      <div className="flex gap-3 mb-2">
        {
          article.tags.map((tag)=>(
            <div key={tag} className="py-0.5 px-2 bg-amber-300 rounded-md text-sm">
              <h2>{tag}</h2>
            </div>
          ))
        }
      </div>

      {/* main article content */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500">
        {article.date} · {article.readTime} · {article.author}
      </p>
      <img
        src={`http://localhost:5000${article.thumbnail}`}
        alt={article.title}
        className="w-full h-64 object-cover rounded-md mt-4 mb-6"
      />
      <p className="text-base leading-relaxed">{article.summary}</p>

      {/* Related Articles */}
      {/* {relatedArticles.length > 0 && (
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
      )} */}
    </div>
  );
};

export default NewsDetailScreen;

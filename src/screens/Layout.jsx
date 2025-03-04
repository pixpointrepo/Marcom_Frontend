import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import allArticles from "../data/articles";

import htmlToPlainText from "../utils/htmlToPlainText";
import useFetchArticles from "../components/hooks/useFetchArticles";

const Layout = () => {
  const navigate = useNavigate();

  // fetch 3 latest articles to display in the sidebar
  const {
    articles: latestArticles,
    error: latestArticlesError,
    loading: latestArticlesLoading,
  } = useFetchArticles({ limit: 3, isFeatured: false });

  return (
    <>
      <Navbar />
      <div className="container mt-4 md:mt-0 mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Left Sidebar or Ads */}
          <div className="hidden md:block bg-gray-100 w-32 mx-2"></div>

          {/* Main Section */}
          <div className="flex-1 space-y-8">
            {/* This is where nested routes (main content) will be rendered */}
            <Outlet />
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-1/4 flex flex-col gap-4">
            {/* Ad Section */}
            <div className="flex items-center justify-center bg-white shadow-md h-72 rounded-md p-4">
              <h1 className="text-2xl text-gray-400">Ad Here</h1>
            </div>

            {/* Latest Stories */}
            <div className="bg-white shadow-md rounded-md p-4 space-y-4">
              {/* Title and Divider */}
              <div className="flex items-center justify-between gap-4 py-2">
                <h2 className="text-md font-semibold text-blue-500 whitespace-nowrap">
                  Latest Stories
                </h2>
                <div className="flex w-[40%] h-0.5 bg-blue-500"></div>
              </div>

              {/* Latest Stories List */}
              <div className="space-y-3">
                
                {/* Error State */}
                {latestArticlesError && (
                  <div className="text-red-500 text-center py-4">
                    Failed to load latest stories. Please try again later.
                  </div>
                )}

                {/* Articles List (only render if not loading and no error) */}
                {latestArticlesLoading ? (
                  <ul className="space-y-3">
                    {[...Array(3)].map((_, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 animate-pulse"
                      >
                        {/* Image Skeleton */}
                        <div className="h-20 w-44 bg-gray-300 rounded-md shadow-sm"></div>

                        {/* Text Skeleton */}
                        <div className="flex flex-col gap-2 w-full">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !latestArticlesError &&
                  latestArticles.length > 0 && (
                    <ul className="space-y-3">
                      {latestArticles.map((story) => (
                        <li
                          key={story.id}
                          className="flex items-start gap-4 hover:text-blue-500 cursor-pointer"
                          onClick={() => {
                            navigate(`/${story.categoryUrl}/${story.url}`);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <img
                            src={`http://localhost:5000${story.thumbnail}`}
                            alt=""
                            className="h-20 w-28 object-cover rounded-md shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.src = "/placeholder-2.png"; // Fallback image path
                            }}
                          />

                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold hover:text-blue-500 line-clamp-2">
                              {story.title}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {htmlToPlainText(story.description)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )
                )}

                {/* No Articles Found */}
                {!latestArticlesLoading &&
                  !latestArticlesError &&
                  latestArticles.length === 0 && (
                    <div className="text-gray-500 text-center py-4">
                      No latest stories available.
                    </div>
                  )}
              </div>
            </div>

            {/* Newsletter Form */}
            <div className=" bg-white shadow-md rounded-md p-8 sticky top-4 -z-10">
              <h2 className="text-2xl font-semibold mb-4 text-left">
                Subscribe to our Newsletter!
              </h2>
              <form className="flex flex-col items-center">
                <input
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  className="w-full border rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-fit text-center bg-blue-900 text-white rounded-lg m-4 px-8 py-2 hover:bg-blue-600 transition"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>

          {/* Right Sidebar or Ads */}
          <div className="hidden md:block bg-gray-100 w-32 mx-2"></div>
        </div>
      </div>
    </>
  );
};

export default Layout;

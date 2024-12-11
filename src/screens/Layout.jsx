import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import allArticles from "../data/articles";

const Layout = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-6 px-2">
      <div className="flex flex-col md:flex-row gap-2">
        {/* Left Sidebar or Ads */}
        <div className="bg-gray-100 w-32 mx-2"></div>

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

            {/* Stories List */}
            <ul className="space-y-3">
              {allArticles.recentArticles.articles.map((story) => (
                <li
                  key={story.id}
                  className="flex items-start gap-4 hover:text-blue-500 cursor-pointer"
                >
                  <img
                    src={story.thumbnail}
                    alt=""
                    className="h-20 w-28 object-cover rounded-md shadow-sm"
                  />
                  <p className="text-left text-xs font-semibold line-clamp-4">
                    {story.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>
  

          {/* Newsletter Form */}
          <div className="sticky top-2 bg-white shadow-md rounded-md p-8">
            <h2 className="text-2xl font-semibold mb-4 text-left">Subscribe to our Newsletter!</h2>
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
        <div className="bg-gray-100 w-32 mx-2"></div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Layout;

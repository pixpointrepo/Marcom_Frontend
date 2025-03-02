const ArticleCardSkeleton = ({ index, isHomeScreen }) => {
    return (
      <div
        className={`bg-gray-200 animate-pulse p-2 border rounded-md overflow-hidden ${
          isHomeScreen && index === 0 ? "md:col-span-2" : ""
        }`}
      >

        {/* Image Skeleton */}
        <div
          className={`bg-gray-300 w-full ${
            isHomeScreen && index === 0 ? "h-64" : "h-48"
          }`}
        ></div>
  
        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-400 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  
          {/* Metadata Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-400 rounded w-16"></div>
            <div className="h-4 bg-gray-400 rounded w-10"></div>
            <div className="h-4 bg-gray-400 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ArticleCardSkeleton;
  
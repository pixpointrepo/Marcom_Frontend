const RelatedArticlesSkeleton = () => {
    return (
      <div className="bg-white border p-2 rounded-md animate-pulse">
        <div className="h-48 w-full bg-gray-300 rounded-md"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-300 rounded-md w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-md w-full mb-1"></div>
          <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
        </div>
      </div>
    );
  };
  
  export default RelatedArticlesSkeleton;
  
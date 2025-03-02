const ArticleSkeleton = () => {
    return (
      <div className="space-y-4 animate-pulse">
        {/* Tags Skeleton */}
        <div className="flex gap-3 mb-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="py-0.5 px-4 bg-gray-300 rounded-md h-6 w-16"></div>
          ))}
        </div>
  
        {/* Title Skeleton */}
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
  
        {/* Metadata Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  
        {/* Image Skeleton */}
        <div className="w-full h-64 bg-gray-300 rounded-md mt-4 mb-6"></div>
  
        {/* Paragraph Skeleton */}
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ArticleSkeleton;
  
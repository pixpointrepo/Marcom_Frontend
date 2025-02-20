export function Button({ children, className, ...props }) {
    return (
      <button
        className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
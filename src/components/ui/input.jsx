export function Input({ className, ...props }) {
    return (
      <input
        className={`border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 ${className}`}
        {...props}
      />
    );
  }
  
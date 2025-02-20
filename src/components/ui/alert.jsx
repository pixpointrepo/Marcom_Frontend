export function Alert({ children, className }) {
    return <div className={`p-3 bg-red-100 text-red-700 rounded-md ${className}`}>{children}</div>;
  }
  
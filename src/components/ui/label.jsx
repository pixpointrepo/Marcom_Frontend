export function Label({ children, className, ...props }) {
    return <label className={`block text-gray-700 ${className}`} {...props}>{children}</label>;
  }
  
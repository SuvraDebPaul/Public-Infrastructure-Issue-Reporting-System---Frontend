export function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const base = "rounded-lg px-4 py-2 font-medium transition";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes = {
    sm: "text-sm px-2 py-1",
    md: "text-base",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

import clsx from "clsx";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) {
  const variants = {
    primary:
      "bg-red-600 hover:bg-red-500 text-white",

    secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-white",

    outline:
      "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      {...props}
      className={clsx(
        "rounded-full font-semibold transition-all duration-300",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}
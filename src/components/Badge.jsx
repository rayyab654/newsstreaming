export default function Badge({
  children,
  color = "red",
}) {
  const colors = {
    red: "bg-red-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-500 text-black",
    gray: "bg-zinc-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
}
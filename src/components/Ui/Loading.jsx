export default function Loading({
  text = "Loading...",
}) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />

        <p className="text-zinc-400">
          {text}
        </p>

      </div>

    </div>
  );
}

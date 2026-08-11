import { Link } from "react-router-dom";
import { Play, Star, Eye, Calendar } from "lucide-react";

export default function MovieCard({ item }) {
  const image = item.cover_url || item.cover || "https://placehold.co/400x600/111827/ffffff?text=No+Image";
  const rating = item.rating || "-";
  const views = item.view || 0;
  const release = item.release_year || "-";
  const genres = Array.isArray(item.genre) ? item.genre : String(item.genre || "").split(",").filter(Boolean);
  const encodedPath = encodeURIComponent(item.path || item.id || "");

  return (
    <Link to={`/detail/${item.type}/${encodedPath}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition duration-500 group-hover:-translate-y-2 group-hover:shadow-red-600/20">
        <img src={image} alt={item.title} loading="lazy" onError={e => { e.currentTarget.src = "https://placehold.co/400x600/111827/ffffff?text=No+Image"; }} className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-red-600/90 px-2.5 py-1 text-[10px] font-black uppercase">{item.type}</span>
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="line-clamp-2 font-bold">{item.title}</h3>
          <div className="mt-3 flex items-center gap-3 text-xs text-zinc-300">
            <span className="inline-flex items-center gap-1"><Star size={13} className="fill-yellow-400 text-yellow-400"/>{rating}</span>
            <span className="inline-flex items-center gap-1"><Eye size={13}/>{views}</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-zinc-400"><Calendar size={12}/>{release}</div>
          <span className="mt-4 flex items-center justify-center gap-2 rounded-full bg-red-600 py-2.5 text-sm font-bold"><Play size={15} fill="currentColor"/> Watch Now</span>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="line-clamp-2 text-sm font-bold text-white transition group-hover:text-red-500">{item.title}</h3>
        <p className="mt-1 text-xs text-zinc-500">{release}</p>
      </div>
    </Link>
  );
}

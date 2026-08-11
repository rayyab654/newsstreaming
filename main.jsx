import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API = "https://streaming-rayliziie-official.rayyankrens0304.workers.dev";
const FALLBACK_POSTER = "https://placehold.co/600x900/15171f/e7e9ee?text=Rayliziie";

const icons = {
  search: "M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z",
  play: "M8 5v14l11-7-11-7Z",
  plus: "M12 5v14M5 12h14",
  check: "M5 12l4 4L19 6",
  heart: "M20.8 8.8c0 5.4-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z",
  star: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z",
  close: "M6 6l12 12M18 6 6 18",
  back: "M19 12H5M12 19l-7-7 7-7",
  menu: "M4 6h16M4 12h16M4 18h16",
  tv: "M7 4l5 5 5-5M4 9h16v11H4z",
  filter: "M4 6h16M7 12h10M10 18h4",
  volume: "M5 10v4h3l4 4V6L8 10H5ZM16 9.5a4 4 0 0 1 0 5M18.5 7a7.5 7.5 0 0 1 0 10",
  fullscreen: "M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5"
};

function Icon({ name, size = 20, className = "" }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={icons[name] || icons.tv} /></svg>;
}

const get = (o, keys, fallback = "") => {
  if (!o || typeof o !== "object") return fallback;
  for (const key of keys) {
    const v = o[key];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return fallback;
};

function titleOf(x) {
  return String(get(x, ["title","name","display_title","subjectName","subject_name","albumName","seriesName"], "Untitled"));
}
function posterOf(x) {
  return get(x, ["poster","cover","thumbnail","image","imageUrl","image_url","pic","coverUrl","cover_url"], FALLBACK_POSTER);
}
function bannerOf(x) {
  return get(x, ["banner","backdrop","background","backgroundImage","bannerUrl"], posterOf(x));
}
function descOf(x) {
  return get(x, ["description","synopsis","summary","desc","plot","story"], "Belum ada sinopsis.");
}
function idOf(x) {
  return get(x, ["id","subjectId","subject_id","series_id","seriesId","product_id","productId","albumId","content_id","contentId","slug","path","detailPath"], "");
}
function yearOf(x) {
  return get(x, ["year","releaseYear","release_year","releaseDate","release_date","publishedAt"], "");
}
function ratingOf(x) {
  const n = get(x, ["rating","score","vote_average","imdb"], "");
  return n === "" ? "" : String(n);
}
function genreOf(x) {
  const g = get(x, ["genre","genres","tags"], "");
  return Array.isArray(g) ? g.join(", ") : String(g || "");
}

function normalizeItem(item, provider, type) {
  return {
    ...item,
    provider: item.provider || provider,
    type: item.type || type,
    title: titleOf(item),
    poster: posterOf(item),
    banner: bannerOf(item),
    description: descOf(item),
    id: idOf(item),
    year: yearOf(item),
    rating: ratingOf(item),
    genre: genreOf(item),
    raw: item.raw || item
  };
}

function deepCollect(value, out = []) {
  if (Array.isArray(value)) {
    for (const x of value) {
      if (x && typeof x === "object" && (titleOf(x) !== "Untitled" || posterOf(x) !== FALLBACK_POSTER)) out.push(x);
      else deepCollect(x, out);
    }
  } else if (value && typeof value === "object") {
    for (const v of Object.values(value)) deepCollect(v, out);
  }
  return out;
}

function unique(items) {
  const seen = new Set();
  return items.filter(x => {
    const key = `${x.provider}|${String(x.id || x.title).toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function api(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

function providerType(provider) {
  if (provider === "anime") return "anime";
  if (provider === "drakor" || provider === "viu") return "drakor";
  return "film";
}

function Card({ item, onOpen, onFavorite, favorite }) {
  return (
    <article className="card" onClick={() => onOpen(item)}>
      <div className="poster-wrap">
        <img src={item.poster} alt={item.title} loading="lazy" onError={e => e.currentTarget.src = FALLBACK_POSTER} />
        <div className="poster-gradient" />
        {item.rating && <span className="rating"><Icon name="star" size={12} /> {item.rating}</span>}
        <button className={`fav-mini ${favorite ? "active" : ""}`} onClick={e => { e.stopPropagation(); onFavorite(item); }} aria-label="Favorite">
          <Icon name={favorite ? "check" : "plus"} size={16} />
        </button>
        <div className="hover-play"><span><Icon name="play" size={18} /></span></div>
      </div>
      <div className="card-meta">
        <h3>{item.title}</h3>
        <div><span>{item.year || "—"}</span><b>•</b><span>{item.type === "anime" ? "Anime" : item.type === "drakor" ? "Drakor" : "Film"}</span></div>
      </div>
    </article>
  );
}

function Row({ title, items, onOpen, onFavorite, favorites }) {
  if (!items?.length) return null;
  return (
    <section className="row-section">
      <div className="row-head"><h2>{title}</h2><span>{items.length} judul</span></div>
      <div className="card-row">
        {items.map((item, i) => <Card key={`${item.provider}-${item.id}-${i}`} item={item} onOpen={onOpen} onFavorite={onFavorite} favorite={favorites.has(`${item.provider}|${item.id}`)} />)}
      </div>
    </section>
  );
}

function App() {
  const [tab, setTab] = useState("home");
  const [catalog, setCatalog] = useState({ anime: [], film: [], drakor: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState(() => new Set(JSON.parse(localStorage.getItem("rayliziie:favorites") || "[]")));
  const [continueWatching, setContinueWatching] = useState(() => JSON.parse(localStorage.getItem("rayliziie:continue") || "[]"));
  const [player, setPlayer] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);

  const saveFavorites = next => {
    setFavorites(next);
    localStorage.setItem("rayliziie:favorites", JSON.stringify([...next]));
  };
  const toggleFavorite = item => {
    const key = `${item.provider}|${item.id}`;
    const next = new Set(favorites);
    next.has(key) ? next.delete(key) : next.add(key);
    saveFavorites(next);
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true); setError("");
      try {
        const [a, f, d] = await Promise.all([
          api("/anime?action=home&page=1"),
          api("/film?action=home"),
          api("/drakor?action=home")
        ]);
        if (!alive) return;
        const map = {
          anime: unique(deepCollect(a).map(x => normalizeItem(x, "anime", "anime"))).slice(0, 48),
          film: unique(deepCollect(f).map(x => normalizeItem(x, "film", "film"))).slice(0, 48),
          drakor: unique(deepCollect(d).map(x => normalizeItem(x, "drakor", "drakor"))).slice(0, 48)
        };
        setCatalog(map);
      } catch (e) {
        if (alive) setError("Sebagian katalog tidak dapat dimuat. Pastikan API Worker aktif.");
      } finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  const visible = tab === "home" ? [...catalog.anime, ...catalog.film, ...catalog.drakor] :
    tab === "anime" ? catalog.anime :
    tab === "film" ? catalog.film : tab === "drakor" ? catalog.drakor : continueWatching;

  const hero = useMemo(() => {
    const pool = catalog.anime.length ? catalog.anime : catalog.film;
    return pool[0] || null;
  }, [catalog]);

  async function openDetail(item) {
    setSelected(item); setDetail(null); setDetailLoading(true);
    try {
      const raw = item.raw || item;
      const params = new URLSearchParams({ provider: item.provider });
      const keys = ["path","slug","detailPath","detail_path","id","subjectId","subject_id","series_id","seriesId","product_id","productId","albumId","content_id","contentId","pathplay","se","season","lang","type"];
      for (const k of keys) {
        const v = raw[k] ?? item[k];
        if (v !== undefined && v !== null && v !== "") params.set(k, String(v));
      }
      const r = await api(`/detail?${params.toString()}`);
      setDetail(r?.data ?? r);
    } catch (e) {
      setDetail({ ...item.raw, title: item.title, description: item.description, episodes: [] });
    } finally { setDetailLoading(false); }
  }

  async function playItem(item, episode = {}) {
    try {
      const raw = item.raw || item;
      const params = new URLSearchParams({ provider: item.provider });
      const keys = ["episode_id","episodeId","episodeId","id","subjectId","subject_id","series_id","seriesId","product_id","productId","content_id","contentId","path","slug","detailPath","detail_path","pathplay","se","season","ep","episode","lang","type"];
      for (const k of keys) {
        const v = episode[k] ?? raw[k] ?? item[k];
        if (v !== undefined && v !== null && v !== "") params.set(k, String(v));
      }
      const r = await api(`/play?${params.toString()}`);
      const data = r?.data ?? r;
      const videoUrl = findVideoUrl(data);
      if (!videoUrl) throw new Error("URL video tidak ditemukan");
      const entry = { ...item, episode, videoUrl, progress: 0, updatedAt: Date.now() };
      setContinueWatching(prev => {
        const next = [entry, ...prev.filter(x => `${x.provider}|${x.id}` !== `${item.provider}|${item.id}`)].slice(0, 12);
        localStorage.setItem("rayliziie:continue", JSON.stringify(next));
        return next;
      });
      setPlayer({ item, episode, data, videoUrl });
    } catch (e) {
      setPlayer({ item, episode, error: "Server belum mengembalikan URL video untuk item ini." });
    }
  }

  function findVideoUrl(x) {
    if (!x) return "";
    if (typeof x === "string" && /^https?:\/\//.test(x)) return x;
    if (Array.isArray(x)) {
      for (const v of x) { const u = findVideoUrl(v); if (u) return u; }
      return "";
    }
    if (typeof x === "object") {
      const priority = ["url","videoUrl","video_url","streamUrl","stream_url","playUrl","play_url","m3u8","mp4","file","src","source","link"];
      for (const k of priority) {
        const v = x[k];
        if (typeof v === "string" && /^https?:\/\//.test(v)) return v;
      }
      for (const v of Object.values(x)) {
        const u = findVideoUrl(v); if (u) return u;
      }
    }
    return "";
  }

  async function search() {
    if (!query.trim()) return;
    setSearching(true); setTab("search");
    try {
      const r = await api(`/search?q=${encodeURIComponent(query.trim())}`);
      const items = (r?.data || []).map(x => normalizeItem(x, x.provider, x.type));
      setSearchResults(unique(items));
    } catch { setSearchResults([]); }
    finally { setSearching(false); }
  }

  const favoritesItems = useMemo(() => [...catalog.anime, ...catalog.film, ...catalog.drakor].filter(x => favorites.has(`${x.provider}|${x.id}`)), [catalog, favorites]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand" onClick={() => setTab("home")}>
          <span className="brand-mark">R</span><span>RAYLIZIIE <em>OFFICIAL</em></span>
        </div>
        <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)}><Icon name="menu" /></button>
        <nav className={mobileNav ? "open" : ""}>
          {[
            ["home","Home"],["anime","Anime"],["film","Films"],["drakor","Drakor"],["favorites","My List"]
          ].map(([id,label]) => <button key={id} className={tab===id ? "active":""} onClick={() => { setTab(id); setMobileNav(false); }}>{label}</button>)}
        </nav>
        <form className="searchbox" onSubmit={e => {e.preventDefault(); search();}}>
          <Icon name="search" size={19} />
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari anime, film, drakor..." />
        </form>
      </header>

      {tab === "home" && hero && (
        <section className="hero" style={{"--hero": `url("${hero.banner}")`}}>
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="eyebrow"><span>RAYLIZIIE ORIGINAL UI</span><b>4K</b><b>HD</b></div>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
            <div className="hero-info"><span>{hero.year || "2026"}</span><span>{hero.type === "anime" ? "Anime" : "Featured"}</span>{hero.rating && <span>★ {hero.rating}</span>}</div>
            <div className="hero-actions">
              <button className="primary" onClick={() => openDetail(hero)}><Icon name="play" size={19}/> Mulai Nonton</button>
              <button className="ghost" onClick={() => openDetail(hero)}>ⓘ Detail</button>
            </div>
          </div>
        </section>
      )}

      <main className={tab === "home" ? "content home-content" : "content"}>
        {error && <div className="notice">{error}</div>}
        {loading && <div className="loading-grid">{Array.from({length:12}).map((_,i)=><div className="skeleton" key={i}/>)}</div>}

        {!loading && tab === "home" && <>
          <Row title="Trending Anime" items={catalog.anime.slice(0, 12)} onOpen={openDetail} onFavorite={toggleFavorite} favorites={favorites}/>
          <Row title="Film Pilihan" items={catalog.film.slice(0, 12)} onOpen={openDetail} onFavorite={toggleFavorite} favorites={favorites}/>
          <Row title="Drakor Terbaru" items={catalog.drakor.slice(0, 12)} onOpen={openDetail} onFavorite={toggleFavorite} favorites={favorites}/>
          <Row title="Pilihan Untukmu" items={catalog.anime.slice(12,24)} onOpen={openDetail} onFavorite={toggleFavorite} favorites={favorites}/>
        </>}

        {!loading && tab !== "home" && tab !== "favorites" && tab !== "search" &&
          <><div className="page-title"><span>RAYLIZIIE</span><h1>{tab === "anime" ? "Anime" : tab === "film" ? "Films" : "Drakor"}</h1><p>Koleksi pilihan dari provider yang terhubung ke API Rayliziie Official.</p></div>
          <div className="grid">{visible.map((item,i)=><Card key={`${item.provider}-${item.id}-${i}`} item={item} onOpen={openDetail} onFavorite={toggleFavorite} favorite={favorites.has(`${item.provider}|${item.id}`)}/>)}</div></>}

        {tab === "favorites" && <><div className="page-title"><span>MY LIBRARY</span><h1>Daftar Saya</h1><p>Judul yang kamu simpan di perangkat ini.</p></div><div className="grid">{favoritesItems.length ? favoritesItems.map((item,i)=><Card key={i} item={item} onOpen={openDetail} onFavorite={toggleFavorite} favorite={true}/>) : <div className="empty">Belum ada judul. Tekan + pada poster untuk menyimpan.</div>}</div></>}

        {tab === "continue" && <><div className="page-title"><span>CONTINUE</span><h1>Lanjut Nonton</h1></div><div className="grid">{continueWatching.map((item,i)=><Card key={i} item={item} onOpen={openDetail} onFavorite={toggleFavorite} favorite={favorites.has(`${item.provider}|${item.id}`)}/>)}</div></>}

        {tab === "search" && <><div className="page-title"><span>SEARCH</span><h1>Hasil pencarian</h1><p>Menampilkan hasil untuk <strong>{query}</strong>.</p></div>{searching ? <div className="loading-grid">{Array.from({length:8}).map((_,i)=><div className="skeleton" key={i}/>)}</div> : searchResults.length ? <div className="grid">{searchResults.map((item,i)=><Card key={i} item={item} onOpen={openDetail} onFavorite={toggleFavorite} favorite={favorites.has(`${item.provider}|${item.id}`)}/>)}</div> : <div className="empty">Tidak ada hasil yang cocok.</div>}</>}
      </main>

      <footer><div className="footer-brand">RAYLIZIIE <span>OFFICIAL</span></div><p>Premium streaming interface for Anime, Films & Drakor.</p><small>© {new Date().getFullYear()} Rayliziie Official</small></footer>

      {selected && <DetailModal item={selected} detail={detail} loading={detailLoading} onClose={()=>{setSelected(null);setDetail(null)}} onPlay={playItem} onFavorite={toggleFavorite} favorite={favorites.has(`${selected.provider}|${selected.id}`)} />}
      {player && <PlayerModal player={player} onClose={()=>setPlayer(null)} />}
    </div>
  );
}

function DetailModal({ item, detail, loading, onClose, onPlay, onFavorite, favorite }) {
  const source = detail?.data || detail || {};
  const episodes = deepCollect(source).filter(x => {
    const t = titleOf(x).toLowerCase();
    return /episode|ep\\.?\\s*\\d+/.test(t) || x.episode || x.ep || x.episodeNumber || x.episode_id;
  }).slice(0, 100);
  const fallbackEpisodes = Array.isArray(source.episodes) ? source.episodes : Array.isArray(source.episodeList) ? source.episodeList : [];
  const eps = fallbackEpisodes.length ? fallbackEpisodes : episodes;
  return <div className="modal-backdrop" onClick={onClose}>
    <div className="detail-modal" onClick={e=>e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}><Icon name="close"/></button>
      <div className="detail-cover" style={{"--cover":`url("${bannerOf(source) || item.banner}")`}}>
        <div className="detail-cover-shade"/>
        <div className="detail-head">
          <img src={posterOf(item)} alt="" />
          <div><div className="eyebrow"><span>{item.provider?.toUpperCase()}</span>{item.rating && <b>★ {item.rating}</b>}</div><h2>{titleOf(source) !== "Untitled" ? titleOf(source) : item.title}</h2><div className="hero-info"><span>{yearOf(source) || item.year || "—"}</span><span>{item.type}</span><span>{genreOf(source) || item.genre || "Premium catalog"}</span></div></div>
        </div>
      </div>
      <div className="detail-body">
        <p className="synopsis">{descOf(source) || item.description}</p>
        <div className="detail-actions"><button className="primary" onClick={()=>onPlay(item, eps[0] || source)}><Icon name="play" size={18}/> Play</button><button className="ghost" onClick={()=>onFavorite(item)}><Icon name={favorite ? "check" : "plus"} size={18}/> {favorite ? "Tersimpan" : "My List"}</button></div>
        {loading ? <div className="detail-loading">Memuat detail & episode...</div> :
          <div className="episode-box"><div className="episode-head"><h3>Episodes</h3><span>{eps.length || "—"}</span></div>{eps.length ? <div className="episode-list">{eps.map((ep,i)=><button key={i} onClick={()=>onPlay(item,ep)}><span>{get(ep,["episode","ep","episodeNumber","number"],i+1)}</span><b>{titleOf(ep) !== "Untitled" ? titleOf(ep) : `Episode ${i+1}`}</b><Icon name="play" size={15}/></button>)}</div> : <div className="empty small">Episode akan tampil jika provider mengirimkan daftar episode.</div>}</div>}
      </div>
    </div>
  </div>
}

function PlayerModal({ player, onClose }) {
  return <div className="modal-backdrop player-bg" onClick={onClose}>
    <div className="player-modal" onClick={e=>e.stopPropagation()}>
      <div className="player-top"><div><span>NOW PLAYING</span><h3>{player.item.title}</h3></div><button onClick={onClose}><Icon name="close"/></button></div>
      {player.error ? <div className="player-error"><Icon name="tv" size={40}/><h3>Video belum tersedia</h3><p>{player.error}</p></div> :
        <div className="video-shell">
          <video src={player.videoUrl} controls autoPlay playsInline poster={player.item.poster}/>
          <div className="video-note">Jika sumber video menolak embedding, buka URL sumber di tab baru.</div>
        </div>}
    </div>
  </div>
}

createRoot(document.getElementById("root")).render(<App />);

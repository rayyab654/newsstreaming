import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search, UserCircle, Play } from "lucide-react";

const menus = [
  {name:"Home",path:"/"},
  {name:"Anime",path:"/anime"},
  {name:"Films",path:"/film"},
  {name:"Drakor",path:"/drakor"},
  {name:"Genre",path:"/genre"},
  {name:"My List",path:"/favorite"},
];

export default function Navbar(){
  const [open,setOpen]=useState(false);
  const [scroll,setScroll]=useState(false);
  const [q,setQ]=useState("");
  const navigate=useNavigate();

  useEffect(()=>{const fn=()=>setScroll(window.scrollY>20);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn)},[]);

  function submit(e){e.preventDefault();if(q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)}
  return <header className={`fixed left-0 top-0 z-50 w-full transition-all ${scroll?"bg-black/90 backdrop-blur-xl shadow-lg":"bg-gradient-to-b from-black/80 to-transparent"}`}>
    <div className="container-app flex h-20 items-center justify-between gap-5">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20"><Play size={20} fill="currentColor"/></div>
        <div><h1 className="text-sm font-black tracking-[.12em]">RAYLIZIIE</h1><p className="text-[9px] font-bold tracking-[.2em] text-zinc-500">OFFICIAL</p></div>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex">{menus.map(m=><NavLink key={m.path} to={m.path} className={({isActive})=>isActive?"font-semibold text-white":"text-zinc-400 transition hover:text-white"}>{m.name}</NavLink>)}</nav>
      <div className="hidden items-center gap-4 lg:flex">
        <form onSubmit={submit} className="flex w-64 items-center gap-2 rounded-xl border border-white/10 bg-white/[.05] px-3 py-2"><Search size={17} className="text-zinc-500"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari anime, film, drakor..." className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none"/></form>
        <Link to="/history" className="text-zinc-400 hover:text-white" title="History"><UserCircle size={24}/></Link>
      </div>
      <button className="lg:hidden" onClick={()=>setOpen(!open)}>{open?<X size={28}/>:<Menu size={28}/>}</button>
    </div>
    {open && <div className="border-t border-white/10 bg-black lg:hidden"><div className="container-app flex flex-col p-5">{menus.map(m=><NavLink key={m.path} to={m.path} onClick={()=>setOpen(false)} className="border-b border-white/5 py-4 text-zinc-300">{m.name}</NavLink>)}</div></div>}
  </header>
}

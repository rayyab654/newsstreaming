import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSlider({ items = [] }) {
  const slides = items.length ? items : [{
    title: "Rayliziie Official",
    cover_url: "https://placehold.co/1600x900/111111/ffffff?text=Rayliziie+Official",
    genre: ["Anime", "Films", "Drakor"],
    path: "",
    type: "anime",
    raw: {},
  }];

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={slides.length > 1}
      className="w-full"
    >
      {slides.map((item, index) => (
        <SwiperSlide key={`${item.path || item.id || "hero"}-${index}`}>
          <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
            <img src={item.cover_url || "https://placehold.co/1600x900/111111/ffffff?text=Rayliziie"} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.95)_0%,rgba(0,0,0,.65)_38%,rgba(0,0,0,.08)_80%),linear-gradient(0deg,#070707_0%,transparent_48%)]" />
            <div className="relative z-10 flex h-full items-end pb-24">
              <div className="container-app max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[.25em] text-red-500">Rayliziie Official</span>
                <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="mt-4 text-5xl font-black leading-none tracking-tight text-white md:text-7xl">
                  {item.title}
                </motion.h1>
                <p className="mt-6 line-clamp-3 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
                  {item.deskripsi || item.description || "Streaming Anime, Films, dan Drakor dalam satu platform premium."}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(item.genre || []).slice(0, 4).map(g => <span key={g} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-zinc-200">{g}</span>)}
                </div>
                <div className="mt-8 flex gap-3">
                  {item.path ? <Link to={`/detail/${item.type}/${encodeURIComponent(item.path)}`} className="btn-primary inline-flex items-center gap-2"><Play size={17} fill="currentColor"/> Watch Now</Link> : null}
                  {item.path ? <Link to={`/detail/${item.type}/${encodeURIComponent(item.path)}`} className="btn-outline inline-flex items-center gap-2"><Info size={17}/> More Info</Link> : null}
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import MovieCard from "../cards/MovieCard";
import "swiper/css";
import "swiper/css/navigation";

export default function MovieCarousel({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto mt-12 max-w-[1440px] px-[2.5%]">
      <div className="mb-5 flex items-end justify-between">
        <div><span className="text-[10px] font-black uppercase tracking-[.22em] text-red-500">Rayliziie</span><h2 className="mt-1 text-2xl font-black text-white md:text-3xl">{title}</h2></div>
        <span className="text-xs text-zinc-500">{items.length} titles</span>
      </div>
      <Swiper modules={[Navigation, Mousewheel]} navigation mousewheel={{forceToAxis:true}} spaceBetween={14} breakpoints={{0:{slidesPerView:2},480:{slidesPerView:3},768:{slidesPerView:4},1024:{slidesPerView:5},1400:{slidesPerView:6}}}>
        {items.map((item, i) => <SwiperSlide key={`${item.type}-${item.id}-${i}`}><MovieCard item={item}/></SwiperSlide>)}
      </Swiper>
    </section>
  );
}

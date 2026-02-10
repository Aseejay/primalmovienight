import React, { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  { id: "EVGwxjRsXVw", title: "Epic Adventure", genre: "Action" },
  { id: "6YkS-Pd4ZQs", title: "Love Stories", genre: "Romance" },
  { id: "tY1e4vk2SGc", title: "Comedy Gold", genre: "Comedy" },
  { id: "mdAhwxUt5SY", title: "Thriller Night", genre: "Thriller" },
  { id: "yLGlclnGJBo", title: "Drama Series", genre: "Drama" },
];

const HeroCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoPlayRef = useRef<any | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % videos.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  // Scroll listener to update active dot
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const newIndex = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIndex(newIndex);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync scroll position with active index
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: activeIndex * containerRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [activeIndex]);

  const scrollToIndex = (idx: number) => {
    setActiveIndex(idx);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div
      className="relative w-full flex flex-col items-center overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Main carousel container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="w-full flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[350px] md:w-[500px] snap-center relative group px-2 md:px-4"
            >
              {/* Video card */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
                {/* Thumbnail with gradient overlay */}
                <div className="relative">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-[200px] md:h-[281px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content overlay - Always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white">
                  {/* Title - Always visible */}
                  <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {video.title}
                  </h2>

                  {/* Watch button - Always visible */}
                </div>

                {/* Play icon overlay - Always visible */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-4 transform transition-transform duration-500 group-hover:scale-110">
                    <Play className="w-6 h-6 md:w-10 md:h-10 text-white fill-current" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced dot navigation */}
        <div className="flex justify-center items-center space-x-3 mt-8">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`relative transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-white w-8 h-2 shadow-lg shadow-white/30"
                  : "bg-white/30 hover:bg-white/50 w-2 h-2 hover:scale-125"
              } rounded-full`}
            >
              {/* Active indicator glow */}
              {idx === activeIndex && (
                <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-linear"
              style={{
                width: isAutoPlaying ? "100%" : "0%",
                animation: isAutoPlaying
                  ? "progress 5s linear infinite"
                  : "none",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* CSS for progress animation */}
      <style>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .scroll-smooth::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;

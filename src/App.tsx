const movies = [
  {
    title: "Mike and Dave",
    meta: "Comedy",
    time: "9:00 PM – 10:50 PM",
    duration: "110 min",
    rating: "9.6",
    poster:
      "https://image.tmdb.org/t/p/original/2qVWrNSaIq1eYODj1St6lsgaoQS.jpg",
  },
  {
    title: "Without Remorse",
    meta: "Romance • Drama",
    time: "11:00 PM – 12:50 AM",
    duration: "112 min",
    rating: "8.9",
    poster:
      "https://image.tmdb.org/t/p/original/6GCOpT8QcNzup09TAMmvvk22LTR.jpg",
  },
  {
    title: "Marked Men",
    meta: "Action",
    time: "1:00 AM – 2:50 AM",
    duration: "118 min",
    rating: "9.4",
    poster:
      "https://image.tmdb.org/t/p/original/hGPiYGCQ6IQHPSsp08jY4gCIRxL.jpg",
  },
  {
    title: "Evil Dead Rise",
    meta: "Horror",
    time: "3:00 AM – 4:00 AM",
    duration: "108 min",
    rating: "9.5",
    poster:
      "https://image.tmdb.org/t/p/original/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto px-5 py-12">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
              Feb 13
            </span>
          </div>
          <h1 className="text-[32px] leading-[1.1] font-medium tracking-tight mb-2">
            Valentine Movie Night
          </h1>
          <p className="text-[15px] text-white/50 leading-relaxed">
            Four films back to back
          </p>
        </header>

        {/* Movies */}
        <div className="space-y-12">
          {movies.map((movie, index) => (
            <article key={index} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-5 bg-white/5">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                {/* Minimal rating badge */}
                <div className="absolute top-4 right-4 h-9 px-3 rounded-full bg-black/60 backdrop-blur-xl flex items-center gap-1.5">
                  <span className="text-[13px] font-medium">★</span>
                  <span className="text-[13px] font-medium">
                    {movie.rating}
                  </span>
                </div>

                {/* Number indicator */}
                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10">
                  <span className="text-[13px] font-semibold">{index + 1}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-[22px] font-medium tracking-tight mb-1.5 leading-tight">
                    {movie.title}
                  </h2>
                  <div className="flex items-center gap-2 text-[13px] text-white/40">
                    <span>{movie.meta}</span>
                    <span>·</span>
                    <span>{movie.duration}</span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] text-white/40">Showtime</span>
                  <span className="text-[15px] font-medium">{movie.time}</span>
                </div>

                {/* Button */}
                <button className="w-full h-12 rounded-xl bg-white text-black text-[14px] font-medium tracking-wide hover:bg-white/90 active:scale-[0.98] transition-all">
                  Buy Ticket
                </button>
              </div>

              {/* Divider */}
              {index < movies.length - 1 && (
                <div className="mt-12 h-px bg-white/5" />
              )}
            </article>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5">
          <p className="text-[12px] text-white/30 text-center leading-relaxed">
            Limited capacity · Doors open 30 min early
          </p>
        </footer>
      </div>
    </div>
  );
}

const movies = [
  {
    title: "Mike and Dave",
    meta: "Comedy",
    time: "9:00 PM – 10:50 PM",
    duration: "110 min",
    rating: "9.6",
    poster:
      "https://image.tmdb.org/t/p/original/2qVWrNSaIq1eYODj1St6lsgaoQS.jpg",
    singleTicketLink: "https://example.com/single-ticket-mike-dave",
    doubleTicketLink: "https://example.com/double-ticket-mike-dave",
  },
  {
    title: "Without Remorse",
    meta: "Romance • Drama",
    time: "11:00 PM – 12:50 AM",
    duration: "112 min",
    rating: "8.9",
    poster:
      "https://image.tmdb.org/t/p/original/6GCOpT8QcNzup09TAMmvvk22LTR.jpg",
    singleTicketLink: "https://example.com/single-ticket-without-remorse",
    doubleTicketLink: "https://example.com/double-ticket-without-remorse",
  },
  {
    title: "Marked Men",
    meta: "Action",
    time: "1:00 AM – 2:50 AM",
    duration: "118 min",
    rating: "9.4",
    poster:
      "https://image.tmdb.org/t/p/original/hGPiYGCQ6IQHPSsp08jY4gCIRxL.jpg",
    singleTicketLink: "https://example.com/single-ticket-marked-men",
    doubleTicketLink: "https://example.com/double-ticket-marked-men",
  },
  {
    title: "Evil Dead Rise",
    meta: "Horror",
    time: "3:00 AM – 4:00 AM",
    duration: "108 min",
    rating: "9.5",
    poster:
      "https://image.tmdb.org/t/p/original/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
    singleTicketLink: "https://example.com/single-ticket-evil-dead",
    doubleTicketLink: "https://example.com/double-ticket-evil-dead",
  },
];

export default function Home() {
  const handleTicketClick = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/35 font-light">
              Feb 13, 2025
            </span>
          </div>
          <h1 className="text-[38px] font-light tracking-[-0.02em] text-white mb-3 leading-[1.05]">
            Valentine Movie Night
          </h1>
          <p className="text-white/45 text-[14px] font-light tracking-wide">
            Four films · One unforgettable evening
          </p>
        </header>

        {/* Movies Grid */}
        <div className="space-y-16">
          {movies.map((movie, index) => (
            <article key={index} className="group">
              {/* Poster */}
              <div className="relative mb-6">
                <div className="aspect-[2/3] rounded-3xl overflow-hidden bg-zinc-900 ring-1 ring-white/5">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute top-5 right-5 flex flex-col gap-2">
                  {/* Rating */}
                  <div className="h-11 px-4 rounded-2xl bg-black/70 backdrop-blur-2xl flex items-center gap-2 ring-1 ring-white/10">
                    <svg
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-[14px] font-medium tracking-tight">
                      {movie.rating}
                    </span>
                  </div>
                </div>

                {/* Screen number */}
                <div className="absolute bottom-5 left-5">
                  <div className="w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center ring-1 ring-black/5">
                    <span className="text-black text-[15px] font-semibold">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="px-1">
                <h2 className="text-white text-[26px] font-normal tracking-[-0.01em] mb-2 leading-tight">
                  {movie.title}
                </h2>

                {/* Meta row */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-white/40 text-[13px] font-light">
                    {movie.meta}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/40 text-[13px] font-light">
                    {movie.duration}
                  </span>
                </div>

                {/* Showtime */}
                <div className="mb-6 py-4 px-5 rounded-2xl bg-white/[0.03] ring-1 ring-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-white/35 uppercase tracking-wider mb-0.5">
                          Showtime
                        </p>
                        <p className="text-white text-[15px] font-medium tracking-tight">
                          {movie.time}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20">
                      <span className="text-emerald-400 text-[11px] font-medium uppercase tracking-wider">
                        Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dual Ticket Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleTicketClick(movie.singleTicketLink)}
                    className="flex-1 h-14 rounded-2xl bg-white text-black text-[14px] font-medium tracking-tight hover:bg-white/95 active:scale-[0.985] transition-all duration-200 shadow-lg shadow-white/5 flex items-center justify-center gap-2"
                  >
                    <span>Single Ticket</span>
                  </button>
                  <button
                    onClick={() => handleTicketClick(movie.doubleTicketLink)}
                    className="flex-1 h-14 rounded-2xl bg-white text-black text-[14px] font-medium tracking-tight hover:bg-white/95 active:scale-[0.985] transition-all duration-200 shadow-lg shadow-white/5 flex items-center justify-center gap-2"
                  >
                    <span>Double Ticket</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer info */}
        <footer className="mt-20 pt-10 border-t border-white/5">
          <div className="flex items-center justify-center gap-6 text-white/25 text-[11px] uppercase tracking-widest">
            <span>Limited Seating</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span>Doors 8:30 PM</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

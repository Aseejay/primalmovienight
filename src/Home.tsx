/* ============================================================
   HOME.TSX – NOLLYWOOD CENTRAL STYLE (CLEAN + LIGHT MODE)
   ------------------------------------------------------------
   ✅ Hero image affects Header + Categories
   ✅ Header BLURS on scroll
   ✅ "For Samuel" + right icons (FIXED)
   ✅ Shows / Movies / Categories pills (SCROLL)
   ✅ Hero rotates between 3 items
   ✅ Smooth cinematic fade
   ✅ Play + My List buttons
   ✅ Nollywood Shorts row
   ✅ Floating Dock Bottom Nav
   ✅ CENTER DOCK BUTTON OPENS FULL TIKTOK-LIKE SHORTS FEED
   ✅ Shorts feed can be closed back to Home (NO BLANK SCREEN)
   ✅ NO DESIGN CHANGES (same pattern + same vibe)
   ============================================================ */

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DownloadSimple,
  MagnifyingGlass,
  Play,
  Pause,
  SpeakerSlash,
  SpeakerHigh,
  Plus,
  House,
  FilmSlate,
  TelevisionSimple,
  UsersThree,
  ArrowRight,
  Video,
  CaretDown,
  X,
  Heart,
  ChatCircleDots,
  ShareNetwork,
  BookmarkSimple,
} from "@phosphor-icons/react";

/* ================= TYPES ================= */
type Item = {
  id: string;
  title: string;
  meta: string;
  youtubeId: string;
};

type Short = {
  id: string;
  title: string;
  movieTitle: string;
  youtubeId: string;
};

/* ================= CONSTANTS ================= */
const HERO_DURATION = 30;

/* ================= HERO DATA ================= */
const HEROES: Item[] = [
  {
    id: "h1",
    title: "No Vacancy",
    meta: "2h 23mins • 2025",
    youtubeId: "n0MFXx8y3zo",
  },
  {
    id: "h2",
    title: "Mental Home",
    meta: "1h 54mins • 2024",
    youtubeId: "bOiWOE2dGKA",
  },
  {
    id: "h3",
    title: "Ring Of Trust",
    meta: "2h 10mins • 2025",
    youtubeId: "ogKsuxOn6DA",
  },
];

const HERO_VIDEO =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";

/* ================= DATA ================= */
const TRENDING: Item[] = [
  {
    id: "t1",
    title: "Where Love Lives",
    meta: "Romance • Drama",
    youtubeId: "we7pr8gDCn8",
  },
  { id: "t2", title: "Love Again", meta: "Romance", youtubeId: "AJDN7Ao6UN8" },
  { id: "t3", title: "Midnight", meta: "Thriller", youtubeId: "RjE_tQIS_8U" },
  { id: "t4", title: "The Chase", meta: "Action", youtubeId: "XIwVeuU9UEg" },
];

const NEW_RELEASES: Item[] = [
  {
    id: "n1",
    title: "Broken Vows",
    meta: "Romance • New",
    youtubeId: "JwfQxQ-Lz88",
  },
  {
    id: "n2",
    title: "Last Promise",
    meta: "Drama • New",
    youtubeId: "UdvAoFaRWhQ",
  },
  {
    id: "n3",
    title: "Midnight Call",
    meta: "Thriller • New",
    youtubeId: "UXQ09ZZqceA",
  },
  {
    id: "n4",
    title: "The Chase II",
    meta: "Action • New",
    youtubeId: "veM7Q5dYRHk",
  },
];

const SHORTS_ROW: Item[] = [
  {
    id: "s1",
    title: "Crazy Plot Twist",
    meta: "Short",
    youtubeId: "rPigpPryn3g",
  },
  {
    id: "s2",
    title: "This Scene Went Viral",
    meta: "Short",
    youtubeId: "FwRKimvLQGs",
  },
  {
    id: "s3",
    title: "One Minute Madness",
    meta: "Short",
    youtubeId: "S7BAmITwQAw",
  },
  {
    id: "s4",
    title: "She Didn’t Expect This",
    meta: "Short",
    youtubeId: "OP5wL2TI4ts",
  },
  { id: "s5", title: "Best Moment", meta: "Short", youtubeId: "CevxZvSJLk8" },
];

/* FULLSCREEN TIKTOK-LIKE SHORTS FEED DATA */
const SHORTS_FEED: Short[] = [
  {
    id: "sf1",
    title: "She Didn’t Expect This",
    movieTitle: "Still Yours",
    youtubeId: "OP5wL2TI4ts",
  },
  {
    id: "sf2",
    title: "This Scene Went Viral",
    movieTitle: "The Boy Before Me",
    youtubeId: "FwRKimvLQGs",
  },
  {
    id: "sf3",
    title: "Crazy Plot Twist",
    movieTitle: "Ring Of Trust",
    youtubeId: "rPigpPryn3g",
  },
  {
    id: "sf4",
    title: "One Minute Madness",
    movieTitle: "Broken Vows",
    youtubeId: "S7BAmITwQAw",
  },
];

/* ================= HELPERS ================= */
const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hq720.jpg`;

/* ============================================================
   MAIN HOME
   ============================================================ */
export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const shortsRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);

  const [heroIndex, setHeroIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "Home" | "Discover" | "Shorts" | "Channels" | "Actors"
  >("Home");

  const [contentType, setContentType] = useState<
    "Shows" | "Movies" | "Categories"
  >("Movies");
  const [scrolled, setScrolled] = useState(false);

  /* IMPORTANT: Shorts must be FALSE by default (fixes blank screen) */
  const [showShorts, setShowShorts] = useState(false);

  const hero = HEROES[heroIndex];
  const heroThumb = useMemo(() => ytThumb(hero.youtubeId), [hero]);

  /* ===== HERO ROTATION ===== */
  useEffect(() => {
    if (showShorts) return; // no hero rotation while Shorts feed is open (keeps UI stable)
    const rotate = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setHeroIndex((i) => (i + 1) % HEROES.length);
        setFade(true);
      }, 700);
    }, HERO_DURATION * 1000);

    return () => clearInterval(rotate);
  }, [showShorts]);

  /* ===== SCROLL BLUR ===== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const togglePlay = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = true;
      await videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) =>
    ref.current?.scrollBy({ left: 280, behavior: "smooth" });

  /* ============ SHORTS OPEN/CLOSE ============ */
  const openShorts = () => {
    setShowShorts(true);
    setActiveTab("Shorts");
    // prevent background scroll under the feed
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const closeShorts = () => {
    setShowShorts(false);
    setActiveTab("Home");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  /* ============================================================
     IF SHORTS OPEN: show ShortsFeed (Home is hidden)
     ============================================================ */
  if (showShorts) {
    return (
      <ShortsFeed
        heroThumb={heroThumb}
        fade={fade}
        scrolled={scrolled}
        activeTab={activeTab}
        onSetTab={setActiveTab}
        onClose={closeShorts}
        shorts={SHORTS_FEED}
        onWatchMovie={(s) => {
          // replace with your navigation / modal later
          console.log("Watch movie:", s.movieTitle);
        }}
        onOpenShorts={() => {}}
      />
    );
  }

  /* ============================================================
     HOME UI
     ============================================================ */
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}

        /* smoother mobile momentum */
        .snap-y-mandatory { scroll-snap-type: y mandatory; }
        .snap-start { scroll-snap-align: start; }

        /* iOS safe viewport helpers */
        .h-svh { height: 100svh; }
        .min-h-svh { min-height: 100svh; }
      `}</style>

      {/* ===== SHARED HERO BACKGROUND (affects header + pills too) ===== */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroThumb}
          className={`absolute inset-0 h-[100svh] w-full object-cover scale-[2.6] blur-[90px]
          transition-opacity duration-[1200ms]
          ${fade ? "opacity-70" : "opacity-0"}`}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-[#0a0a0a]" />
      </div>

      {/* ===== FIXED HEADER (BLURS ON SCROLL) ===== */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${scrolled ? "backdrop-blur-xl bg-black/40" : "bg-transparent"}`}
      >
        <div className="mx-auto max-w-[430px] px-5 pt-6 pb-4 flex justify-between items-center">
          <div className="text-[24px] font-semibold">For Samuel</div>
          <div className="flex gap-4">
            <IconBtn>
              <DownloadSimple size={25} />
            </IconBtn>
            <IconBtn>
              <MagnifyingGlass size={25} />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto max-w-[430px] pt-[80px] pb-40">
        {/* ===== SCROLLING PILLS (NOT FIXED) ===== */}
        <div className="px-5 mt-2 flex gap-3">
          <Pill
            active={contentType === "Shows"}
            onClick={() => setContentType("Shows")}
          >
            Shows
          </Pill>
          <Pill
            active={contentType === "Movies"}
            onClick={() => setContentType("Movies")}
          >
            Movies
          </Pill>
          <Pill
            active={contentType === "Categories"}
            onClick={() => setContentType("Categories")}
          >
            Categories <CaretDown size={14} />
          </Pill>
        </div>

        {/* ===== HERO CARD ===== */}
        <div className="relative px-4 mt-6">
          <div className="rounded-[22px] overflow-hidden bg-black/40 border border-white/10">
            <div className="relative aspect-[12/9]">
              {!isPlaying && (
                <img
                  src={heroThumb}
                  className="absolute inset-0 h-full w-full object-cover"
                  alt=""
                />
              )}

              <video
                ref={videoRef}
                src={HERO_VIDEO}
                playsInline
                loop
                muted
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  isPlaying ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

              <div className="absolute bottom-3 left-3 flex gap-3">
                <CircleBtn onClick={togglePlay}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </CircleBtn>

                {isPlaying && (
                  <CircleBtn onClick={toggleMute}>
                    {muted ? (
                      <SpeakerSlash size={20} />
                    ) : (
                      <SpeakerHigh size={20} />
                    )}
                  </CircleBtn>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 px-1">
            <div className="text-[27px] font-semibold">{hero.title}</div>
            <div className="text-sm opacity-70">{hero.meta}</div>

            <div className="mt-5 flex gap-4">
              <PrimaryBtn onClick={togglePlay}>
                <Play size={22} weight="fill" /> Play
              </PrimaryBtn>

              <SecondaryBtn>
                <Plus size={18} /> My List
              </SecondaryBtn>
            </div>
          </div>
        </div>

        {/* ===== SECTIONS ===== */}
        <Section title="Nollywood Shorts" />
        <ScrollRow refEl={shortsRef}>
          {SHORTS_ROW.map((i) => (
            <ShortCard key={i.id} item={i} />
          ))}
        </ScrollRow>
        <Section
          title="Trending now"
          onSeeAll={() => scrollRight(trendingRef)}
        />
        <ScrollRow refEl={trendingRef}>
          {TRENDING.map((i) => (
            <PosterCard key={i.id} item={i} />
          ))}
        </ScrollRow>

        <Section title="New Releases" onSeeAll={() => scrollRight(newRef)} />
        <ScrollRow refEl={newRef}>
          {NEW_RELEASES.map((i) => (
            <PosterCard key={i.id} item={i} badge="NEW" />
          ))}
        </ScrollRow>

        <Section
          title="Top Nollywood Movies"
          onSeeAll={() => scrollRight(newRef)}
        />
        <ScrollRow refEl={newRef}>
          {NEW_RELEASES.map((i) => (
            <PosterCard key={i.id} item={i} badge="NEW" />
          ))}
        </ScrollRow>

        <Section title="Nollywood Epic" onSeeAll={() => scrollRight(newRef)} />
        <ScrollRow refEl={newRef}>
          {NEW_RELEASES.map((i) => (
            <PosterCard key={i.id} item={i} badge="NEW" />
          ))}
        </ScrollRow>

        <Section
          title="Nollywood Yoruba "
          onSeeAll={() => scrollRight(newRef)}
        />
        <ScrollRow refEl={newRef}>
          {NEW_RELEASES.map((i) => (
            <PosterCard key={i.id} item={i} badge="NEW" />
          ))}
        </ScrollRow>

        <Section title="New Releases" onSeeAll={() => scrollRight(newRef)} />
        <ScrollRow refEl={newRef}>
          {NEW_RELEASES.map((i) => (
            <PosterCard key={i.id} item={i} badge="NEW" />
          ))}
        </ScrollRow>
      </div>

      {/* ===== FLOATING DOCK (BOTTOM NAV) ===== */}
      <BottomDock
        activeTab={activeTab}
        onSetTab={(t) => {
          if (t === "Shorts") openShorts();
          else setActiveTab(t);
        }}
        onOpenShorts={openShorts}
      />
    </div>
  );
}

/* ============================================================
   SHORTS FEED (FULLSCREEN TIKTOK-LIKE)
   - SAME DESIGN PATTERN
   - FULL SCREEN VERTICAL SNAP
   - WATCH MOVIE BUTTON PRESENT
   - CLOSE BACK TO HOME
   - BOTTOM DOCK INCLUDED
   ============================================================ */
function ShortsFeed({
  heroThumb,
  fade,
  scrolled,
  activeTab,
  onSetTab,
  onClose,
  shorts,
  onWatchMovie,
  onOpenShorts,
}: {
  heroThumb: string;
  fade: boolean;
  scrolled: boolean;
  activeTab: "Home" | "Discover" | "Shorts" | "Channels" | "Actors";
  onSetTab: (t: "Home" | "Discover" | "Shorts" | "Channels" | "Actors") => void;
  onClose: () => void;
  shorts: Short[];
  onWatchMovie?: (short: Short) => void;
  onOpenShorts: () => void;
}) {
  const feedRef = useRef<HTMLDivElement | null>(null);

  // (optional) keep current index in case you want analytics later
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;

    const onScroll = () => {
      const h = el.clientHeight || 1;
      const i = Math.round(el.scrollTop / h);
      setIndex(i);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-svh bg-[#0a0a0a] text-white overflow-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* ===== BACKGROUND (same hero effect) ===== */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroThumb}
          className={`absolute inset-0 h-full w-full object-cover scale-[2.6] blur-[90px]
          transition-opacity duration-[1200ms]
          ${fade ? "opacity-70" : "opacity-0"}`}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/75 to-[#0a0a0a]" />
      </div>

      {/* ===== FIXED HEADER (BLURS ON SCROLL) ===== */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? "backdrop-blur-xl bg-black/40" : "bg-transparent"}`}
      >
        <div className="mx-auto max-w-[430px] px-5 pt-6 pb-4 flex justify-between items-center">
          <div className="text-[24px] font-semibold">For Samuel</div>
          <div className="flex gap-3 items-center">
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-white/10 transition"
              aria-label="Close Shorts"
            >
              <X size={22} />
            </button>
            <IconBtn>
              <MagnifyingGlass size={22} />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* ===== FEED ===== */}
      <div className="relative z-10 mx-auto max-w-[430px] pt-[80px] pb-28">
        <div
          ref={feedRef}
          className="
            h-[calc(100svh-160px)]
            overflow-y-auto
            scrollbar-hide
            snap-y snap-mandatory
            px-4
          "
        >
          {shorts.map((s) => (
            <ShortSlide
              key={s.id}
              short={s}
              onWatch={() => onWatchMovie?.(s)}
            />
          ))}
        </div>

        {/* subtle index indicator (tiny, clean) */}
        <div className="mt-3 px-6 flex justify-between items-center opacity-70">
          <span className="text-xs">Shorts</span>
          <span className="text-xs">
            {Math.min(index + 1, shorts.length)} / {shorts.length}
          </span>
        </div>
      </div>

      {/* ===== BOTTOM DOCK INCLUDED ===== */}
      <BottomDock
        activeTab={activeTab}
        onSetTab={(t) => {
          if (t === "Home") onClose();
          else onSetTab(t);
        }}
        onOpenShorts={onOpenShorts}
      />
    </div>
  );
}

/* ============================================================
   SHORT SLIDE (ONE FULLSCREEN PAGE)
   ============================================================ */
function ShortSlide({
  short,
  onWatch,
}: {
  short: Short;
  onWatch?: () => void;
}) {
  return (
    <div className="snap-start h-[calc(100svh-160px)] pb-4">
      <div className="relative h-full rounded-[26px] overflow-hidden bg-black/40 border border-white/10">
        {/* Background poster */}
        <img
          src={ytThumb(short.youtubeId)}
          alt={short.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

        {/* Center play hint (keeps your pattern) */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-14 w-14 rounded-full bg-black/60 border border-white/20 grid place-items-center">
            <Play size={26} weight="fill" />
          </div>
        </div>

        {/* Right actions (tiktok vibe but clean) */}
        <div className="absolute right-4 bottom-28 flex flex-col gap-4">
          <SideAction icon={<Heart size={20} weight="fill" />} label="Like" />
          <SideAction icon={<ChatCircleDots size={20} />} label="Comment" />
          <SideAction icon={<BookmarkSimple size={20} />} label="Save" />
          <SideAction icon={<ShareNetwork size={20} />} label="Share" />
        </div>

        {/* Bottom info + CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="text-sm font-semibold leading-tight">
            {short.title}
          </div>
          <div className="mt-1 text-[11px] opacity-70">
            From <span className="font-medium">{short.movieTitle}</span>
          </div>

          <button
            onClick={onWatch}
            className="
              mt-4
              w-full
              py-3
              rounded-full
              bg-white
              text-black
              text-xs
              font-semibold
              transition
              active:scale-[0.98]
            "
          >
            Watch Movie
          </button>

          <div className="mt-3 text-[11px] opacity-60">Swipe up for next</div>
        </div>
      </div>
    </div>
  );
}

function SideAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 opacity-90 hover:opacity-100 transition">
      <div className="h-11 w-11 rounded-full bg-black/60 border border-white/15 grid place-items-center">
        {icon}
      </div>
      <span className="text-[10px]">{label}</span>
    </button>
  );
}

/* ============================================================
   BOTTOM DOCK (REUSED FOR HOME + SHORTS)
   ============================================================ */
function BottomDock({
  activeTab,
  onSetTab,
  onOpenShorts,
}: {
  activeTab: "Home" | "Discover" | "Shorts" | "Channels" | "Actors";
  onSetTab: (t: "Home" | "Discover" | "Shorts" | "Channels" | "Actors") => void;
  onOpenShorts: () => void;
}) {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50">
      <div className="mx-auto max-w-[370px] backdrop-blur-xl border border-white/10 rounded-full px-3 py-2 flex justify-between items-center">
        <DockItem
          icon={<House weight="fill" size={20} />}
          label="Home"
          active={activeTab === "Home"}
          onClick={() => onSetTab("Home")}
        />

        <DockItem
          icon={<FilmSlate size={20} />}
          label="Discover"
          active={activeTab === "Discover"}
          onClick={() => onSetTab("Discover")}
        />

        {/* center action = Shorts feed */}
        <button
          onClick={() => {
            onSetTab("Shorts");
            onOpenShorts();
          }}
          className="h-12 w-12 rounded-full bg-white text-black grid place-items-center -mt-6 shadow-lg"
          aria-label="Open Shorts"
        >
          <Video size={22} weight="fill" />
        </button>

        <DockItem
          icon={<TelevisionSimple size={20} />}
          label="Channels"
          active={activeTab === "Channels"}
          onClick={() => onSetTab("Channels")}
        />

        <DockItem
          icon={<UsersThree size={20} />}
          label="Actors"
          active={activeTab === "Actors"}
          onClick={() => onSetTab("Actors")}
        />
      </div>
    </div>
  );
}

/* ============================================================
   UI (UNCHANGED STYLE)
   ============================================================ */
const Pill = ({ active, children, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full border text-sm flex items-center gap-1 transition
      ${active ? "border-white/60" : "border-white/30 opacity-80"}`}
  >
    {children}
  </button>
);

const IconBtn = ({ children }: any) => (
  <button className="rounded-full p-2 hover:bg-white/10 transition">
    {children}
  </button>
);

const CircleBtn = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="h-11 w-11 rounded-full bg-black/60 border border-white/20 grid place-items-center"
  >
    {children}
  </button>
);

const PrimaryBtn = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="px-6 py-3 rounded-full bg-white text-black font-semibold flex gap-2 items-center"
  >
    {children}
  </button>
);

const SecondaryBtn = ({ children }: any) => (
  <button className="px-6 py-3 rounded-full border border-white/20 flex gap-2 items-center">
    {children}
  </button>
);

const Section = ({ title, onSeeAll }: any) => (
  <div className="mt-10 px-7 flex justify-between items-end">
    <div className="font-semibold text-lg">{title}</div>
    {onSeeAll && (
      <button onClick={onSeeAll} className="flex gap-1 items-center opacity-60">
        See all <ArrowRight size={16} />
      </button>
    )}
  </div>
);

const ScrollRow = ({ refEl, children }: any) => (
  <div
    ref={refEl}
    className="mt-4 px-6 flex gap-4 overflow-x-auto scrollbar-hide"
  >
    {children}
  </div>
);

const PosterCard = ({ item, badge }: any) => (
  <div className="relative w-[300px] h-[200px] rounded-[24px] overflow-hidden shrink-0">
    <img
      src={ytThumb(item.youtubeId)}
      className="h-full w-full object-cover"
      alt=""
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
    {badge && (
      <span className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-white/20">
        {badge}
      </span>
    )}
    <div className="absolute bottom-3 left-3">
      <div className="text-sm font-semibold">{item.title}</div>
      <div className="text-xs opacity-60">{item.meta}</div>
    </div>
  </div>
);

const ShortCard = ({ item }: any) => (
  <div className="relative w-[160px] h-[280px] rounded-[24px] overflow-hidden shrink-0">
    <img
      src={ytThumb(item.youtubeId)}
      className="absolute inset-0 h-full w-full object-cover"
      alt=""
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
    <div className="absolute inset-0 grid place-items-center">
      <Play size={28} weight="fill" />
    </div>
    <div className="absolute bottom-3 left-3 text-sm font-semibold">
      {item.title}
    </div>
  </div>
);

const DockItem = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 px-3 py-1 rounded-full ${
      active ? "bg-white/15" : "opacity-70"
    }`}
  >
    {icon}
    <span className="text-[10px]">{label}</span>
  </button>
);

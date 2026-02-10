import React, { useRef, useState } from "react";
import {
  Play,
  House,
  FilmSlate,
  TelevisionSimple,
  UsersThree,
  Video,
} from "@phosphor-icons/react";

type Short = {
  id: string;
  title: string;
  movieTitle: string;
  youtubeId: string;
};

type Props = {
  shorts: Short[];
  onWatchMovie?: (short: Short) => void;
};

/* ================= HELPERS ================= */
const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hq720.jpg`;

/* ================= COMPONENT ================= */
export default function ShortsSection({ shorts, onWatchMovie }: Props) {
  const feedRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      {/* ===== SHORTS FEED ===== */}
      <div
        ref={feedRef}
        className="
          h-full
          w-full
          overflow-y-scroll
          snap-y snap-mandatory
          scrollbar-hide
        "
      >
        {shorts.map((short) => (
          <ShortSlide
            key={short.id}
            short={short}
            onWatch={() => onWatchMovie?.(short)}
          />
        ))}
      </div>

      {/* ===== FLOATING BOTTOM DOCK (SAME AS HOME) ===== */}
      <div className="fixed bottom-4 left-0 right-0 z-50">
        <div className="mx-auto max-w-[370px] backdrop-blur-xl border border-white/10 rounded-full px-3 py-2 flex justify-between items-center">
          <DockItem
            icon={<House weight="fill" size={20} />}
            label="Home"
            active={activeTab === "Home"}
            onClick={() => setActiveTab("Home")}
          />
          <DockItem
            icon={<FilmSlate size={20} />}
            label="Discover"
            active={activeTab === "Discover"}
            onClick={() => setActiveTab("Discover")}
          />
          <button className="h-12 w-12 rounded-full bg-white text-black grid place-items-center -mt-6 shadow-lg">
            <Video size={22} weight="fill" />
          </button>
          <DockItem
            icon={<TelevisionSimple size={20} />}
            label="Channels"
            active={activeTab === "Channels"}
            onClick={() => setActiveTab("Channels")}
          />
          <DockItem
            icon={<UsersThree size={20} />}
            label="Actors"
            active={activeTab === "Actors"}
            onClick={() => setActiveTab("Actors")}
          />
        </div>
      </div>
    </div>
  );
}

/* ================= SLIDE ================= */
function ShortSlide({
  short,
  onWatch,
}: {
  short: Short;
  onWatch?: () => void;
}) {
  return (
    <div
      className="
        relative
        h-screen
        w-full
        snap-start
        flex
        items-end
        bg-black
      "
    >
      {/* Background */}
      <img
        src={ytThumb(short.youtubeId)}
        className="absolute inset-0 h-full w-full object-cover"
        alt={short.title}
      />

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

      {/* Center Play */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-16 w-16 rounded-full bg-black/60 border border-white/20 grid place-items-center">
          <Play size={28} weight="fill" />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 w-full px-5 pb-28">
        <div className="max-w-[430px] mx-auto">
          <div className="text-xl font-semibold leading-tight">
            {short.title}
          </div>

          <div className="mt-1 text-sm opacity-70">
            From <span className="font-medium">{short.movieTitle}</span>
          </div>

          <button
            onClick={onWatch}
            className="
              mt-5
              w-full
              py-3
              rounded-full
              bg-white
              text-black
              font-semibold
              transition
              active:scale-[0.97]
            "
          >
            Watch Full Movie
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= DOCK ITEM ================= */
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

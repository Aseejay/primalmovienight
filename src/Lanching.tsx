import React, { useEffect, useRef, useState } from "react";
import { User, LogIn, Volume2, VolumeX } from "lucide-react";

type Props = {
  onSubscribe: () => void;
  onSignIn: () => void;
};

/* 🎬 Cinematic movie trailer */
const MOVIE_VIDEO =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

/* 🖼️ YOUR LOGO (replace if needed) */
const LOGO_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"; // or https://your-cdn/logo.svg

export default function OnboardingScreen({ onSubscribe, onSignIn }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.35);
  const [showVolume, setShowVolume] = useState(false);

  /* ---------- FORCE AUTOPLAY ---------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {}
    };

    playVideo();

    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      video.volume = Math.min(v, volume);
      if (v >= volume) clearInterval(fade);
    }, 100);

    return () => clearInterval(fade);
  }, []);

  /* ---------- TOGGLE SOUND ---------- */
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted) {
      setShowVolume(true);
      video.volume = volume;
    } else {
      setShowVolume(false);
    }
  };

  /* ---------- VOLUME CHANGE ---------- */
  const changeVolume = (v: number) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(v);
    video.volume = v;

    if (v === 0) {
      video.muted = true;
      setMuted(true);
    } else {
      video.muted = false;
      setMuted(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* ================= HERO ================= */}
      <div className="relative w-full flex-[0.62] overflow-hidden">
        <video
          ref={videoRef}
          src={MOVIE_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover animate-kenburns pointer-events-none"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/70 to-black" />

        {/* Film grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay animate-grain" />

        {/* 🖼️ LOGO */}
        <div className="absolute top-5 left-5 z-10 animate-logoFade">
          <div className="px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
            <img
              src={LOGO_SRC}
              alt="App logo"
              className="h-6 w-auto object-contain"
              draggable={false}
            />
          </div>
        </div>

        {/* 🔊 SOUND + VOLUME */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
          {/* Volume slider */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showVolume ? "w-28 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="volume-slider"
            />
          </div>

          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            className="w-10 h-10 rounded-full
                       bg-black/50 backdrop-blur-md
                       flex items-center justify-center
                       border border-white/20"
          >
            {muted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-[0.38] flex flex-col items-center justify-between px-6 pt-6 pb-4">
        <div className="text-center">
          <h1 className="text-[27px] font-semibold tracking-tight animate-softGlow">
            Stories made for you
          </h1>

          <p className="mt-2 text-[16px] text-white/70 leading-relaxed">
            Dive into the best of Nollywood
            <br />
            movies, series, and exclusives.
          </p>
        </div>

        <div className="w-full space-y-3 mt-6">
          <button
            onClick={onSubscribe}
            className="w-full h-14 rounded-full bg-white text-black
                       text-[16px] font-semibold
                       flex items-center justify-center
                       active:scale-[0.97]"
          >
            Continue as Guest
          </button>

          <button
            onClick={onSignIn}
            className="w-full h-14 rounded-full bg-transparent text-white
                       text-[16px] font-medium
                       backdrop-blur-md
                       flex items-center justify-center gap-2
                       active:scale-[0.97]"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-white/40 flex items-center justify-center gap-1">
            <User className="w-3 h-3" />
            New here?{" "}
            <span className="text-white font-medium">Create account</span>
          </p>

          <p className="mt-2 text-[10px] text-white/30 leading-snug">
            By continuing, you agree to our
            <br />
            Terms of Service and Privacy Policy.
          </p>
        </div>

        <div className="h-1.5 w-32 rounded-full bg-white/40 mt-2" />
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        video::-webkit-media-controls {
          display: none !important;
        }

        @keyframes kenburns {
          0% { transform: scale(1) translateY(0); }
          100% { transform: scale(1.08) translateY(-2%); }
        }
        .animate-kenburns {
          animation: kenburns 14s ease-in-out infinite alternate;
        }

        @keyframes grain {
          0%,100% { background-position: 0 0; }
          50% { background-position: 100% 100%; }
        }
        .animate-grain {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          animation: grain 6s steps(10) infinite;
        }

        @keyframes softGlow {
          0%,100% { text-shadow: 0 0 0 rgba(255,255,255,0); }
          50% { text-shadow: 0 0 12px rgba(255,255,255,0.15); }
        }
        .animate-softGlow {
          animation: softGlow 4s ease-in-out infinite;
        }

        @keyframes logoFade {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-logoFade {
          animation: logoFade 0.8s ease-out forwards;
        }

        /* 🎚️ CUSTOM VOLUME SLIDER */
        .volume-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.3);
          border-radius: 999px;
          outline: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,255,0.6);
          cursor: pointer;
        }

        .volume-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

import React, { useEffect, useMemo, useRef, useState } from "react";
import OnboardingScreen from "./Lanching";

type Props = {
  onSubscribe: () => void;
  onSignIn: () => void;
};

/**
 * ============================================================
 * NOLLYWOOD CENTRAL — CINEMATIC INTRO (Netflix-inspired ident)
 * ------------------------------------------------------------
 * - Black screen
 * - Light beams + glow reveal
 * - Film grain + vignette + scanlines
 * - Crisp logo wordmark reveal
 * - Smooth fade out then launches your onboarding
 *
 * Notes:
 * - Not an exact Netflix clone (protected branding),
 *   but the vibe is premium and very close.
 * ============================================================
 */

export default function AppLaunch({ onSubscribe, onSignIn }: Props) {
  const [phase, setPhase] = useState<"intro" | "out" | "app">("intro");
  const [reduceMotion, setReduceMotion] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Timings (tweak if you want)
  const T = useMemo(
    () => ({
      introHold: 1900, // how long the ident plays
      fadeOut: 550, // fade to launch
      total: 2450,
    }),
    []
  );

  useEffect(() => {
    // Respect user “reduce motion”
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq) {
      setReduceMotion(mq.matches);
      const handler = () => setReduceMotion(mq.matches);
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      // Instant if user requests reduced motion
      const tm = setTimeout(() => setPhase("app"), 150);
      return () => clearTimeout(tm);
    }

    const t1 = window.setTimeout(() => setPhase("out"), T.introHold);
    const t2 = window.setTimeout(() => setPhase("app"), T.total);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [T.introHold, T.total, reduceMotion]);

  // Allow tap/click to skip (feels premium on mobile)
  const skip = () => {
    if (phase === "app") return;
    setPhase("out");
    window.setTimeout(() => setPhase("app"), 350);
  };

  if (phase !== "app") {
    return (
      <div
        onClick={skip}
        className={`fixed inset-0 z-[9999] bg-black overflow-hidden select-none ${
          phase === "out" ? "intro-out" : ""
        }`}
        aria-label="Nollywood Central Intro"
      >
        {/* ====== Base black layer ====== */}
        <div className="absolute inset-0 bg-black" />

        {/* ====== Vignette / depth ====== */}
        <div className="vignette absolute inset-[-20%]" />

        {/* ====== Subtle moving gradient wash ====== */}
        <div className="wash absolute inset-0" />

        {/* ====== Light beams (the “wow” moment) ====== */}
        <div className="beams absolute inset-0">
          <span className="beam b1" />
          <span className="beam b2" />
          <span className="beam b3" />
          <span className="beam b4" />
        </div>

        {/* ====== Glow bloom behind logo ====== */}
        <div className="bloom absolute inset-0" />

        {/* ====== Scanlines + grain (cinema texture) ====== */}
        <div className="scanlines absolute inset-0 pointer-events-none" />
        <div className="grain absolute inset-0 pointer-events-none" />

        {/* ====== Center logo ====== */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="logoWrap">
            {/* top shine sweep */}
            <span className="shine" />
            {/* wordmark */}
            <h1 className="wordmark">
              <span className="word nol">NOLLYWOOD</span>
              <span className="word cen">CENTRAL</span>
            </h1>
            {/* tiny subcopy (optional) */}
            <div className="subcopy">Originals • Movies • Series</div>
          </div>
        </div>

        {/* ====== Skip hint ====== */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center">
          <div className="skipHint">Tap to skip</div>
        </div>

        {/* ================== CSS ================== */}
        <style>{`
          /* ---------- OUTRO (fade away) ---------- */
          .intro-out { animation: outroFade 520ms ease-in forwards; }
          @keyframes outroFade {
            to { opacity: 0; transform: scale(1.01); }
          }

          /* ---------- VIGNETTE ---------- */
          .vignette {
            background: radial-gradient(ellipse at center,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0.35) 45%,
              rgba(0,0,0,0.78) 75%,
              rgba(0,0,0,0.92) 100%);
            filter: blur(10px);
            opacity: 1;
          }

          /* ---------- WASH (slow moving darkness) ---------- */
          .wash {
            background: radial-gradient(circle at 20% 15%,
              rgba(255,255,255,0.05), transparent 40%),
              radial-gradient(circle at 80% 60%,
              rgba(255,255,255,0.04), transparent 45%),
              radial-gradient(circle at 40% 85%,
              rgba(255,255,255,0.03), transparent 50%);
            animation: washMove 2.4s ease-in-out infinite alternate;
            opacity: 0.8;
          }
          @keyframes washMove {
            0% { transform: translate3d(-1.5%, -1%, 0) scale(1.02); }
            100% { transform: translate3d(1.5%, 1%, 0) scale(1.03); }
          }

          /* ---------- BEAMS ---------- */
          .beams { opacity: 1; mix-blend-mode: screen; }
          .beam {
            position: absolute;
            top: -30%;
            bottom: -30%;
            width: 22vw;
            min-width: 180px;
            filter: blur(18px);
            opacity: 0;
            transform: skewX(-12deg) translateX(-20vw);
            background: linear-gradient(to bottom,
              rgba(255,255,255,0.0),
              rgba(255,255,255,0.25),
              rgba(255,255,255,0.05),
              rgba(255,255,255,0.0));
            animation: beamSweep 1.6s cubic-bezier(.2,.9,.2,1) forwards;
          }

          .b1 { left: 12%; animation-delay: 80ms; }
          .b2 { left: 34%; animation-delay: 140ms; }
          .b3 { left: 56%; animation-delay: 210ms; }
          .b4 { left: 74%; animation-delay: 290ms; }

          @keyframes beamSweep {
            0% { opacity: 0; transform: skewX(-12deg) translateX(-28vw) scaleY(0.98); }
            30% { opacity: 0.9; }
            55% { opacity: 0.55; }
            100% { opacity: 0; transform: skewX(-12deg) translateX(42vw) scaleY(1.02); }
          }

          /* ---------- BLOOM (glow behind logo) ---------- */
          .bloom {
            background: radial-gradient(circle at center,
              rgba(255,255,255,0.11) 0%,
              rgba(255,255,255,0.06) 18%,
              rgba(255,255,255,0.02) 35%,
              rgba(0,0,0,0) 60%);
            opacity: 0;
            animation: bloomIn 980ms ease-out forwards;
            animation-delay: 280ms;
          }
          @keyframes bloomIn {
            0% { opacity: 0; transform: scale(0.94); }
            60% { opacity: 1; }
            100% { opacity: 0.75; transform: scale(1.06); }
          }

          /* ---------- SCANLINES ---------- */
          .scanlines {
            opacity: 0.10;
            background: repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.05),
              rgba(255,255,255,0.05) 1px,
              rgba(0,0,0,0) 3px,
              rgba(0,0,0,0) 6px
            );
            animation: scanShift 2s linear infinite;
            mix-blend-mode: overlay;
          }
          @keyframes scanShift {
            0% { transform: translateY(0); }
            100% { transform: translateY(10px); }
          }

          /* ---------- GRAIN ---------- */
          .grain {
            opacity: 0.07;
            background-image: url("https://grainy-gradients.vercel.app/noise.svg");
            mix-blend-mode: overlay;
            animation: grainMove 6s steps(10) infinite;
          }
          @keyframes grainMove {
            0%,100% { transform: translate3d(0,0,0); }
            20% { transform: translate3d(-2%, 1%, 0); }
            40% { transform: translate3d(1%, -2%, 0); }
            60% { transform: translate3d(2%, 2%, 0); }
            80% { transform: translate3d(-1%, -1%, 0); }
          }

          /* ---------- LOGO WRAP ---------- */
          .logoWrap {
            position: relative;
            padding: 18px 22px;
            border-radius: 18px;
            transform: translateY(8px) scale(0.98);
            opacity: 0;
            animation: logoPop 1150ms cubic-bezier(.2,.9,.2,1) forwards;
            animation-delay: 240ms;
          }
          @keyframes logoPop {
            0% { opacity: 0; transform: translateY(12px) scale(0.96); filter: blur(2px); }
            55% { opacity: 1; transform: translateY(0px) scale(1.02); filter: blur(0px); }
            100% { opacity: 1; transform: translateY(0px) scale(1); }
          }

          /* ---------- SHINE SWEEP ---------- */
          .shine {
            position: absolute;
            inset: -40% -60%;
            background: linear-gradient(90deg,
              transparent 0%,
              rgba(255,255,255,0.0) 30%,
              rgba(255,255,255,0.22) 50%,
              rgba(255,255,255,0.0) 70%,
              transparent 100%);
            transform: rotate(15deg) translateX(-40%);
            opacity: 0;
            animation: shineSweep 1.25s ease-out forwards;
            animation-delay: 520ms;
            pointer-events: none;
          }
          @keyframes shineSweep {
            0% { opacity: 0; transform: rotate(15deg) translateX(-55%); }
            20% { opacity: 1; }
            100% { opacity: 0; transform: rotate(15deg) translateX(55%); }
          }

          /* ---------- WORDMARK ---------- */
          .wordmark {
            display: flex;
            gap: 12px;
            align-items: baseline;
            justify-content: center;
            margin: 0;
            line-height: 1;
            user-select: none;
            text-align: center;
            letter-spacing: 0.10em;
            text-transform: uppercase;
          }

          .word {
            font-weight: 800;
            font-size: 30px;
            opacity: 0;
            transform: translateY(10px);
            animation: wordRise 980ms cubic-bezier(.2,.9,.2,1) forwards;
          }

          .nol {
            color: #ffffff;
            text-shadow: 0 10px 30px rgba(255,255,255,0.08);
            animation-delay: 360ms;
          }

          .cen {
            color: #ffffff;
            text-shadow:
              0 0 18px rgba(255,255,255,0.14),
              0 14px 40px rgba(0,0,0,0.55);
            animation-delay: 470ms;
          }

          @keyframes wordRise {
            0% { opacity: 0; transform: translateY(14px) scale(0.98); filter: blur(3px); }
            55% { opacity: 1; transform: translateY(0px) scale(1.02); filter: blur(0); }
            100% { opacity: 1; transform: translateY(0px) scale(1); }
          }

          /* ---------- SUBCOPY ---------- */
          .subcopy {
            margin-top: 10px;
            text-align: center;
            font-size: 12px;
            letter-spacing: 0.14em;
            color: rgba(255,255,255,0.42);
            opacity: 0;
            animation: subIn 820ms ease-out forwards;
            animation-delay: 720ms;
          }
          @keyframes subIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0px); }
          }

          /* ---------- SKIP HINT ---------- */
          .skipHint {
            font-size: 12px;
            letter-spacing: 0.12em;
            color: rgba(255,255,255,0.35);
            padding: 8px 12px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(0,0,0,0.25);
            backdrop-filter: blur(6px);
            opacity: 0;
            animation: hintIn 700ms ease-out forwards;
            animation-delay: 900ms;
          }
          @keyframes hintIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0px); }
          }

          /* ---------- RESPONSIVE ---------- */
          @media (max-width: 420px) {
            .word { font-size: 24px; }
            .logoWrap { padding: 16px 18px; }
            .subcopy { font-size: 11px; }
          }

          /* ---------- SAFETY: disable selection ---------- */
          * { -webkit-tap-highlight-color: transparent; }
        `}</style>
      </div>
    );
  }

  // ✅ Launch your onboarding (UNCHANGED)
  return <OnboardingScreen onSubscribe={onSubscribe} onSignIn={onSignIn} />;
}

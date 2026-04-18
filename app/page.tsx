"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-04-18T23:00:00");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="particle" style={style} />;
}

function CountUnit({ value, label }: { value: string; label: string }) {
  const prevRef = useRef(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 300);
      prevRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="unit">
      <div className={`number-wrap ${flip ? "flip" : ""}`}>
        <span className="number">{value}</span>
      </div>
      <span className="label">{label}</span>
    </div>
  );
}

export default function Home() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(TARGET_DATE));
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const isCountdownOver =
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;

  useEffect(() => {
    setMounted(true);
    const pts: React.CSSProperties[] = Array.from({ length: 60 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      opacity: Math.random() * 0.6 + 0.1,
      animationDuration: `${Math.random() * 6 + 4}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setParticles(pts);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft(TARGET_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0c10;
          min-height: 100vh;
          font-family: 'Barlow', sans-serif;
          overflow: hidden;
        }

        .scene {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 50% 40%, #141b2a 0%, #07090d 70%);
          overflow: hidden;
        }

        .bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(40,80,160,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          animation: drift linear infinite;
        }

        .countdown-over {
          position: absolute;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.9);
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }

        .start-button {
          background: rgba(255,255,255,0.9);
          color: #000;
          border: 1px solid rgba(195, 0, 255, 0.1);
          padding: .5rem 1rem;
          font-size: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        @keyframes drift {
          0%   { transform: translateY(0) scale(1);   opacity: inherit; }
          50%  { transform: translateY(-18px) scale(1.2); }
          100% { transform: translateY(0) scale(1);   opacity: inherit; }
        }

        .bokeh {
          position: absolute;
          border-radius: 50%;
          filter: blur(24px);
          pointer-events: none;
        }

        .season {
          position: absolute;
          bottom: 2.5rem;
          left: 3rem;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.2em;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          line-height: 2;
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? 0 : 12}px);
          transition: all 0.8s ease 0.4s;
        }

        .season .date-range {
          font-weight: 300;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.45);
          font-size: 0.72rem;
        }

        .clock-wrapper {
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 2.2vw;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 2.4rem 3rem;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(6px);
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? 0 : 20}px);
          transition: all 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s;
          box-sizing: border-box;
        }

        .unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
          position: relative;
          padding: 0 0.5vw;
        }

        .unit + .unit::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background: rgba(255,255,255,0.1);
        }

        .number-wrap {
          overflow: hidden;
          height: fit-content;
          padding-left: 0;
          padding-right: 0;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .number-wrap.flip .number {
          animation: flipDown 0.3s ease forwards;
        }

        @keyframes flipDown {
          0%   { transform: translateY(-60%); opacity: 0.3; }
          100% { transform: translateY(0);    opacity: 1; }
        }

        .number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 8vw, 6rem);
          color: #fff;
          letter-spacing: 0.04em;
          display: block;
          line-height: 1;
          width: 100%;
          text-align: center;
        }

        .label {
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          margin-top: 0.6rem;
          font-weight: 400;
        }

        .title-top {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.5rem, 3vw, 1.6rem);
          letter-spacing: 0.35em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 2.5rem;
          opacity: ${mounted ? 1 : 0};
          transition: opacity 0.8s ease 0.2s;
        }
        .review-abs {
          position: absolute;
          font-family: 'Barlow', sans-serif;
          color: rgba(255,255,255,1);
          font-size: 1.5rem;
          text-shadow: 0 2px 8px #0008;
          font-weight: 600;
          pointer-events: none;
          user-select: none;
          opacity: 0.92;
          z-index: 10;
          max-width: 90vw;
          word-break: break-word;
        }
        .review-1 { top: 4vw; left: 4vw; transform: rotate(-7deg); }
        .review-2 { top: 12vw; right: 5vw; transform: rotate(5deg); }
        .review-3 { bottom: 18vw; left: 7vw; transform: rotate(-4deg); }
        .review-4 { bottom: 7vw; right: 7vw; transform: rotate(6deg); }
        .review-5 { top: 12vw; left: 50%; transform: translateX(-50%) rotate(-2deg); }
        .review-6 { bottom: 12vw; right: 20vw; transform: rotate(3deg); }
        .review-7 { top: 42vw; left: 10vw; transform: rotate(-5deg); }

        @media (max-width: 600px) {
          .clock-wrapper {
            flex-direction: row;
            padding: 1.2rem 0.2rem;
            gap: 0;
            width: 99vw;
            max-width: 99vw;
            box-sizing: border-box;
            justify-content: center;
          }
          .unit {
            padding: 0 0.1rem;
            align-items: center;
            justify-content: center;
            flex: 1 1 0;
            min-width: 0;
          }
          .number-wrap {
            padding-left: 0;
            padding-right: 0;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .number {
            font-size: clamp(2.2rem, 12vw, 4.2rem);
            text-align: center;
            width: 100%;
          }
          .unit + .unit::before {
            left: 0;
            top: 15%;
            height: 70%;
            width: 1px;
            background: rgba(255,255,255,0.13);
            margin-left: 0;
          }
          .review-abs {
            font-size: 1.1rem;
            max-width: 80vw;
          }
          .review-1 { top: 8vw; left: 4vw; transform: rotate(-7deg); }
          .review-2 { top: 13vw; right: 7vw; transform: rotate(5deg); }
          .review-3 { bottom: 40vw; left: 10vw; transform: rotate(-4deg); }
          .review-4 { bottom: 50vw; right: 10vw; transform: rotate(6deg); }
          .review-5 { top: 25vw; left: 55vw; transform: translateX(-50%) rotate(-2deg); }
          .review-6 { bottom: 18vw; right: 30vw; transform: rotate(3deg); }
          .review-7 { top: 50vw; left: 12vw; transform: rotate(-5deg); }
        }
      `}</style>

      <div className="scene">
        <div className="bg-glow" />

        {/* Bokeh blobs */}
        {[
          { top: "15%", left: "10%", w: 180, color: "rgba(60,100,200,0.08)" },
          { top: "60%", left: "75%", w: 220, color: "rgba(80,120,220,0.06)" },
          { top: "30%", left: "85%", w: 130, color: "rgba(120,160,255,0.05)" },
          { top: "70%", left: "20%", w: 160, color: "rgba(40,80,180,0.07)" },
        ].map((b, i) => (
          <div
            key={i}
            className="bokeh"
            style={{
              top: b.top,
              left: b.left,
              width: b.w,
              height: b.w,
              background: b.color,
            }}
          />
        ))}

        {/* Particles */}
        {particles.map((style, i) => (
          <Particle key={i} style={style} />
        ))}

        <p className="title-top">
          Grande countdown per il grande regalo per il grande bimbo
        </p>

        <div className="clock-wrapper">
          <CountUnit value={String(time.days)} label="Days" />
          <CountUnit value={pad(time.hours)} label="Hours" />
          <CountUnit value={pad(time.minutes)} label="Minutes" />
          <CountUnit value={pad(time.seconds)} label="Seconds" />
        </div>

        {isCountdownOver && (
          <div className="countdown-over">
            <h1 style={{ fontSize: "3rem" }}>È arrivato il momento.</h1>
            <div
              className="start-button"
              onClick={() => router.push("/compose")}
            >
              Procedi
            </div>
          </div>
        )}

        {/* Review-like texts in absolute positions */}
        <>
          <span className="review-abs review-1">4/4 IGN</span>
          <span className="review-abs review-2">Best gifto del mondo</span>
          <span className="review-abs review-3">Capolavoro assoluto</span>
          <span className="review-abs review-4">
            Un regalo che cambia la vita
          </span>
          <span className="review-abs review-5">Consigliatissimo ⭐⭐⭐⭐</span>
          <span className="review-abs review-6">
            Più bello di Pokémon Z-A (e meno male)
          </span>
          <span className="review-abs review-7">Non ci dormo la notte</span>
        </>
      </div>
    </>
  );
}

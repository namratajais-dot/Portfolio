"use client";

import { useSound } from "./SoundProvider";

export default function Header() {
  const { enabled, toggle } = useSound();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-3 md:p-5">
      <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
        <div className="font-[family-name:var(--font-display)] text-[17px] leading-[0.85] tracking-tight md:text-[22px]">
          hello
          <br />
          world
        </div>
        <div className="text-[9px] leading-tight md:text-[11px]">
          <div className="font-bold">Namrata Jaiswal</div>
          <div className="opacity-60">Developer</div>
        </div>
      </div>

      <button
        onClick={toggle}
        aria-pressed={enabled}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#f0e8d0]/80 px-3 py-1.5 text-[9px] font-bold tracking-widest transition hover:bg-[#f0e8d0]/10 md:px-4 md:text-[10px]"
      >
        <span className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[2px] bg-current"
              style={{
                height: enabled ? "100%" : "2px",
                transition: "height .3s",
                animation: enabled ? `bar 0.8s ${i * 0.12}s ease-in-out infinite alternate` : "none",
              }}
            />
          ))}
        </span>
        <span className={enabled ? "" : "line-through opacity-70"}>SOUND</span>
      </button>

      <style>{`@keyframes bar { from { transform: scaleY(.2) } to { transform: scaleY(1) } }`}</style>
    </header>
  );
}
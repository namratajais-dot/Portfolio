"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";

const NAV = ["About", "Work", "Contact"];

export default function Header() {
  const { enabled, toggle } = useSound();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // close the menu on outside tap, Escape, or when the screen grows
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 640 && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex items-start justify-between p-3 md:p-5">
      {/* Left: brand (fades out when the hero appears) */}
      <div data-header-brand className="pointer-events-auto flex items-center gap-2 md:gap-3">
        <div className="font-[family-name:var(--font-display)] text-[17px] leading-[0.85] tracking-tight md:text-[22px]">
          hello
          <br />
          world
        </div>
        <div className="text-[9px] leading-tight md:text-[11px]">
          <div className="font-bold">Namrata</div>
          <div className="opacity-60">designer</div>
        </div>
      </div>

      {/* Right: nav + sound */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* data-nav is hidden until the hero appears */}
        <div ref={navRef} data-nav className="pointer-events-auto invisible relative">
          {/* sm and up: 3 equal buttons in a row */}
          <nav className="hidden grid-cols-3 gap-1.5 rounded-full bg-sand-50/10 p-1 ring-1 ring-sand-50/25 backdrop-blur sm:grid">
            {NAV.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="w-[clamp(64px,7vw,96px)] rounded-full bg-sand-50/15 py-1.5 text-center text-[10px] tracking-wide transition hover:bg-sand-50 hover:text-wine-800 active:bg-sand-50 active:text-wine-800 md:text-xs"
              >
                {n}
              </a>
            ))}
          </nav>

          {/* phones: one Menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex items-center gap-2 rounded-full border border-[#f0e8d0]/80 bg-wine-900/40 px-3 py-1.5 text-[9px] font-bold tracking-widest backdrop-blur transition active:bg-[#f0e8d0]/10 sm:hidden"
          >
            <span className="relative block h-2.5 w-3.5">
              <span
                className="absolute left-0 h-[2px] w-full bg-current transition-all duration-300"
                style={{ top: open ? "4px" : "0px", transform: open ? "rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 h-[2px] w-full bg-current transition-all duration-300"
                style={{ top: open ? "4px" : "8px", transform: open ? "rotate(-45deg)" : "none" }}
              />
            </span>
            MENU
          </button>

          {/* dropdown */}
          <div
            id="mobile-menu"
            className={`absolute right-0 top-full mt-2 w-44 origin-top-right overflow-hidden rounded-2xl bg-wine-900/95 ring-1 ring-sand-50/25 backdrop-blur-md transition duration-200 sm:hidden ${
              open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            {NAV.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block border-b border-sand-50/10 px-5 py-3 text-sm tracking-wide last:border-0 active:bg-sand-50 active:text-wine-800"
              >
                {n}
              </a>
            ))}
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
      </div>

      <style>{`@keyframes bar { from { transform: scaleY(.2) } to { transform: scaleY(1) } }`}</style>
    </header>
  );
}
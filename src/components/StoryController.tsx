"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { CRT, LCD, fitZoom } from "@/lib/camera";

gsap.registerPlugin(ScrollTrigger);

// ✏️ Edit your story lines here
const COPY = [
  { small: "And curiosity about the", big: "Digital world" },
  { small: "Over time, technology", big: "Got better" },
  { small: "", big: "And so did I" },
];

const screenClip = () => {
  const { vw, vh, w, h } = worldSize();
  const z = fitZoom(LCD, 0.9, 0.9);
  const pw = LCD.w * w * z,
    ph = LCD.h * h * z;
  const cx = vw / 2 + 0.0025 * w * z;
  const cy = vh / 2 + (0.47 - 0.5) * h;
  const t = Math.max(0, cy - ph / 2),
    b = Math.max(0, vh - cy - ph / 2);
  const l = Math.max(0, cx - pw / 2),
    r = Math.max(0, vw - cx - pw / 2);
  return `inset(${t}px ${r}px ${b}px ${l}px round 6px)`;
};

export default function StoryController() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({ lerp: 0.08 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const fadeIn = { autoAlpha: 1, y: 0, duration: 1 };
      const hidden = { autoAlpha: 0, y: 30 };
      const fadeOut = { autoAlpha: 0, y: -30, duration: 1 };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: "[data-spacer]",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true, // recalculate zoom on resize / rotation
        },
      });

      tl.to("[data-hint]", { autoAlpha: 0, duration: 0.4 }, 0)

        // 1) camera pulls back
        .fromTo(
          "[data-world]",
          { scale: () => fitZoom(CRT, 0.9, 1) },
          { scale: 1, duration: 3, ease: "power2.inOut" },
          0,
        )
        .fromTo(
          "[data-room]",
          { filter: "blur(7px)" },
          { filter: "blur(0px)", duration: 3 },
          0,
        )
        .fromTo("[data-copy='0']", hidden, fadeIn, 2.2)
        .to("[data-copy='0']", fadeOut, 4.2)

        // 2) time passes
        .to("[data-night]", { opacity: 0.88, duration: 2 }, 4.4)
        .to("[data-warm]", { opacity: 0, duration: 2 }, 4.4)
        .to("[data-old]", { opacity: 0, duration: 1 }, 4.8)
        .fromTo("[data-new]", { opacity: 0 }, { opacity: 1, duration: 1 }, 4.8)
        .fromTo("[data-copy='1']", hidden, fadeIn, 5.4)
        .to("[data-copy='1']", fadeOut, 7)

        // 3) Win95 → Win11
        .to("[data-win95]", { opacity: 0, duration: 1 }, 7.2)
        .fromTo("[data-copy='2']", hidden, fadeIn, 7.8)

        // 4) push in toward the screen (hand-off to Step 3)
        // 4) push in toward the screen
        .to("[data-copy='2']", fadeOut, 9.4)
        .fromTo(
          "[data-world]",
          { scale: 1 },
          {
            scale: () => fitZoom(LCD, 0.9, 0.9),
            duration: 2.4,
            ease: "power2.inOut",
            immediateRender: false,
          },
          9.4,
        )
        .to("[data-skip]", { autoAlpha: 0, duration: 0.4 }, 10.5)

        // 5) the hero text animates in (visibility of hero / nav / room is handled in sync() below)
        .from(
          "[data-hero-line]",
          { yPercent: 110, duration: 1, stagger: 0.2 },
          12.6,
        )
        .from(
          "[data-hero-fade]",
          { autoAlpha: 0, y: 20, duration: 1, stagger: 0.15 },
          12.8,
        );

      // Visibility is computed from the timeline's current time every frame,
      // so scrolling up always brings back the monitor, the dark room and the CRT.
      const clamp01 = gsap.utils.clamp(0, 1);
      const sync = () => {
        const t = tl.time();
        const heroA = gsap.parseEase("power1.inOut")(clamp01((t - 11.2) / 1.6));

        gsap.set("[data-hero]", { autoAlpha: heroA });
        gsap.set("[data-world]", { autoAlpha: t >= 12.8 ? 0 : 1 });
        gsap.set("[data-header-brand]", {
          autoAlpha: 1 - clamp01((t - 10.8) / 0.6),
        });
        gsap.set("[data-nav]", {
          autoAlpha: clamp01((t - 13) / 1),
          y: (1 - clamp01((t - 13) / 1)) * -10,
        });
      };
      tl.eventCallback("onUpdate", sync);
      sync();
    });
    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const skip = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    lenisRef.current?.scrollTo(max, { duration: 2.5 });
  };

  return (
    <>
      {/* scroll distance: shorter on phones so swiping doesn't take forever */}
      <div data-spacer className="h-[600vh] md:h-[800vh]" />

      {/* Story text */}
      <div className="pointer-events-none fixed inset-x-0 top-[8dvh] z-40 px-4 text-center">
        {COPY.map((c, i) => (
          <div
            key={i}
            data-copy={i}
            className="invisible absolute inset-x-0 px-4 opacity-0"
          >
            <p className="font-sans text-[clamp(12px,min(2vw,3dvh),28px)] font-light uppercase tracking-wide text-white">
              {c.small}
            </p>
            <h2 className="mx-auto max-w-[18ch] text-balance bg-linear-to-b from-white to-[#9fd0ff] bg-clip-text font-[family-name:var(--font-display)] text-[clamp(36px,min(9vw,13dvh),120px)] uppercase leading-[1] text-transparent md:max-w-none">
              {c.big}
            </h2>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        data-hint
        className="pointer-events-none fixed left-1/2 z-40 -translate-x-1/2 animate-bounce text-[10px] font-bold uppercase tracking-[0.3em] opacity-80"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <span className="pointer-coarse:hidden">Scroll ↓</span>
        <span className="hidden pointer-coarse:inline">Swipe ↑</span>
      </div>

      {/* Skip */}
      <button
        data-skip
        onClick={skip}
        className="fixed right-3 z-50 rounded-full bg-[#1c1a3a]/90 px-3 py-2 text-[10px] font-bold backdrop-blur transition hover:bg-[#2a2754] md:right-4 md:px-4 md:text-[11px]"
        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        Skip the story ↓
      </button>
    </>
  );
}

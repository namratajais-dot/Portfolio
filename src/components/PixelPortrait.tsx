"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PixelPortrait({ src = "/images/portrait.png" }: { src?: string }) {
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      ry((e.clientX / window.innerWidth - 0.5) * 14);
      rx(-(e.clientY / window.innerHeight - 0.5) * 14);
    };
    const reset = () => { rx(0); ry(0); };

    // slow idle float
    const float = gsap.to(el, { y: -8, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("mouseleave", reset);
    return () => {
      float.kill();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={card}
      className="aspect-[500/443] w-full overflow-hidden rounded-2xl border-[5px] border-sand-50 bg-wine-900 shadow-[8px_8px_0_0_#e3a6a0] will-change-transform md:shadow-[12px_12px_0_0_#e3a6a0]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Namrata, pixel art portrait"
        draggable={false}
        className="h-full w-full scale-[1.05] object-cover [image-rendering:pixelated]"
      />
    </div>
  );
}
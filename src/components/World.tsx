"use client";

import { useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";
import gsap from "gsap";
import Room from "./Room";
import Monitor from "./Monitor";
import LcdMonitor from "./LcdMonitor";
import { worldSize } from "@/lib/camera";

type Props = {
  screenRef: RefObject<HTMLDivElement | null>;
  locked: boolean; // true while the user is on the cable screen
  children: ReactNode;
};

export default function World({ screenRef, locked, children }: Props) {
  const worldRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = worldRef.current;
    if (!el) return;

    const update = () => {
      // 1) size the world in px (same function the camera uses, so they always agree)
      const { w, h, vw, vh } = worldSize();
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;

      // 2) while on the cable screen, measure the real monitor and zoom to fit it
      if (locked) {
        const crt = el.querySelector<HTMLElement>("[data-crt]");
        if (crt) {
          const zoom = Math.min((vw * 0.9) / crt.offsetWidth, (vh * 0.95) / crt.offsetHeight);
          gsap.set(el, { scale: zoom });
        }
      }
    };

    update();
    gsap.set(el, { autoAlpha: 1 });
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [locked]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[linear-gradient(#55321d_50%,#3f2313_50%)]">
      <div
        ref={worldRef}
        data-world
        className="invisible relative flex-none"
        style={{ containerType: "size", transformOrigin: "50% 47%" }}
      >
        <Room />
        <Monitor screenRef={screenRef}>{children}</Monitor>
        <LcdMonitor />
      </div>
    </div>
  );
}
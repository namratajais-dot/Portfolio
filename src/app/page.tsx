"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import World from "@/components/World";
import CableScene from "@/components/CableScene";
import StoryScene from "@/components/StoryScene";
import StoryController from "@/components/StoryController";

export default function Home() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<"cable" | "story">("cable");

  const goToStory = () => {
    const el = screenRef.current;
    if (!el) return;

    gsap
      .timeline()
      .to(el, { filter: "brightness(2.5)", duration: 0.12 })
      .to(el, { scaleY: 0.01, duration: 0.22, ease: "power3.in" })
      .to(el, { scaleX: 0, duration: 0.18, ease: "power2.in" })
      .call(() => setScene("story"))
      .set(el, { scaleX: 1 })
      .to(el, { scaleY: 1, filter: "brightness(1)", duration: 0.45, ease: "power3.out" });
  };

  return (
    <>
      <Header />
      <World screenRef={screenRef} locked={scene === "cable"}>
        {scene === "cable" ? <CableScene onConnect={goToStory} /> : <StoryScene />}
      </World>
      {scene === "story" && <StoryController />}
    </>
  );
}
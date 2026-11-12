"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";

type SoundContextType = { enabled: boolean; toggle: () => void };
const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/soundtrack.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    gsap.killTweensOf(audio);

    if (!enabled) {
      audio.play().catch(() => {});
      gsap.to(audio, { volume: 0.6, duration: 1.2 }); // fade in
      setEnabled(true);
    } else {
      gsap.to(audio, { volume: 0, duration: 0.6, onComplete: () => audio.pause() }); // fade out
      setEnabled(false);
    }
  }, [enabled]);

  return <SoundContext.Provider value={{ enabled, toggle }}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
}
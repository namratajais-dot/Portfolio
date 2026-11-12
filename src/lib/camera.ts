const AR = 16 / 9; // aspect ratio of the "world" (the room)

// Size boxes of the two monitors, as fractions of the world
export const CRT = { w: 0.26, h: 0.4 };
export const LCD = { w: 0.275, h: 0.34 };

/** Size of the world in px. Must match the CSS in World.tsx. */
export function worldSize() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const portrait = vh >= vw;
  // landscape: world covers the screen. portrait: world is 150vw wide, with bars above and below
  const w = portrait ? vw * 1.5 : Math.max(vw, vh * AR);
  return { vw, vh, w, h: w / AR };
}

/** Zoom that makes `box` fill `fillW` of the screen width and `fillH` of its height. */
export function fitZoom(box: { w: number; h: number }, fillW = 0.9, fillH = 0.9) {
  const { vw, vh, w, h } = worldSize();
  return Math.min((vw * fillW) / (box.w * w), (vh * fillH) / (box.h * h));
}
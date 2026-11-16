// "use client";

// import { useEffect, useRef } from "react";

// type Props = { src?: string; dot?: string };

// export default function HalftonePortrait({ src = "/images/portrait.png", dot = "#f8f0e3" }: Props) {
//   const ref = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = ref.current!;
//     const ctx = canvas.getContext("2d")!;
//     const pointer = { x: -9999, y: -9999 };
//     let cells = new Float32Array(0);
//     let cols = 0, rows = 0, cell = 8, W = 0, H = 0, raf = 0;
//     let img: HTMLImageElement | null = null;

//     const sample = () => {
//       const o = document.createElement("canvas");
//       o.width = cols;
//       o.height = rows;
//       const oc = o.getContext("2d", { willReadFrequently: true })!;

//       if (img) {
//         // fit the image inside the grid, aligned to the bottom centre
//         const s = Math.min(cols / img.width, rows / img.height);
//         const dw = img.width * s, dh = img.height * s;
//         oc.drawImage(img, (cols - dw) / 2, rows - dh, dw, dh);
//       } else {
//         // placeholder silhouette (shown until portrait.png exists)
//         oc.fillStyle = "#666";
//         oc.beginPath(); oc.ellipse(cols * 0.5, rows * 0.32, cols * 0.25, rows * 0.28, 0, 0, 7); oc.fill();
//         oc.fillStyle = "#ddd";
//         oc.fillRect(cols * 0.44, rows * 0.5, cols * 0.12, rows * 0.22);
//         oc.beginPath(); oc.ellipse(cols * 0.5, rows * 1.02, cols * 0.46, rows * 0.32, 0, 0, 7); oc.fill();
//         oc.fillStyle = "#fff";
//         oc.beginPath(); oc.ellipse(cols * 0.5, rows * 0.36, cols * 0.17, rows * 0.22, 0, 0, 7); oc.fill();
//       }

//       const d = oc.getImageData(0, 0, cols, rows).data;
//       cells = new Float32Array(cols * rows);
//       for (let i = 0; i < cells.length; i++) {
//         const a = d[i * 4 + 3] / 255;
//         if (a < 0.08) continue;
//         const lum = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255;
//         cells[i] = a * (0.25 + 0.75 * Math.pow(lum, 0.8)); // floor keeps dark hair visible
//       }
//     };

//     const draw = () => {
//       raf = 0;
//       ctx.clearRect(0, 0, W, H);
//       ctx.fillStyle = dot;
//       const R = cell * 14;
//       ctx.beginPath();
//       for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//           const v = cells[r * cols + c];
//           if (v < 0.02) continue;
//           const x = (c + 0.5) * cell, y = (r + 0.5) * cell;
//           const dist = Math.hypot(x - pointer.x, y - pointer.y);
//           const boost = dist < R ? 1 + (1 - dist / R) * 0.9 : 1;
//           const rad = Math.min(cell * 0.62, cell * 0.5 * v * boost);
//           ctx.moveTo(x + rad, y);
//           ctx.arc(x, y, rad, 0, 6.2832);
//         }
//       }
//       ctx.fill();
//     };
//     const schedule = () => { if (!raf) raf = requestAnimationFrame(draw); };

//     const setup = () => {
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);
//       W = canvas.clientWidth;
//       H = canvas.clientHeight;
//       if (!W || !H) return;
//       canvas.width = W * dpr;
//       canvas.height = H * dpr;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       cell = W < 420 ? 6 : W < 720 ? 7 : 9; // finer dots on small screens
//       cols = Math.ceil(W / cell);
//       rows = Math.ceil(H / cell);
//       sample();
//       schedule();
//     };

//     const onMove = (e: PointerEvent) => {
//       const b = canvas.getBoundingClientRect();
//       pointer.x = e.clientX - b.left;
//       pointer.y = e.clientY - b.top;
//       schedule();
//     };

//     const im = new Image();
//     im.onload = () => { img = im; setup(); };
//     im.onerror = () => { img = null; setup(); };
//     im.src = src;

//     const ro = new ResizeObserver(setup);
//     ro.observe(canvas);
//     window.addEventListener("pointermove", onMove);
//     return () => {
//       ro.disconnect();
//       window.removeEventListener("pointermove", onMove);
//       cancelAnimationFrame(raf);
//     };
//   }, [src, dot]);

//   return <canvas ref={ref} className="pointer-events-none h-full w-full" />;
// }
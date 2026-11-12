"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

const W = 800;
const H = 460;
const ANCHOR = { x: 272, y: 200 }; // where the cable leaves the computer icon
const REST = { x: 250, y: 318 };   // plug resting position
const SOCKET = { x: 481, y: 205 }; // socket next to the globe
const SNAP = 70;                   // how close counts as "connected"

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function CableScene({ onConnect }: { onConnect: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pos = useRef({ ...REST }); // GSAP tweens this object
  const dragging = useRef(false);
  console.log("CABLE DRAG STARTED");

  const [plug, setPlug] = useState({ ...REST });
  const [near, setNear] = useState(false);
  const [connected, setConnected] = useState(false);

  const sync = () => setPlug({ x: pos.current.x, y: pos.current.y });

  const toSvgPoint = (e: React.PointerEvent) => {
    const svg = svgRef.current!;
    const pt = svg.createSVGPoint();
    console.log("CABLE DRAG STARTED");
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: clamp(p.x, 20, W - 20), y: clamp(p.y, 20, H - 20) };
  };

  const onDown = (e: React.PointerEvent) => {
    if (connected) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    gsap.killTweensOf(pos.current);
    dragging.current = true;
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const p = toSvgPoint(e);
    pos.current.x = p.x;
    pos.current.y = p.y;
    setNear(dist(p, SOCKET) < SNAP);
    sync();
  };

  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    if (dist(pos.current, SOCKET) < SNAP) {
      // Snap into the socket → connected!
      setConnected(true);
      gsap.to(pos.current, {
        x: SOCKET.x,
        y: SOCKET.y,
        duration: 0.2,
        ease: "power2.out",
        onUpdate: sync,
        onComplete: () => {
          gsap.delayedCall(0.8, onConnect);
        },
      });
    } else {
      // Spring back
      setNear(false);
      gsap.to(pos.current, {
        x: REST.x,
        y: REST.y,
        duration: 1,
        ease: "elastic.out(1, 0.45)",
        onUpdate: sync,
      });
    }
  };

  const dx = plug.x - ANCHOR.x;
  const cable = `M ${ANCHOR.x} ${ANCHOR.y} C ${ANCHOR.x + dx * 0.1} ${ANCHOR.y + 90}, ${plug.x} ${plug.y - 60}, ${plug.x} ${plug.y}`;
  const accent = near || connected ? "#8fd0ff" : "#4f7fa0";
  const pixelFont = { fontFamily: "var(--font-pixel)" };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full select-none"
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {/* Computer icon */}
      <g>
        <rect x="135" y="105" width="140" height="105" rx="4" fill="#e9e4cf" />
        <rect x="147" y="117" width="116" height="78" fill="#0b4a7c" />
        <rect x="190" y="210" width="34" height="14" fill="#e9e4cf" />
        <rect x="165" y="224" width="84" height="10" fill="#e9e4cf" />
      </g>

      {/* Dashed arrow */}
      <line x1="310" y1="205" x2="450" y2="205" stroke={accent} strokeWidth="4" strokeDasharray="10 8" />

      {/* Socket */}
      <rect x="470" y="188" width="22" height="34" fill="none" stroke="#e9e4cf" strokeWidth="3" />

      {/* Globe */}
      <g
        stroke={accent}
        strokeWidth="6"
        fill="none"
        style={{ transition: "stroke .2s", filter: near || connected ? "drop-shadow(0 0 10px #8fd0ff)" : "none" }}
      >
        <circle cx="570" cy="205" r="62" />
        <ellipse cx="570" cy="205" rx="26" ry="62" />
        <line x1="570" y1="143" x2="570" y2="267" />
        <line x1="508" y1="205" x2="632" y2="205" />
        <line x1="518" y1="175" x2="622" y2="175" />
        <line x1="518" y1="235" x2="622" y2="235" />
      </g>

      {/* Cable */}
      <path d={cable} fill="none" stroke="#02101f" strokeWidth="8" strokeLinecap="round" />
      <path d={cable} fill="none" stroke="#e9e4cf" strokeWidth="4" strokeLinecap="round" />

      {/* Plug (draggable) */}
      <g
        transform={`translate(${plug.x - 22} ${plug.y - 15})`}
        onPointerDown={onDown}
        style={{ cursor: connected ? "default" : dragging.current ? "grabbing" : "grab", touchAction: "none" }}
      >
        <rect x="-20" y="-20" width="84" height="70" fill="transparent" /> {/* bigger hit area */}
        <rect width="40" height="30" fill="#e9e4cf" />
        <rect x="6" y="7" width="22" height="16" fill="#5fa8d3" />
        <rect x="40" y="8" width="10" height="14" fill="#e9e4cf" />
      </g>

      {/* Text */}
      <text x={W / 2} y="388" textAnchor="middle" fontSize="68" fill="#e9e4cf" letterSpacing="2" style={pixelFont}>
        {connected ? "CONNECTED" : "DRAG THE CABLE"}
      </text>
      <text x={W / 2} y="430" textAnchor="middle" fontSize="38" fill="#e9e4cf" letterSpacing="2" style={pixelFont}>
        {connected ? "LOADING..." : "TO GO ONLINE"}
      </text>
    </svg>
  );
}
import type { CSSProperties, ReactNode } from "react";

type BoxProps = {
  l: number; t: number; w: number; h: number;
  className?: string; style?: CSSProperties; children?: ReactNode;
};

const B = ({ l, t, w, h, className = "", style, children }: BoxProps) => (
  <div
    className={`absolute ${className}`}
    style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%`, ...style }}
  >
    {children}
  </div>
);

export default function Room() {
  return (
    <div data-room className="absolute inset-0 overflow-hidden" style={{ filter: "blur(7px)" }}>
      {/* Pegboard wall */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,.28) 0.12cqw, transparent 0.2cqw) 0 0 / 1.8cqw 1.8cqw, linear-gradient(#55321d, #2c190d)",
        }}
      />

      {/* Curtain */}
      <B l={0} t={0} w={5} h={100} style={{ background: "linear-gradient(90deg,#0d1730,#1b2d5c)" }} />

      {/* Left dark poster with ring */}
      <B l={17} t={0} w={14} h={35} className="flex items-center justify-center bg-[#0c0a0c]">
        <div className="aspect-square w-[60%] rounded-full border-[0.3cqw] border-[#c9a227]/70" />
      </B>

      {/* Calendar */}
      <B l={8} t={18} w={6} h={22} style={{ background: "linear-gradient(#c9a27a 0 25%, #d9d2c0 25%)" }} />

      {/* Shelf + books */}
      <B l={14} t={51.5} w={17} h={1.2} className="bg-[#2a170c]" />
      {["#7a1f1f", "#1f3f7a", "#c9a227", "#2f6b3a", "#5a2f7a"].map((c, i) => (
        <B key={c} l={15 + i * 1.5} t={39} w={1.3} h={12.5} style={{ background: c }} />
      ))}

      {/* Framed picture */}
      <B l={23} t={33} w={7} h={18} className="border-[0.3cqw] border-[#3a2113] bg-[#d8cdb5]">
        <div className="absolute bottom-0 right-[20%] h-[60%] w-[35%] rounded-t-full bg-[#1a1210]" />
      </B>

      {/* KYIV poster */}
      <B
        l={71} t={0} w={12} h={30}
        style={{ background: "linear-gradient(#2a1a5a, #c2457a 60%, #0d0a14 60%)" }}
      >
        <span className="absolute left-[8%] top-[4%] font-[family-name:var(--font-display)] text-[1.6cqw] text-white/70">KYIV</span>
        <div className="absolute left-1/2 top-[30%] aspect-square w-[60%] -translate-x-1/2 rounded-full bg-[#f2b84b]" />
      </B>

      {/* Cat poster + moon poster */}
      <B l={70} t={38} w={5} h={14} className="bg-[#e8b93c]">
        <div className="absolute left-1/2 top-1/2 h-[40%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111]" />
      </B>
      <B l={76.5} t={40} w={7} h={20} className="border-[0.3cqw] border-[#2a170c] bg-[#14100f]">
        <div className="absolute left-1/2 top-[35%] aspect-square w-[55%] -translate-x-1/2 rounded-full bg-[#c9b98a]" />
      </B>

      {/* Polaroids */}
      <B l={87} t={17} w={2.2} h={5} className="bg-[#f08a24]" />
      <B l={89.5} t={23} w={2.2} h={5} className="bg-[#1d3a8a]" />

      {/* Plant */}
      {[[84, 50, 7, 16], [88, 58, 8, 18], [82, 66, 9, 16], [90, 68, 8, 15], [86, 76, 8, 14]].map(([l, t, w, h], i) => (
        <B key={i} l={l} t={t} w={w} h={h} className="rounded-full bg-[radial-gradient(circle,#3f6a35,#1f3a1c)]" />
      ))}

      {/* Desk */}
      <B l={0} t={79} w={100} h={21} style={{ background: "linear-gradient(#8a4f2c, #3f2313)" }} />

      {/* ===== OLD ERA ===== */}
      <div data-old className="absolute inset-0">
        {/* computer case */}
        <B l={36} t={66} w={28} h={14} className="rounded-sm bg-[linear-gradient(#d6d0c1,#b8b2a2)]">
          <div className="absolute bottom-[25%] left-[8%] h-[7%] w-[28%] bg-[#1b1b1b]" />
          <div className="absolute bottom-[22%] right-[10%] h-[8%] w-[2.5%] rounded-full bg-[#7ee08a]" />
        </B>
        {/* monitor neck */}
        <B l={43} t={64} w={14} h={3} className="bg-[#c9c3b4]" />
        {/* keyboard */}
        <B l={39} t={82} w={22} h={6} className="rounded-sm bg-[#e3dcc8] shadow-[0_0.6cqw_1cqw_rgba(0,0,0,.4)]" />
        {/* wooden speakers */}
        <B l={28.5} t={67} w={6} h={14} className="rounded-sm bg-[linear-gradient(90deg,#b07a4a,#7a4a28)]">
          <div className="absolute left-1/2 top-[45%] aspect-square w-[55%] -translate-x-1/2 rounded-full bg-[#2a170c]" />
        </B>
        <B l={65.5} t={67} w={6} h={14} className="rounded-sm bg-[#8e8b84]">
          <div className="absolute inset-[15%] bg-[#111]" />
        </B>
      </div>

      {/* ===== NEW ERA ===== */}
      <div data-new className="absolute inset-0 opacity-0">
        <B l={30} t={83} w={40} h={12} className="rounded-sm bg-[#14161c]" />
        <B l={39} t={85} w={22} h={4} className="rounded-sm bg-[#2a2d36]" />
        <B l={66} t={86} w={2.2} h={4} className="rounded-full bg-[#cfd3dc]" />
        <B l={29} t={64} w={5} h={17} className="rounded-sm bg-[linear-gradient(90deg,#dfe3ee,#8b90a0)]" />
        <B l={67} t={62} w={5} h={19} className="rounded-sm bg-[#12141a]" />
      </div>

      {/* ===== COMMON ===== */}
      {/* Lamp */}
      <svg className="absolute" style={{ left: "23%", top: "36%", width: "14%", height: "46%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="48,2 100,22 98,38 70,40 40,26" fill="#2f2e2c" />
        <polyline points="60,38 22,66 18,86" stroke="#7b7a76" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
        <ellipse cx="18" cy="96" rx="14" ry="3" fill="#8b8a85" />
      </svg>
      {/* Pencil cup */}
      <B l={20} t={72} w={3} h={9} className="rounded-b-md bg-[#e9e6df]" />
      {["#d9b43c", "#2f5fb8", "#c0392b"].map((c, i) => (
        <B key={c} l={20.6 + i * 0.7} t={66} w={0.4} h={7} style={{ background: c }} />
      ))}
      {/* Headphones */}
      <B l={31.5} t={87} w={3.2} h={6} className="rounded-full bg-[#7a5236]" />
      <B l={36} t={87} w={3.2} h={6} className="rounded-full bg-[#7a5236]" />

      {/* Lamp glow (day) — fades out at night */}
      <div
        data-warm
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 62%, rgba(255,170,80,.38), transparent 60%)" }}
      />

      {/* Night overlay — fades in */}
      <div data-night className="absolute inset-0 bg-[#050814] opacity-0" style={{ opacity: 0 }} />
    </div>
  );
}
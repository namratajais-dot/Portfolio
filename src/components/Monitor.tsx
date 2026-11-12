import type { ReactNode, RefObject } from "react";

type Props = { screenRef: RefObject<HTMLDivElement | null>; children: ReactNode };

export default function Monitor({ screenRef, children }: Props) {
  return (
    // <div data-old className="absolute" style={{ left: "37%", top: "27%", width: "26%", height: "40%" }}>
     <div data-old data-crt className="absolute" style={{ left: "37%", top: "27%", width: "26%", height: "40%" }}> 
      <div className="relative h-full w-full rounded-[5%/4.5%] bg-[linear-gradient(160deg,#b9b5aa,#8e8a80)] shadow-[0_2cqw_5cqw_rgba(0,0,0,.6),inset_0_0_0_3px_rgba(255,255,255,.08)]">
        <div className="absolute inset-x-[8%] bottom-[11%] top-[7%] rounded-[3%/4%] bg-[#4d4a43] shadow-[inset_0_6px_20px_rgba(0,0,0,.7)]" />

        <div
          className="absolute inset-x-[11%] bottom-[14%] top-[10%] overflow-hidden rounded-[3%/4%] bg-[#02101f] shadow-[inset_0_0_60px_rgba(0,0,0,.9)]"
          style={{ containerType: "size" }}
        >
          <div ref={screenRef} className="absolute inset-0 will-change-transform">
            {children}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,.18)_0px,rgba(0,0,0,.18)_1px,transparent_1px,transparent_3px)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,.65)_100%)]" />
        </div>

        {/* power button + LED */}
        <div className="absolute bottom-[5%] right-[12%] h-[2.5%] w-[7%] rounded-sm bg-[#6f6b62]" />
        <div className="absolute bottom-[4.8%] right-[7%] h-[3%] w-[3%] border border-[#6f6b62]" />
      </div>
    </div>
  );
}
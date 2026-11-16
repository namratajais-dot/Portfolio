export default function LcdMonitor() {
  return (
    <div
      data-new
      className="pointer-events-none absolute opacity-0"
      style={{ left: "36.5%", top: "30%", width: "27.5%", height: "34%" }}
    >
      {/* stand */}
      <div className="absolute left-1/2 top-full h-[36%] w-[2.2%] -translate-x-1/2 bg-[#14161c]" />
      {/* <div className="absolute left-1/2 top-[134%] h-[7%] w-[5%] -translate-x-1/2 bg-[#14161c]" /> */}

      {/* panel */}
      <div className="relative h-full w-full border-[3px] border-[#0b0c10] bg-black shadow-[0_0_6cqw_rgba(70,130,255,.35)]">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ containerType: "size" }}
        >
          {/* Win11 (bottom layer) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#0b2a66,#030a1c_70%)]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 top-[44%]"
                style={{
                  width: `${44 - i * 9}cqw`,
                  height: `${34 - i * 7}cqw`,
                  borderRadius: "45% 55% 50% 50%",
                  transform: `translate(-50%,-50%) rotate(${i * 28 - 20}deg)`,
                  background: "linear-gradient(135deg,#1e6bff,#0a2f9e)",
                  opacity: 0.5 + i * 0.18,
                  filter: "blur(0.4cqw)",
                }}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 flex h-[7cqh] items-center justify-center gap-[1.2cqw] bg-black/40">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-[2.4cqw] w-[2.4cqw] rounded-sm bg-[#4aa3ff]/80"
                />
              ))}
              <span className="absolute right-[1.5cqw] text-[1.3cqw] text-white/80">
                09:41
              </span>
            </div>
          </div>

          {/* Win95 (top layer) */}
          <div
            data-win95
            className="absolute inset-10 bg-[#008080]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <div className="absolute left-[2cqw] top-[2cqh] flex flex-col gap-[3cqh] text-center text-white">
              {[
                ["🖥️", "My Computer"],
                ["💡", "My Ideas"],
                ["🗑️", "Recycle Bin"],
              ].map(([icon, label]) => (
                <div key={label}>
                  <div className="text-[3cqw] leading-none">{icon}</div>
                  <div className="text-[1.1cqw]">{label}</div>
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 flex h-[7cqh] items-center bg-[#c0c0c0] px-[0.5cqw] text-[1.3cqw] text-black">
              <span className="border border-black/60 px-[1cqw] font-bold">
                Start
              </span>
              <span className="ml-[1cqw] border border-black/40 px-[1cqw]">
                hello_world
              </span>
              <span className="ml-auto border border-black/40 px-[1cqw]">
                09:41
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

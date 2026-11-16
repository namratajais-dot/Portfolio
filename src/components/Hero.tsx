import PixelPortrait from "./PixelPortrait";

export default function Hero() {
  return (
    <section
      data-hero
      className="invisible fixed inset-0 z-30 overflow-hidden bg-[radial-gradient(ellipse_at_70%_65%,#7a1a32_0%,#5c1124_45%,#3a0a16_100%)] text-sand-50"
    >
      {/* faint vertical grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg,#ebdddd 0 1.5px,transparent 1px 8.333%)" }}
      />

      {/* Name (top-left) */}
      <div data-hero-fade className="absolute left-4 top-4 md:left-5 md:top-5">
        <p className="font-[family-name:var(--font-sans)] text-[clamp(16px,2.2vw,34px)] leading-tight">
          Namrata Jaiswal
        </p>
        <p className="text-[10px] opacity-70 md:text-xs">Developer</p>
      </div>

      {/*
        Default (phones, tablets, narrow windows): centred column, headline on top, art below.
        `wide` (screen at least 4:3 landscape): headline left, art right.
      */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-[max(2rem,4dvh)] px-4 pb-[max(1.5rem,4dvh)] pt-[max(5.5rem,13dvh)] text-center
                   wide:flex-row wide:items-end wide:justify-between wide:gap-6 wide:px-5 wide:pb-[6dvh] wide:pt-[12dvh] wide:text-left"
      >
        <h1
          className="min-w-0 font-[family-name:var(--font-display)] text-[clamp(34px,min(13.5vw,10dvh),130px)] uppercase leading-[0.92]
                     wide:text-[clamp(40px,min(9.5vw,15dvh),190px)]"
        >
          <span className="block overflow-hidden"><span data-hero-line className="block">I make ideas</span></span>
          <span className="block overflow-hidden"><span data-hero-line className="block text-blush">move.</span></span>
        </h1>

        <div
          data-hero-fade
          className="relative w-[min(78vw,44dvh)] shrink-0 wide:mb-[2dvh] wide:w-[min(38vw,62dvh)]"
        >
          <PixelPortrait />
          <div className="absolute -top-4 left-3 rounded-xl rounded-bl-none bg-sand-50 px-3 py-1.5 font-[family-name:var(--font-pixel)] text-[clamp(16px,2vw,24px)] leading-none text-wine-900 wide:-left-6 wide:-top-5">
            Hi, I&apos;m Namrata!
          </div>
        </div>
      </div>
    </section>
  );
}
import type { Metadata } from "next";
import { VT323, Space_Mono, Anton, Inter , Noto_Sans_Devanagari} from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/SoundProvider";


const pixel = VT323({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono-ui" });
const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ weight: ["300", "400"], subsets: ["latin"], variable: "--font-sans" });
const deva = Noto_Sans_Devanagari({ weight: ["400", "600"], subsets: ["devanagari", "latin"], variable: "--font-deva" });


export const metadata: Metadata = {
  title: "Hello World — Namrata",
  description: "Animation portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pixel.variable} ${mono.variable} ${display.variable} ${sans.variable}`}>
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "VoiceChat AI - Conversational AI Platform",
  description:
    "Experience natural conversations with AI using advanced voice technology powered by ElevenLabs",
  generator: "v0.app",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} dark`}
    >
      <body className="font-body antialiased">
        {children} <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}

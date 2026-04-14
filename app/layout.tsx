import type { Metadata } from "next";
import { GameProvider } from "./gameContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "44444444444444444444444444444444444444444444",
  description: "444444444444444444444444444444444",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}

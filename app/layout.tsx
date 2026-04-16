import PWABridge from "@/components/PWABridge";
import RootLayoutClient from "@/components/RootLayoutClient";
import type { Metadata } from "next";

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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <PWABridge />
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}

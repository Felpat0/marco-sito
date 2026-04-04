import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Winter Countdown",
  description: "Countdown to Winter Solstice 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

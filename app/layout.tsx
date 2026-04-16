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
      <body>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}

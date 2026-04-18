"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OrientationOverlay } from "@/components/OrientationOverlay/OrientationOverlay";
import { useOrientation } from "@/hooks/useOrientation";

export default function RotatePage() {
  const router = useRouter();
  const { isLandscape, isMobile } = useOrientation();

  // Desktop or already landscape: skip straight to game
  useEffect(() => {
    if (!isMobile || isLandscape) {
      router.replace("/game");
    }
  }, [isMobile, isLandscape, router]);

  return (
    <OrientationOverlay onContinue={() => router.push("/game")} />
  );
}

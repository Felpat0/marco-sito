"use client";

import { useRouter } from "next/navigation";
import { OrientationOverlay } from "@/components/OrientationOverlay/OrientationOverlay";

export default function RotatePage() {
  const router = useRouter();

  return <OrientationOverlay onContinue={() => router.push("/game")} />;
}

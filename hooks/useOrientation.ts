"use client";

import { useEffect, useState } from "react";

interface OrientationState {
  isLandscape: boolean;
  isMobile: boolean;
}

// SSR-safe defaults: assume landscape + desktop to avoid blocking non-mobile users
const DEFAULT_STATE: OrientationState = { isLandscape: true, isMobile: false };

export function useOrientation(): OrientationState {
  const [state, setState] = useState<OrientationState>(DEFAULT_STATE);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: landscape)");
    const isMobile = navigator.maxTouchPoints > 0;

    const update = () => {
      setState({ isLandscape: mq.matches, isMobile });
    };

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return state;
}

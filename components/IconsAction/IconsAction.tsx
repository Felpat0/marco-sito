import React from "react";
import { RiSwordFill, RiShieldFill, RiZzzFill } from "react-icons/ri";
import type { IconType } from "react-icons";
import { BiPlusMedical } from "react-icons/bi";

interface IconsActionProps {
  type: "attack" | "defend" | "heal" | "idle";
  value?: number;
}

const ICON_MAP: Record<
  IconsActionProps["type"],
  { icon: IconType; color: string }
> = {
  attack: { icon: RiSwordFill, color: "red" },
  defend: { icon: RiShieldFill, color: "#2563eb" },
  heal: { icon: BiPlusMedical, color: "green" },
  idle: { icon: RiZzzFill, color: "white" },
};

export default function IconsAction({ type, value }: IconsActionProps) {
  const { icon: Icon, color } = ICON_MAP[type];
  return (
    <div style={{ position: "relative", width: "50px", height: "50px" }}>
      {value !== undefined && value > 0 && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "18px",
            fontWeight: "bold",
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
            color: "black",
            zIndex: 1,
          }}
        >
          {value}
        </span>
      )}
      <Icon style={{ width: "100%", height: "100%" }} color={color} />
    </div>
  );
}

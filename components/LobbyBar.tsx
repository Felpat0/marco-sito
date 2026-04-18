import { QRCodeSVG } from "qrcode.react";
import { useState, useRef } from "react";

// ── Lobby sharing bar ──────────────────────────────────────────
export function LobbyBar({
  lobbyId,
  createLobby,
}: {
  lobbyId: string | null;
  createLobby: () => void;
}) {
  const [showQr, setShowQr] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = lobbyId
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/watch/${lobbyId}`
    : "";

  const barStyle: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.4rem",
    padding: "0.4rem 0.75rem",
    background: "rgba(0,0,0,0.6)",
    borderRadius: "0.6rem",
    backdropFilter: "blur(4px)",
    fontSize: "0.8rem",
    color: "#fff",
  };

  const btnStyle: React.CSSProperties = {
    padding: "0.2rem 0.55rem",
    background: "#eab308",
    color: "#000",
    fontWeight: 700,
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.7rem",
  };

  if (!lobbyId) {
    return (
      <div style={barStyle}>
        <button style={btnStyle} onClick={createLobby}>
          👁
        </button>
      </div>
    );
  }

  return (
    <div style={barStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexDirection: "column",
          fontSize: "0.6rem",
        }}
      >
        <span style={{ color: "#facc15", fontWeight: 700 }}>{lobbyId}</span>
        <button style={btnStyle} onClick={() => setShowQr((v) => !v)}>
          {showQr ? "✖" : "QR"}
        </button>
      </div>
      {showQr && (
        <div
          style={{
            background: "#fff",
            padding: "0.4rem",
            borderRadius: "0.4rem",
          }}
        >
          <QRCodeSVG value={url} size={140} />
        </div>
      )}
    </div>
  );
}

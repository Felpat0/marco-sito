import { getLobbyState, setLobbyState } from "@/lib/lobbyStore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const state = await getLobbyState(params.id);
  if (!state) {
    return NextResponse.json({ error: "Lobby non trovata" }, { status: 404 });
  }
  return NextResponse.json(state);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  await setLobbyState(params.id, body);
  return NextResponse.json({ ok: true });
}

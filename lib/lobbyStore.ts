/**
 * Lobby state store.
 * - Local dev (no env vars): in-memory Map
 * - Vercel: @upstash/redis via Upstash Redis integration
 *
 * On Vercel: add "Upstash Redis" from the Vercel Marketplace.
 * It sets KV_REST_API_URL and KV_REST_API_TOKEN automatically.
 * Redis.fromEnv() reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN,
 * so map them in your Vercel project env settings if needed, or use the
 * constructor directly with the KV_* vars (see below).
 */
import { Redis } from "@upstash/redis";

const mem = new Map<string, object>();
const TTL_SECONDS = 60 * 60 * 4; // 4 hours

// Support both Upstash-native env vars and Vercel KV env vars
function makeRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const redis = makeRedis();

export async function setLobbyState(id: string, state: object): Promise<void> {
  if (redis) {
    await redis.set(`lobby:${id}`, state, { ex: TTL_SECONDS });
  } else {
    mem.set(id, state);
  }
}

export async function getLobbyState(id: string): Promise<object | null> {
  if (redis) {
    return redis.get<object>(`lobby:${id}`);
  }
  return mem.get(id) ?? null;
}

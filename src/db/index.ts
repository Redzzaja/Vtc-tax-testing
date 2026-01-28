// src/db/index.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv"; // 1. Import dotenv

dotenv.config(); // 2. Load file .env sebelum koneksi dibuat
// Koneksi ke Neon
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

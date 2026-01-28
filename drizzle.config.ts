import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv"; // 1. Import dotenv

dotenv.config(); // 2. Load the environment variables

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Now this will have a value
  },
});

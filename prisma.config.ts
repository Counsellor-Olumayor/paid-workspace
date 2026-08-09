import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    // Point this to your direct database URL (used by Prisma CLI/Migrations)
    url: env("DIRECT_URL") || env("DATABASE_URL"),
  },
});
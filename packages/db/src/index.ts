import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly point to packages/db/.env so it loads correctly
// regardless of which app's working directory this module is executed from.
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    throw new Error("DATABASE_URL is not defined. Check packages/db/.env");
}

// Prisma v7 requires a driver adapter — the datasource URL can no longer
// be declared in schema.prisma and must be passed via the adapter.
const adapter = new PrismaPg({ connectionString: dbUrl });

export const prismaClient = new PrismaClient({ adapter });

import { PrismaClient } from "@prisma/client";
import { getLogger } from "../core/logging";

let prismaInstance: PrismaClient;

export async function initializeData() {
  const logger = getLogger();
  logger.info("🔁 Initializing connection to the database");

  try {
    logger.info(`Connecting to database: ${process.env.DATABASE_URL}`);

    // Prisma automatically connects to the database
    prismaInstance = new PrismaClient();

    logger.info("✅ Successfully initialized connection to the database");

    return prismaInstance;
  } catch (error: any) {
    logger.error(error.message, { error });
    throw new Error("Could not initialize the data layer");
  }
}

export async function shutdownData() {
  const logger = getLogger();

  logger.info("Shutting down database connection");

  await prismaInstance.$disconnect();

  logger.info("Database connection closed");
}

export function getPrisma(): PrismaClient {
  if (!prismaInstance)
    throw new Error(
      "Please initialize the data layer before getting the Prisma instance"
    );
  return prismaInstance;
}

module.exports = { initializeData, shutdownData, getPrisma };

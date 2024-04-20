import { PrismaClient } from '@prisma/client';
import { getLogger } from '../core/logging';

let prismaInstance: PrismaClient;

async function initializeData() {
  const logger = getLogger();
  logger.info('🔁 Initializing connection to the database');

  try {
    // Prisma automatically connects to the database
    prismaInstance = new PrismaClient();
    /* TODO dit werkt moet hier wel weg geraken
    const result = await prismaInstance.account.findFirst({
      where: {
        EMAIL: "admin@email.com"
      }
    });
    console.log(result);
    */

    logger.info('✅ Successfully initialized connection to the database');

    return prismaInstance;
  } catch (error: any) {
    logger.error(error.message, { error });
    throw new Error('Could not initialize the data layer');
  }
}

async function shutdownData() {
  const logger = getLogger();

  logger.info('Shutting down database connection');

  await prismaInstance.$disconnect();

  logger.info('Database connection closed');
}

function getPrisma(): PrismaClient {
  if (!prismaInstance)
    throw new Error(
      'Please initialize the data layer before getting the Prisma instance'
    );
  return prismaInstance;
};

module.exports = { initializeData, shutdownData, getPrisma };

import { PrismaClient } from "@prisma/client"
const { serializeProducts } = require('./serializeData');

const prisma = new PrismaClient();

const findAll = async () => {
  const results = await prisma.product.findMany();
  return serializeProducts(results);
}

module.exports = {
  findAll,
}
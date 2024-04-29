import { PrismaClient } from "@prisma/client";
import { serializeProducts } from "./serializeData";

const prisma = new PrismaClient();

export const findAll = async () => {
  const results = await prisma.product.findMany();
  return serializeProducts(results);
};

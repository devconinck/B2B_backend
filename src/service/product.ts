import * as productRepository from "../data/product";
import { serializeProducts } from "../data/serializeData";

export const getAllProducts = async () => {
  const items = serializeProducts(await productRepository.findAll());
  return {
    items,
    count: items.length,
  };
};

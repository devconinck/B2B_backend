import * as productRepository from "../data/product";

export const getAllProducts = async () => {
  const items = await productRepository.findAll();
  return {
    items,
    count: items.length,
  };
};

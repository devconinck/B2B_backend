const productRepository = require('../data/product');

const getAllProducts = async () => {
  const items = await productRepository.findAll();
  return {
    items,
    count: items.length,
  };
};

module.exports = { getAllProducts };
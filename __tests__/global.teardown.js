const { shutdownData, getPrisma } = require('../src/data');

module.exports = async () => {
  const prisma = getPrisma();
  try {
    // Remove any leftover data (but we use the prod db)
    /*
    await prisma.appointment.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.orderitem.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.tirecenter.deleteMany({});
    await prisma.user.deleteMany({});
    */
    await prisma.$disconnect();
    
    // Call any additional shutdown logic if necessary
    await shutdownData();
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
};

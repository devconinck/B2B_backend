const { shutdownData, getPrisma } = require('../src/data');

module.exports = async () => {
  const prisma = getPrisma();
  try {
    // Remove any leftover data
    await prisma.account.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.company_known_companies.deleteMany({});
    await prisma.company_paymentoptions.deleteMany({});
    await prisma.companyupdaterequest_newpaymentoptions.deleteMany({});
    await prisma.company_update_requests.deleteMany({});
    await prisma.notification.deleteMany({});
    await prisma.order_table.deleteMany({});
    await prisma.orderitem.deleteMany({});
    await prisma.company.deleteMany({});
    

    await prisma.$disconnect();
    
    // Call any additional shutdown logic if necessary
    await shutdownData();
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
};

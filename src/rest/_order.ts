
import Koa from 'koa'
import Router from '@koa/router';
import { PaymentStatus } from '../types/enums/PaymentStatus';
import { OrderStatus } from '../types/enums/OrderStatus';

const orderService = require('../service/order');

// Get all the cardio exercises in the database
const getAllOrders = async (ctx: Koa.ParameterizedContext) => {
    const {
      page,
      startDate,
      endDate,
      companyName,
      minAmount,
      maxAmount,
      orderReference,
      orderStatus,
      paymentStatus,
      orderId,
    } = ctx.query;
  
    const orders = await orderService.getAll({
      page: page ? parseInt(page as string, 10) : undefined,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      companyName: companyName as string,
      minAmount: minAmount ? parseInt(minAmount as string, 10) : undefined,
      maxAmount: maxAmount ? parseInt(maxAmount as string, 10) : undefined,
      orderReference: orderReference as string,
      orderStatus: orderStatus !== undefined ? OrderStatus[orderStatus as keyof typeof OrderStatus] : undefined,
      paymentStatus: paymentStatus !== undefined ? PaymentStatus[paymentStatus as keyof typeof PaymentStatus] : undefined,
      orderId: orderId ? parseInt(orderId as string, 10) : undefined,
    });
  
    ctx.body = JSON.stringify(orders, (key, value) => typeof value === 'bigint' ? value.toString() : value);
  };



export default function installHealthRouter(app: Router) {
    const router = new Router({
        prefix: '/orders',
    });

    router.get('/', getAllOrders);

    app
        .use(router.routes())
        .use(router.allowedMethods());
};


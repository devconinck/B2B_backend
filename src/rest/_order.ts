
import Koa from 'koa'
import Router from '@koa/router';
import { PaymentStatus } from '../types/enums/PaymentStatus';
import { OrderStatus } from '../types/enums/OrderStatus';
import {requireAuthentication} from '../core/auth';

const orderService = require('../service/order');

// Get all the cardio exercises in the database
const getAllOrders = async (ctx: Koa.ParameterizedContext) => {
    console.log(ctx)
    const { userId, companyId } = ctx.state.session;

    const {
      page,
      papgeAmount,
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
      userId,
      companyId,
      page: page ? parseInt(page as string, 10) : undefined,
      papgeAmount: papgeAmount ? parseInt(page as string, 10) : undefined,
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



export default function installOrderRouter(app: Router) {
    const router = new Router({
        prefix: '/orders',
    });

    // Authenticatie toevoegen
    router.get('/', requireAuthentication, getAllOrders);

    app
        .use(router.routes())
        .use(router.allowedMethods());
};


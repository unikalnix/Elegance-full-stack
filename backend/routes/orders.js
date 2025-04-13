import express from 'express';
import { listOrder, listOrders, makeOrder } from '../controllers/orders.js';
import userAuth from '../middlewares/userAuth.js';

const orderRouter = express.Router();

orderRouter.get('/orders', userAuth, listOrders);
orderRouter.get('/orders/:id', userAuth,listOrder);
orderRouter.post('/orders/checkout', userAuth, makeOrder);

export default orderRouter;
import express from 'express';
import { listProduct, listProducts } from '../controllers/products.js';

const productsRouter = express.Router();

productsRouter.get('/products', listProducts);
productsRouter.get('/products/:id', listProduct);

export default productsRouter;
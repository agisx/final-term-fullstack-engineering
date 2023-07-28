
import express from 'express';
const router = express.Router();

// products
import ProductsController from '../controllers/api/productsController.js';
const productsController = new ProductsController();

export default router;
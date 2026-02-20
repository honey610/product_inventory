import Router from 'express';
import {createProduct,getProducts,updateProduct,deleteProduct} from '../controllers/product.controller.js';
import { requireRole } from '../middleware/requireRole.js';
import { protect } from '../middleware/protect.middleware.js';
import upload from '../middleware/upload.js';

const router=Router();


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product (ADMIN only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/',protect,requireRole("ADMIN"),upload.single("image"),createProduct);
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/',protect,getProducts);
router.put('/:id',protect,requireRole("ADMIN"),upload.single("image"),updateProduct);
router.delete('/:id',protect,requireRole("ADMIN"),deleteProduct);

export default router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - image
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         stock:
 *           type: number
 *         category:
 *           type: string
 */
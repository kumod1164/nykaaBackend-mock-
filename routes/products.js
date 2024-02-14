const express = require('express');
const { check } = require('express-validator');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

router.post(
  '/products',
  [
    authMiddleware.authenticate,
    check('name', 'Product name is required').not().isEmpty(),
    check('picture', 'Invalid URL format for picture').optional().isURL(),
    check('description', 'Product description is required').not().isEmpty(),
    check('gender', 'Invalid gender').optional().isIn(['male', 'female']),
    check('category', 'Invalid category').optional().isIn(['makeup', 'skincare', 'haircare']),
    check('price', 'Product price is required').isNumeric(),
  ],
  productController.addProduct
);

router.put(
  '/products/:id',
  [
    authMiddleware.authenticate,
    check('name', 'Product name is required').not().isEmpty(),
    check('picture', 'Invalid URL format for picture').optional().isURL(),
    check('description', 'Product description is required').not().isEmpty(),
    check('gender', 'Invalid gender').optional().isIn(['male', 'female']),
    check('category', 'Invalid category').optional().isIn(['makeup', 'skincare', 'haircare']),
    check('price', 'Product price is required').isNumeric(),
  ],
  productController.updateProduct
);

router.delete('/products/:id', authMiddleware.authenticate, productController.deleteProduct);

module.exports = router;

const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('avatar', 'Invalid URL format for avatar').optional().isURL(),
    check('email', 'Invalid email format').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Invalid email format').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  authController.login
);

module.exports = router;

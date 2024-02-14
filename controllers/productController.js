const { validationResult } = require('express-validator');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, picture, description, gender, category, price } = req.body;

    const newProduct = new Product({
      name,
      picture,
      description,
      gender,
      category,
      price,
    });

    await newProduct.save();

    res.status(201).json({ msg: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, picture, description, gender, category, price } = req.body;

    const updatedProduct = {
      name,
      picture,
      description,
      gender,
      category,
      price,
    };

    const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(204).json({ msg: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(202).json({ msg: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const express = require("express");
const { createProduct, featchAllProducts, featchProductById, updateProduct } = require("../controller/Product.controller");

const router = express.Router();
// /products is  already added in base path
router
.post("/", createProduct)
.get("/", featchAllProducts)
.get('/:id',featchProductById)
.patch('/:id',updateProduct);

exports.router = router;

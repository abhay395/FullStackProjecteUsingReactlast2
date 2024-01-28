const express = require("express");
const { addToCart, featchCartProductByUserId, updateCart, deleteProductformCart } = require("../controller/Cart.controller");

const router = express.Router();
// /products is  already added in base path
router
.post("/", addToCart)
.get("/", featchCartProductByUserId)
.patch('/:id',updateCart)
.delete('/:id',deleteProductformCart)

exports.router = router;

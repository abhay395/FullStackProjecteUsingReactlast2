const express = require("express");
const { createOrder, featchOrderByUserId, featchAllOrder, updateOrder } = require("../controller/Order.controller");

const router = express.Router();
// /user is  already added in base path
router
.post('/',createOrder)
.get('/',featchOrderByUserId)
.get('/all',featchAllOrder)
.patch('/:id',updateOrder)
// .patch('/:id',updateUser);

exports.router = router;

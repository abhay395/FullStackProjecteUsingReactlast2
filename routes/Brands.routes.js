const express = require("express");
const { featchBrands, createBrand } = require("../controller/Brand.controller");

const router = express.Router();
// /products is  already added in base path
router.get("/", featchBrands).post('/',createBrand);

exports.router = router;

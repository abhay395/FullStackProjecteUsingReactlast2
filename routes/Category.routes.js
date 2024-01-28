const express = require("express");
const { featchCategory, createCategory } = require("../controller/Category.controller");

const router = express.Router();
// /products is  already added in base path
router.get("/", featchCategory).post('/',createCategory);

exports.router = router;

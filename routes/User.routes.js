const express = require("express");
const { createUser, featchUserById, updateUser } = require("../controller/User.controller");

const router = express.Router();
// /user is  already added in base path
router
.get('/own',featchUserById)
.patch('/',updateUser);

exports.router = router;

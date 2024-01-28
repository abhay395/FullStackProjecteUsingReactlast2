const express = require("express");
const { createUser, loginUser, checkAuth } = require("../controller/Auth.controller");
const passport = require('passport');

const router = express.Router();

// /auth is already added in the base path
router
  .post('/signup', createUser)
  .post('/login',passport.authenticate('local'), loginUser)
  .get('/check',passport.authenticate('jwt'), checkAuth)

exports.router = router;

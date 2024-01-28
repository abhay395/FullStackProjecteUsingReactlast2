const express = require("express");
require('dotenv').config()
const server = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const session = require("express-session");
const cors = require("cors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser') 
const path = require('path')

const productsRouters = require("./routes/Product.routes");
const brandRouters = require("./routes/Brands.routes");
const categoryRouters = require("./routes/Category.routes");
const userRouters = require("./routes/User.routes");
const authRouter = require("./routes/Auth.routes");
const cartRouter = require("./routes/Cart.routes");
const orderRouter = require("./routes/Order.routes");
const { isAuth, senitizeUser, cookieExtractor } = require("./services/comman");
const { User } = require("./model/User.models");
const exp = require("constants");


// JWT option

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY; // TODO :should not be in code
// Middleware
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(express.json()); // to parse req.body
server.use(cookieParser())

server.use(express.static(path.resolve(__dirname,'build')))

// Session configuration
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);


// Passport configuration
server.use(passport.session());
server.use(passport.initialize());

// Passport Strategies
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: "Incorrect password." });
            }
            const token = jwt.sign(senitizeUser(user), process.env.JWT_SECRET_KEY);

            return done(null, {token});
          }
        );
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    console.log({ jwt_payload });
   const user  =  await User.findById(jwt_payload.id)
   if (user) {
    return done(null, senitizeUser(user));
  } else {
    return done(null, false);
  }
  
  } catch (error) {
    return done(error,false)
  }
  })
);

passport.serializeUser(function (user, done) {
  console.log("serialize", user);
  done(null, user);
});

passport.deserializeUser(async function (users, done) {
  try {
    // // console.log("deserializeUser", users);
    // const user = await User.findById(users.id);
    // // console.log(user)
    done(null, users);
  } catch (error) {
    done(error);
  }
});

// Routes
server.use("/products", isAuth(), productsRouters.router);
server.use("/brands", isAuth(),brandRouters.router);
server.use("/categorys",isAuth() ,categoryRouters.router);
server.use("/users", isAuth() ,userRouters.router);
server.use("/auth",authRouter.router);
server.use("/cart", isAuth(),cartRouter.router);
server.use("/orders", isAuth(),orderRouter.router);

// Database connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONOGODB_URL);
  console.log("Database connected");
}

// Default route

// Server start
server.listen(process.env.PORT, () => {
  console.log("Server started on port 8080");
});

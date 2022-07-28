const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const habitRouter = require("./controllers/habits");

//start express app
const app = express();

// Global Middlewares
app.use(cors({ origin: "https://subtle-biscuit-10204a.netlify.app", credentials: true }));

//serve static files
app.use(express.static('client'))

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  //allows for 100 requests per hour.
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/", limiter); // check what name all routes begin with. And addapt the /api/ to the route.

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

//Data sanitisation against NoSQL query injections
app.use(mongoSanitize());

//Data sanitisation against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use("/users", userRouter);
app.use("/habits", habitRouter);

module.exports = app;

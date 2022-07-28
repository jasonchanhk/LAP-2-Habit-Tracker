const mongoose = require("mongoose");

// const dotenv = require("dotenv");

// dotenv.config({ path: "./config.env" });

require('dotenv').config()

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//Mongoose is a mongoDB Driver that allows our Node code to access and interact with a MongoDB database.

mongoose
  // the below connection method will return a promise.
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  // the below .then method will run when the promise is resolved.
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

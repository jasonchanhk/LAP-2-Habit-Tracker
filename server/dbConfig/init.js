const mongoose = require('mongoose');

const mongoUrl =
  'mongodb+srv://sam:sam@cluster0.py3it.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => console.log(e));

module.exports = mongoose;

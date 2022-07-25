const app = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const mongoUrl = `mongodb+srv://sam:sam@cluster0.py3it.mongodb.net/habit_tracker?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.listen(port, () => console.log(`Express just departed from port ${port}!`));

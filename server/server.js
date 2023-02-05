// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const usersRouter = require('./router');

const PORT = process.env.PORT || 5001

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', usersRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Error has occured')
})

app.use(function (req, res, next) {
  res.status(404).send('Error has occured 404')
})

app.listen(PORT, function () {
  console.log(`Server is running on:${PORT}`)
})
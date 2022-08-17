const express = require('express');
const morgan = require('morgan');

const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes =require('./router');
app.use('/api', routes)

app.get('/', function (req, res) {
  res.send('Hello World')
})


module.exports = app;




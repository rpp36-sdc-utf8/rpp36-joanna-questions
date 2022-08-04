const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(2010,() => console.log("Listening at port 2010"))


module.exports = app;
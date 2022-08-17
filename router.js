const express = require('express');
const router = express.Router();
const{Photos, Answers, Questions} =require('./db.js')


router.get('/getAll', (req, res) => {
  res.send('Get All API')
})

module.exports = router
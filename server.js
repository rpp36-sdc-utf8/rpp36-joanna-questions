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


//GET /qa/questions/:question_id/answers
//page cpunt
// app.get('/answers/:qId', (req, res) => {
//   apiReq({
//     url: `${BASEURL}/qa/questions/${req.params.qId}/answers`,
//     headers: options.headers,
//     params: req.query
//   }, (err, data) => {
//     err ? res.sendStatus(500) : res.json(data);
//   });
// })//
// //app.get('/questions', (req, res) => {
//   apiReq({
//     url: `${BASEURL}/qa/questions`,
//     headers: options.headers,
//     params: req.query
//   }, (err, data) => {
//     err ? res.sendStatus(500) : res.json(data);
//   });
// });

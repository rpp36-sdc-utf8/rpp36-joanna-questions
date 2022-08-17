const express = require('express');
const router = express.Router();
const{Photos, Answers, Questions} =require('./db.js')

router.get('/qa/questions',(req,res)=>{
  res.send('Get all questions')

})
router.get('/qa/questions/:question_id/answers', (req, res) => {
  var question_id = req.params.question_id;
  var page = req.query.page ||1;
  var count = req.query.count ||5;


  Answers.find({question_id:question_id})
  .skip((page-1)*count)
  .limit(count)
  .then((results)=>{res.json(results);console.log('success inside get answers')})
  .catch(err=>res.status(500).send('err inside get answers'))


})


//GET /qa/questions/:question_id/answers
//page count question_id
// app.get('/answers/:qId', (req, res) => {
//   apiReq({
//     url: `${BASEURL}/qa/questions/${req.params.qId}/answers`,
//     headers: options.headers,
//     params: req.query
//   }, (err, data) => {
//     err ? res.sendStatus(500) : res.json(data);
//   });
// })//product_id page count
// //app.get('/questions', (req, res) => {
//   apiReq({
//     url: `${BASEURL}/qa/questions`,
//     headers: options.headers,
//     params: req.query
//   }, (err, data) => {
//     err ? res.sendStatus(500) : res.json(data);
//   });
// });

module.exports = router
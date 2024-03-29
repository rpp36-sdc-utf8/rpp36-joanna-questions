const express = require('express');
const router = express.Router();
const{Photos, Answers, Questions} =require('./db.js')

router.get('/qa/questions',(req,res)=>{
  var product_id =req.query.product_id;
  var page =parseInt(req.query.page) || 1;
  var count = parseInt(req.query.count)|| 5;
  console.log('count'+count)
  Questions
  .aggregate([
    {
      '$match': {
        'product_id':parseInt(product_id)
      }
    }, {
      '$skip': (page-1)*count
    }, {
      '$limit': count
    }, {
      '$lookup': {
        'from': 'answers',
        'localField': 'id',
        'foreignField': 'question_id',
        'as': 'answers'
      }
    }, {
      '$project': {
        '_id': 0,
        'question_id': 1,
        'product_id': 1,
        'question_date': 1,
        'question_body':"$body",
        'asker_name': 1,
        'reported': 1,
        'question_helpfulness': 1,
        'answers': {
          '$arrayToObject': {
            '$map': {
              'input': '$answers',
              'in': {
                'k': {
                  '$ifNull': [
                    {
                      '$toString': '$$this.id'
                    }, 'replacement-id'
                  ]
                },
                'v': '$$this'
              }
            }
          }
        }
      }
    }
  ])
  .then(results=>{
    console.log('results1'+results)
    var data ={};
    var arr =[];
    data.product_id = results[0].product_id;
    data.results=arr;
    results.forEach(result=>{
      console.log('result'+result.question_date)
      var photoArr =[]
      result.question_date = new Date(parseInt(result.question_date))
      for(var key in result.answers){
        console.log('key'+key)
        console.log('resultkey'+result.answers[key].date)

            result.answers[key].date = new Date(parseInt(result.answers[key].date))

          if(result.answers[key].photos.length>0){
            result.answers[key].photos.forEach((file)=>{
              photoArr.push(file.url)
            })
            result.answers[key].photos=photoArr;
          }

      }

      arr.push(result)
      console.log('arr'+arr)
    })

    console.log('succes inside questions '+data),res.json(data)})
  .catch(err=>res.status(500).send('err inside get questions'))



})
router.get('/qa/questions/:qId/answers', (req, res) => {
  var question_id = req.params.qId;
  var page = parseInt(req.query.page )||1;
  var count = parseInt(req.query.count) ||5;
  // console.log('question id in answers'+page)

  Answers
    .aggregate([
      {
      '$match': {
        'question_id': parseInt(question_id)
      }
      }, {
      '$skip': (page-1)*count
      }, {
      '$limit':count
      },
      {
        '$project': {
            'answer_id': 1,
            'question_id':1,
            'body': 1,
            'answerer_name': 1,
            'helpfulness': 1,
            'photos': 1,
            'date': 1,
        }
    }
    ])
    .then((results)=>{

      var data ={};
      data.questions= results[0].question_id
      var arr=[];
    if(results.length>0){
        results.forEach((result=>{
        result.date = new Date(parseInt(result.date));

        arr.push(result)
    }))

    }
      data.results =arr
      console.log('success inside get answers ')
      res.json(data)})
    .catch(err=>res.status(500).send('err inside get answers'))
})




router.put('/qa/questions/:question_id/report',(req,res)=>{
  var question_id = parseInt(req.params.question_id);
  console.log('questions report'+typeof(question_id))
  Questions.aggregate([
    {
      '$match': {
        'id': question_id
      }
    }, {
      '$set': {
        'reported': {
          '$eq': [
            false, '$reported'
          ]
        }
      }
    }, {
      '$merge': {
        'into': 'questions',
        'on': '_id',
        'whenMatched': 'replace'
      }
    }
  ])
  .then((result)=>{res.status(204).send();console.log('success reported questions')})
  .catch((err)=>{res.status(500).send('err inside report questions');console.log(err)})

})
router.put('/qa/answers/:answer_id/report',(req,res)=>{
  var answer_id = parseInt(req.params.answer_id);
  console.log('questions report'+typeof(answer_id))
  Answers.aggregate([
    {
      '$match': {
        'id': answer_id
      }
    }, {
      '$set': {
        'reported': {
          '$eq': [
            false, '$reported'
          ]
        }
      }
    }, {
      '$merge': {
        'into': 'answers',
        'on': '_id',
        'whenMatched': 'replace'
      }
    }
  ])
  .then((result)=>{res.status(204).send();console.log('success reported answers')})
  .catch((err)=>{res.status(500).send('err inside report answers');console.log(err)})

})

router.put('/qa/answers/:answer_id/helpful',async(req,res)=>{
  var answer_id = parseInt(req.params.answer_id);
  console.log('questions report'+answer_id);
  try{
    await Answers.updateOne({id:answer_id},{$inc:{helpfulness:1}})
    res.status(204).send();console.log('success helpful answer')

  }catch(err){
    res.status(500).send('err inside helpful exec answers');console.log(err)
  }
  

})
router.put('/qa/questions/:question_id/helpful',(req,res)=>{
  var question_id = parseInt(req.params.question_id);
  console.log('questions report'+question_id);
  Questions.updateOne({id:question_id},{$inc:{question_helpfulness:1}})
  .then(()=>{res.status(204).send();console.log('success helpful questions')})
  .catch((err)=>{
    res.status(500).send('err inside helpful exec question');console.log(err)
  })

})
router.post('/qa/questions',(req,res)=>{
  var body= req.body.body;
  var asker_name = req.body.name;
  var asker_email =req.body.email;
  var product_id = parseInt(req.body.product_id);


  Questions.create({product_id:product_id,body:body,
    asker_email:asker_email,asker_name:asker_name, question_date: new Date().getTime()})
    .then(()=>{
      res.status(201).send()
    })
    .catch((err)=>{
      res.status(500).send('err post a question');console.log(err)
    })


})


router.post('/qa/questions/:question_id/answers',async(req,res)=>{
  var body= req.body.body;
  var answerer_name = req.body.name;
  var answerer_email =req.body.email;
  var photos=req.body.photos;
  var question_id = parseInt(req.params.question_id);


  try{

    if (photos.length===0){
      Answers.create({
        question_id:question_id,body:body,
        answerer_email:answerer_email,answerer_name:answerer_name,photos:photos, date: new Date().getTime()},function (err, result) {
          if (err) {
            res.status(500).send('err post a question');console.log(err)

          }else{
            console.log('success post answer without photos');
            res.status(201).send()
          }

        })
    }else{
    
      Answers.create({question_id:question_id,body:body,
        answerer_email:answerer_email,answerer_name:answerer_name,photos:photos, date: new Date().getTime()},function (err, result) {
          if (err) {
          res.status(500).send('err post a question');console.log(err)

          }else{
          console.log('success post answer with photos');
          res.status(201).send()
          }

        })




  }} catch(err){
    res.status(500).send()
    console.log(err)


  }
})

module.exports = router





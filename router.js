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

  // res.send('Get all questions')

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
  // Answers.updateOne({id:answer_id},{$inc:{'answers.helpful':1}})
  // .exec((err,result)=>{
  //   if(err){
  //     res.status(500).send('err inside helpful exec answers');console.log(err)
  //   }else{
  //     res.status(204).send();console.log('success helpful questions')
  //   }
  // })

// put question helpful

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
    //   var answerResult = await Answers.find({}).sort({answer_id:-1}).limit(1).exec()
    //   var answer_id = answerResult[0].answer_id+1
    //   // console.log('answer_id'+answer_id)
    //   var photosResult = await Photos.find({}).sort({id:-1}).limit(1).exec()
    //   var photoId = photosResult[0].id+1
    //   // console.log('photoId'+ photoId)
    //   photos = photos.map((photo) => {
    //     photoId = photoId+1
    //     // console.log('photoID'+photoId)
    //     return {
    //     url: photo,
    //     id:photoId,
    //     answer_id:answer_id
    //   };
    // })
    //   var photoData = await Photos.insertMany(photos)
    //   console.log(photoData)
    //   photoData = photoData.map((photo) => {
    //     return {
    //     url: photo.url,
    //     id:photo.id
    //   };
    // })

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




// [
//   {
//     '$project': {
//       '_id': 1,
//       'id': 1,
//       'product_id': 1,
//       'body': 1,
//       'question_date': '$date_written',
//       'asker_email': 1,
//       'asker_name': 1,
//       'reported': 1,
//       'question_helpfulness': 1
//     }
//   }, {
//     '$merge': {
//       'into': 'questions',
//       'on': '_id',
//       'whenMatched': 'replace'
//     }
//   }
// ]

// {
//   "_id": {
//     "$oid": "62fb3a95167367696a233de1"
//   },
//   "id": 2,
//   "product_id": 1,
//   "body": "HEY THIS IS A WEIRD QUESTION!!!!?",
//   "asker_name": "jbilas",
//   "asker_email": "first.last@gmail.com",
//   "reported": true,
//   "question_helpfulness": 4,
//   "question_date": "1613888219613"
// }
//{
//   "_id": {
//     "$oid": "62fb3b13167367696a3e673a"
//   },
//   "id": 1780059,
//   "product_id": 506121,
//   "body": "Illo enim quae enim voluptates explicabo sit nemo.",
//   "date_written": "1614580519007",
//   "asker_name": "Lucienne_Ernser",
//   "asker_email": "Candido5@yahoo.com",
//   "reported": true,
//   "question_helpfulness": 28
// }
// //{
//   "_id": {
//     "$oid": "62fdd80e7aa3d2308c401977"
//   },
//   "id": 3476787,
//   "question_id": 1780060,
//   "body": "Vel nihil maxime eligendi et voluptate.",
//   "date_written": 1617933132000,
//   "answerer_name": "Delaney41",
//   "answerer_email": "Seller",
//   "reported": false,
//   "helpful": 13
// }

// //{
//   "_id": {
//     "$oid": "63102e478a07b61cd8c162c6"
//   },
//   "id": 6879308,
//   "body": "hellotestbody",
//   "date": 1662004807114,
//   "question_id": 1,
//   "answerer_name": "helltestame",
//   "answerer_email": "testemail@gmail.com",
//   "helpfulness": 0,
//   "reported": false,
//   "photos": [
//     {
//       "id": 2063761,
//       "url": "http:2313",
//       "_id": {
//         "$oid": "63102e478a07b61cd8c162c7"
//       }
//     },
//     {
//       "id": 2063762,
//       "url": "http:5532",
//       "_id": {
//         "$oid": "63102e478a07b61cd8c162c8"
//       }
//     }
//   ],
//   "__v": 0
// }

// [
//   {
//     '$lookup': {
//       'from': 'photos',
//       'localField': 'id',
//       'foreignField': 'answer_id',
//       'as': 'photos'
//     }
//   }, {
//     '$project': {
//       'photos': {
//         'answer_id': 0
//       }
//     }
//   }, {
//     '$merge': {
//       'into': 'answers',
//       'on': '_id',
//       'whenMatched': 'replace'
//     }
//   }
// ]
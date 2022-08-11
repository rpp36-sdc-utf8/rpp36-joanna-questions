//http://localhost:3000/questions?product_id=71701&page=1&count=2&search=
//id,product_id,body,date_written,asker_name,asker_email,reported,helpful
//1,1,"What fabric is the top made of?",1595884714409,"yankeelover","first.last@gmail.com",0,1
var questions= {
  "product_id": "71701",
  "results": [
      {
          "question_id": 631404,
          "question_body": "What fabric is the top made of?",
          "question_date": "2018-06-17T00:00:00.000Z",
          "asker_name": "funnygirl",
          "question_helpfulness": 37,
          "reported": false,
          "answers": {
              "5897206": {
                  "id": 5897206,
                  "body": "Suede",
                  "date": "2018-01-17T00:00:00.000Z",
                  "answerer_name": "sillyguy",
                  "helpfulness": 7,
                  "photos": []
              },
              "5986040": {
                  "id": 5986040,
                  "body": "test answer",
                  "date": "2022-06-11T00:00:00.000Z",
                  "answerer_name": "Jon",
                  "helpfulness": 2,
                  "photos": [
                      "https://ik.imagekit.io/hjgl70u0q/5897206-image1.png"
                  ]
              },
              "5987038": {
                  "id": 5987038,
                  "body": "test",
                  "date": "2022-07-22T00:00:00.000Z",
                  "answerer_name": "Seller",
                  "helpfulness": 1,
                  "photos": []
              },
              "5987268": {
                  "id": 5987268,
                  "body": "test answer",
                  "date": "2022-07-26T00:00:00.000Z",
                  "answerer_name": "pw123",
                  "helpfulness": 3,
                  "photos": [
                      "https://image.shutterstock.com/image-photo/high-fashion-young-beautiful-woman-260nw-1325789024.jpg",
                      "https://image.shutterstock.com/image-illustration/3d-render-grab-bars-ladder-260nw-1422200768.jpg"
                  ]
              },
              "5987346": {
                  "id": 5987346,
                  "body": "test answer",
                  "date": "2022-07-30T00:00:00.000Z",
                  "answerer_name": "pw123",
                  "helpfulness": 2,
                  "photos": []
              }
          }
      }
  ]
}
//http://localhost:3000/answers/631404?page=1&count=2
// GET  question_id page(1) and count(5)
//id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
//1,36,"Supposedly suede, but I think its synthetic",1599958385988,"sillyguy","first.last@gmail.com",0,1


//photos id,answer_id,url
//1,5,"https://images.unsplas.."
var answers={
  "question": "631404",
  "page": "1",
  "count": "2",
  "results": [
      {
          "answer_id": 5897206,
          "body": "Suede",
          "date": "2018-01-17T00:00:00.000Z",
          "answerer_name": "sillyguy",
          "helpfulness": 7,
          "photos": []
      },
      {
          "answer_id": 5987268,
          "body": "test answer",
          "date": "2022-07-26T00:00:00.000Z",
          "answerer_name": "pw123",
          "helpfulness": 3,
          "photos": [
              {
                  "id": 5341646,
                  "url": "https://image.shutterstock.com/image-photo/high-fashion-young-beautiful-woman-260nw-1325789024.jpg"
              },
              {
                  "id": 5341647,
                  "url": "https://image.shutterstock.com/image-illustration/3d-render-grab-bars-ladder-260nw-1422200768.jpg"
              }
          ]
      }
  ]
}
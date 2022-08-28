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

var results=
{
    "product_id": 1,
    "results": [
        {
            "product_id": 1,
            "body": "What fabric is the top made of?",
            "date_written": "1595884714409",
            "asker_name": "yankeelover",
            "reported": false,
            "question_id": 1,
            "question_helpfulness": 1,
            "answers": {
                "5": {
                    "_id": "62fdd7247aa3d2308c0b0c49",
                    "id": 5,
                    "question_id": 1,
                    "body": "Something pretty soft but I can't be sure",
                    "date_written": 1599990560555,
                    "answerer_name": "metslover",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 5,
                    "photos": [
                        {
                            "id": 1,
                            "url": "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
                        },
                        {
                            "id": 2,
                            "url": "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                        },
                        {
                            "id": 3,
                            "url": "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
                        }
                    ]
                },
                "7": {
                    "_id": "62fdd7247aa3d2308c0b0c4b",
                    "id": 7,
                    "question_id": 1,
                    "body": "Its the best! Seriously magic fabric",
                    "date_written": 1614451524662,
                    "answerer_name": "metslover",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 7,
                    "photos": []
                },
                "8": {
                    "_id": "62fdd7247aa3d2308c0b0c4c",
                    "id": 8,
                    "question_id": 1,
                    "body": "DONT BUY IT! It's bad for the environment",
                    "date_written": 1600552162548,
                    "answerer_name": "metslover",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 8,
                    "photos": []
                },
                "57": {
                    "_id": "62fdd7247aa3d2308c0b0c7d",
                    "id": 57,
                    "question_id": 1,
                    "body": "Suede",
                    "date_written": 1618159891495,
                    "answerer_name": "metslover",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 7,
                    "photos": []
                },
                "95": {
                    "_id": "62fdd7247aa3d2308c0b0ca3",
                    "id": 95,
                    "question_id": 1,
                    "body": "Supposedly suede, but I think its synthetic",
                    "date_written": 1600120432219,
                    "answerer_name": "metslover",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 3,
                    "photos": []
                }
            },
            "question_date": null
        },
        {
            "product_id": 1,
            "body": "HEY THIS IS A WEIRD QUESTION!!!!?",
            "date_written": "1613888219613",
            "asker_name": "jbilas",
            "reported": true,
            "question_id": 2,
            "question_helpfulness": 4,
            "answers": {
                "30": {
                    "_id": "62fdd7247aa3d2308c0b0c62",
                    "id": 30,
                    "question_id": 2,
                    "body": "Its a rubber sole",
                    "date_written": 1616293796317,
                    "answerer_name": "dschulman",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 2,
                    "photos": [
                        {
                            "id": 13,
                            "url": "https://images.unsplash.com/photo-1528318269466-69d920af5dad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                        }
                    ]
                },
                "75": {
                    "_id": "62fdd7247aa3d2308c0b0c8f",
                    "id": 75,
                    "question_id": 2,
                    "body": "The rubber on the bottom wears thin quickly",
                    "date_written": 1588644950162,
                    "answerer_name": "dschulman",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 2,
                    "photos": []
                },
                "84": {
                    "_id": "62fdd7247aa3d2308c0b0c98",
                    "id": 84,
                    "question_id": 2,
                    "body": "Rubber",
                    "date_written": 1615868276652,
                    "answerer_name": "dschulman",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 3,
                    "photos": []
                },
                "102": {
                    "_id": "62fdd7247aa3d2308c0b0caa",
                    "id": 102,
                    "question_id": 2,
                    "body": "Some kind of recycled rubber, works great!",
                    "date_written": 1601001012339,
                    "answerer_name": "dschulman",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 6,
                    "photos": []
                }
            },
            "question_date": null
        },
        {
            "product_id": 1,
            "body": "Does this product run big or small?",
            "date_written": "1608535907083",
            "asker_name": "jbilas",
            "reported": false,
            "question_id": 3,
            "question_helpfulness": 8,
            "answers": {},
            "question_date": null
        },
        {
            "product_id": 1,
            "body": "How long does it last?",
            "date_written": "1594341317010",
            "asker_name": "funnygirl",
            "reported": false,
            "question_id": 4,
            "question_helpfulness": 6,
            "answers": {
                "65": {
                    "_id": "62fdd7247aa3d2308c0b0c85",
                    "id": 65,
                    "question_id": 4,
                    "body": "It runs small",
                    "date_written": 1605784307205,
                    "answerer_name": "dschulman",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 1,
                    "photos": [
                        {
                            "id": 14,
                            "url": "https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                        },
                        {
                            "id": 15,
                            "url": "https://images.unsplash.com/photo-1536922645426-5d658ab49b81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                        }
                    ]
                },
                "89": {
                    "_id": "62fdd7247aa3d2308c0b0c9d",
                    "id": 89,
                    "question_id": 4,
                    "body": "Showing no wear after a few months!",
                    "date_written": 1599089609530,
                    "answerer_name": "sillyguy",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 8,
                    "photos": []
                }
            },
            "question_date": null
        },
        {
            "product_id": 1,
            "body": "Can I wash it?",
            "date_written": "1608855284662",
            "asker_name": "cleopatra",
            "reported": false,
            "question_id": 5,
            "question_helpfulness": 7,
            "answers": {
                "46": {
                    "_id": "62fdd7247aa3d2308c0b0c72",
                    "id": 46,
                    "question_id": 5,
                    "body": "I've thrown it in the wash and it seems fine",
                    "date_written": 1606022843272,
                    "answerer_name": "marcanthony",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 8,
                    "photos": []
                },
                "64": {
                    "_id": "62fdd7247aa3d2308c0b0c84",
                    "id": 64,
                    "question_id": 5,
                    "body": "It says not to",
                    "date_written": 1588644950162,
                    "answerer_name": "ceasar",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 0,
                    "photos": []
                },
                "92": {
                    "_id": "62fdd7247aa3d2308c0b0ca0",
                    "id": 92,
                    "question_id": 5,
                    "body": "Haha, are you serious?",
                    "date_written": 1600330331162,
                    "answerer_name": "ceasar",
                    "answerer_email": "first.last@gmail.com",
                    "reported": true,
                    "helpful": 0,
                    "photos": []
                },
                "96": {
                    "_id": "62fdd7247aa3d2308c0b0ca4",
                    "id": 96,
                    "question_id": 5,
                    "body": "I wouldn't machine wash it",
                    "date_written": 1590584621205,
                    "answerer_name": "ceasar",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 0,
                    "photos": []
                },
                "101": {
                    "_id": "62fdd7247aa3d2308c0b0ca9",
                    "id": 101,
                    "question_id": 5,
                    "body": "Only if you want to ruin it!",
                    "date_written": 1590584621205,
                    "answerer_name": "ceasar",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 5,
                    "photos": []
                },
                "107": {
                    "_id": "62fdd7247aa3d2308c0b0caf",
                    "id": 107,
                    "question_id": 5,
                    "body": "Yes",
                    "date_written": 1610527646863,
                    "answerer_name": "Seller",
                    "answerer_email": "first.last@gmail.com",
                    "reported": false,
                    "helpful": 4,
                    "photos": []
                }
            },
            "question_date": null
        }
    ]
}

// body: JSON.stringify({
//     product_id: productId,
//     body: question,
//     name: nickname,
//     email

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/sdc',{ useUnifiedTopology: true, useNewUrlParser: true });
}


const photosSchema = new mongoose.Schema({
  id:Number,
  answer_id:Number,
  url:String,
})
const answersSchema = new mongoose.Schema({
  id:Number,
  body:String,
  date:{type : Date, default: Date.now},
  question_id:Number,
  answerer_name:String,
  answerer_email:String,
  helpfulness:{type:Number,default:0},
  reported:{type: Boolean, default:false},
  photos:[],
})
const questionsSchema = new mongoose.Schema({
  product_id:Number,
  question_id:Number,
  question_body:String,
  question_date:{type : Date, default: Date.now},
  asker_name:String,
  asker_email:String,
  question_helpfulness:{type:Number,default:0},
  reported:{type: Boolean, default:false},
  answers:[answersSchema],


});
const Photos = mongoose.model("Photos",photosSchema);
const Answers = mongoose.model('Answers',answersSchema);
const Questions = mongoose.model('Questions',questionsSchema);

let selectAnswers =()=>Answers.findOne();

module.exports ={
  Photos,
  Answers,
  Questions

}
// const Kitten = mongoose.model('Kitten', kittySchema);
// const silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'


const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);



main().catch(err => console.log(err));
async function main() {
  // await mongoose.connect('mongodb://localhost:27017/sdc',{ useUnifiedTopology: true, useNewUrlParser: true });
  await mongoose.connect('mongodb://user:password@54.215.236.181/sdc',{ useUnifiedTopology: true, useNewUrlParser: true });
}


const photosSchema = new mongoose.Schema({
  id:{type: Number, unique: true},
  answer_id:Number,
  url:String,
})

photosSchema.plugin(AutoIncrement, {
  inc_field: 'id',start_seq:2063760
});
const Photos = mongoose.model("Photos",photosSchema);
const answersSchema = new mongoose.Schema({
  answer_id:{type: Number, unique: true},
  body:String,
  date:Number,
  question_id:Number,
  answerer_name:String,
  answerer_email:String,
  helpfulness:{type:Number,default:0},
  reported:{type: Boolean, default:false},
  photos:[photosSchema],
})

answersSchema.plugin(AutoIncrement, {
  inc_field: 'answer_id', start_seq: 6879307
});
const Answers = mongoose.model('Answers',answersSchema);
const questionsSchema = new mongoose.Schema({
  product_id:Number,
  question_id:{type: Number, unique: true},
  body:String,
  question_date:String,
  asker_name:String,
  asker_email:String,
  question_helpfulness:{type:Number,default:0},
  reported:{type: Boolean, default:false},
});

questionsSchema.plugin(AutoIncrement, {
  inc_field: 'question_id', start_seq: 3518964
});
const Questions = mongoose.model('Questions',questionsSchema);





module.exports ={
  Photos,
  Answers,
  Questions

}
// const Kitten = mongoose.model('Kitten', kittySchema);
// const silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'


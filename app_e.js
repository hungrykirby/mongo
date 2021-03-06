var mongoose = require('mongoose');

// 定義フェーズ
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name:  String,
  point: Number
});
mongoose.model('Evaluation', UserSchema);

// 使用フェーズ
mongoose.connect('mongodb://localhost/negativeDegrees4');
//mongoose.connect('mongodb://localhost/evaluation');

var User = mongoose.model('Evaluation');
var user = new User();
user.name  = 'KrdLab';
user.point = 777;
/*user.save(function(err) {
  if (err) { console.log(err); }
});*/

// ※注意：イベント駆動

User.find({}, function(err, docs) {
  if(!err) {
    console.log("num of item => " + docs.length)
    for (var i = 0; i < docs.length; i++ ) {
      console.log(docs[i]);
    }
    mongoose.disconnect()  // mongodbへの接続を切断
    process.exit()         // node.js終了
  } else {
    console.log("find error")
  }
});

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(process.env.PORT || 8000);
console.log('Server running');


var mongoose = require('mongoose');

// 定義フェーズ
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name:  String,
  point: Number
});
mongoose.model('User', UserSchema);

// 使用フェーズ
var db_uri = 'mongodb://localhost/negativeDegrees4' || process.env.MONGOLAB_URI;
db_uri = "mongodb://heroku_6cnq9nh9:nfp76sfae4a3e6c19gkolh0rlt@ds161038.mlab.com:61038/heroku_6cnq9nh9";
mongoose.connect(db_uri);
//mongoose.connect('mongodb://localhost/evaluation');

var User = mongoose.model('User');
var user = new User();
user.name  = 'KrdLab';
user.point = 777;
user.save(function(err) {
  if (err) { console.log(err); }
});

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

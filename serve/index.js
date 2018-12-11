const express=require('express');
const app=express();
const mysql=require('mysql');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser=require('body-parser');
var crypto=require('crypto');
var sendMail=require('./config/email');
var modifyPassword=require('./config/modifyPassword')

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

app.all('*', function(req, res, next) {   //允许跨域
  res.header("Access-Control-Allow-Origin", "http://10.21.40.155:8080");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Access-Control-Allow-Headers",' content-type');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({      //使用session
	secret : '12345',  
	name : 'verCode_sessionId',
	cookie : {maxAge : 1000*60*30}, //设置cookie最大时长
	resave : true,
	saveUninitialized: false
}));


var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})


app.post('/login',function(req,res){
  let addSql="SELECT * FROM  user WHERE user_name=?";
  let getData=[req.body.username];
  connection.query(addSql,getData,function(err,result){
    if(err){
      console.log(err)
      res.json({code:203,msg:err})
    }else{
      var hashPassword=crypto.createHash('md5').update(req.body.password).digest('hex');
      if(result.length===0){
        res.json({code:201,msg:'账号未注册'})
      }else{
        if(hashPassword!==result[0].user_password){
          res.json({code:202,msg:'密码错误'})
        }else{
          req.session.username=req.body.username;
          res.json({code:200,msg:'登录成功'})
        }
      }
    }
  })
})

app.post('/sendMail',sendMail);   //发送验证邮箱给用户
app.post('/modifyPassword',modifyPassword);   //修改密码
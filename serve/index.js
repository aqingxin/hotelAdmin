const express=require('express');
const app=express();
const mysql=require('mysql');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser=require('body-parser');
var crypto=require('crypto');
var sendMail=require('./config/email');
var modifyPassword=require('./config/modifyPassword');
var unlock=require('./config/unlock');
var logout=require('./config/logout');
var getRoom=require('./config/getRoom');
var getAllRoom=require('./config/getAllRoom');
var addRoom=require('./config/addRoom');
var deleteRoom=require('./config/deleteRoom');
var modifyRoom=require('./config/modifyRoom');
var openRoom=require('./config/openRoom');
var checkOut=require('./config/checkOut');

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

app.use(function(req,res,next){
  if(req.session.username){
    next();
  }else{
    var arr=req.url.split('/');
    for(var i=0;i<arr.length;i++){
      arr[i]=arr[i].split('?')[0];
    }
    if(arr[1]==='login'||arr[1]==='modifyPassword'||arr[1]==='sendMail'||arr[1]==='unlock'){
      next();
    }else{
      res.status(210).json({code:210,msg:'未登录'})
    }
  }
})

app.post('/login',function(req,res){
  let addSql="SELECT * FROM  user WHERE user_name=?";
  let getData=[req.body.username];
  connection.query(addSql,getData,function(err,result){
    if(err){
      console.log(err)
      res.status(203).json({code:203,msg:err})
    }else{
      // var hashPassword=crypto.createHash('md5').update(req.body.password).digest('hex');
      let t1=crypto.createCipher('aes192','hotelAdmin');   //对密码进行加密
      let hashPassword=t1.update(req.body.password,'utf8','hex');
      hashPassword+=t1.final('hex');

      if(result.length===0){
        res.status(201).json({code:201,msg:'账号未注册'})
      }else{
        if(hashPassword!==result[0].user_password){
          res.status(202).json({code:202,msg:'密码错误'})
        }else{
          req.session.username=req.body.username;
          res.status(200).json({code:200,msg:'登录成功',token:new Date().getTime()})
        }
      }
    }
  })
})


app.post('/sendMail',sendMail);   //发送验证邮箱给用户
app.post('/modifyPassword',modifyPassword);   //修改密码

app.get('/check',function(req,res){
  // console.log(req.session.username)
  res.json({msg:'res'})
})

app.post('/unlock',unlock);  //验证解锁密码
app.post('/logout',logout);  //用户注销
app.get('/getRoom',getRoom);   //获取未开房间和已开房间
app.get('/getAllRoom',getAllRoom);   //获取所有的房间信息
app.post('/addRoom',addRoom);   //添加房间
app.del('/deleteRoom',deleteRoom);    //删除房间
app.post('/modifyRoom',modifyRoom);   //修改放假信息
app.post('/openRoom',openRoom);      //开房
app.post('/checkOut',checkOut);      //退房
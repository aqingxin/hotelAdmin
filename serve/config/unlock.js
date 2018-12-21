const mysql=require('mysql');
var crypto=require('crypto');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})
var unlock=function(req,res){
  let addSql="SELECT * FROM  user WHERE user_name=?";
  let getData=['admin'];
  connection.query(addSql,getData,function(err,result){
    if(err){
      console.log(err)
      res.status(203).json({code:203,msg:err})
    }else{
      // var hashPassword=crypto.createHash('md5').update(req.body.lockPassword).digest('hex');
      let t1=crypto.createCipher('aes192','hotelAdmin');   //对密码进行加密
      let hashPassword=t1.update(req.body.lockPassword,'utf8','hex');
      hashPassword+=t1.final('hex');
      if(hashPassword!==result[0].user_password||result.length===0){
        res.status(202).json({code:202,msg:'密码错误'})
      }else{
        res.status(200).json({code:200,msg:'解锁成功'})
      }
    }
  })
}
module.exports=unlock;
var crypto=require('crypto');
const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})

modifyPassword=function(req,res){
  if(new Date(Date.now())>req.session.validateCodeTime){
    res.json({code:202,msg:'验证码过期'})
  }else{
    if(req.body.code===req.session.validateCode){
      console.log(req.body.newPassword)
      var hashPassword=crypto.createHash('md5').update(req.body.newPassword).digest('hex');
      let updateSql="UPDATE user SET user_password=? WHERE user_name=?";
      let updateData=[hashPassword,'admin'];
      connection.query(updateSql,updateData,function(err){
        if(err){
          console.log(err)
          res.json({code:201,msg:'密码修改失败'})
        }else{
          res.json({code:200,msg:'密码修改成功'})
        }
      })
    }else{
      res.json({code:203,msg:'验证码错误'})
    }
  }
}

module.exports=modifyPassword;
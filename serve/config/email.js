var nodemailer=require('nodemailer');   //发送邮件模块

var config = {    //定义配置
  host: '邮箱服务商地址',
  port: 465,
  secure: true,
  auth: {
    user:'自己的邮箱地址',
    pass:'授权密码'
  }
}
var transpoeter=nodemailer.createTransport(config);

var sendMail=function(req,res){
  var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);     //随机6位数验证码
  req.session.validateCode=randomNum;   //将验证码存进session
  req.session.validateCodeTime=new Date().getTime()+600000;   //冰设定时长
  let email = {    //定义邮件内容
    from:"hotelAdmin '13071581420@163.com'",
    to:req.body.email,
    subject:'hotelAdmin---邮箱验证码',
    text:'hotelAdmin正常邮箱验证',
    html:'<h1>Hello!</h1><p style="font-size: 18px;color:#000;">验证码为：<u style="font-size: 16px;color:#1890ff;">'+ randomNum +'</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>'
  }
  transpoeter.sendMail(email,function(err,info){    //发送邮件
    if(err){
      console.log(err)
      res.status(201).json({code:201,msg:err})
    }else{
      res.status(202).json({code:200,msg:info})
    }
  })
}
module.exports=sendMail;

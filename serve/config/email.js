var nodemailer=require('nodemailer');

var config = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user:'13071581420@163.com',
    pass:'Ss1607440679'
  }
}
var transpoeter=nodemailer.createTransport(config);

var sendMail=function(req,res){
  var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
  req.session.validateCode=randomNum;
  req.session.validateCodeTime=new Date(Date.now()+600000);
  let email = {
    from:"hotelAdmin '13071581420@163.com'",
    to:req.body.email,
    subject:'hotelAdmin---邮箱验证码',
    text:'hotelAdmin正常邮箱验证',
    html:'<h1>Hello!</h1><p style="font-size: 18px;color:#000;">验证码为：<u style="font-size: 16px;color:#1890ff;">'+ randomNum +'</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>'
  }
  transpoeter.sendMail(email,function(err,info){
    if(err){
      console.log(err)
      res.json({code:201,msg:err})
    }else{
      res.json({code:200,msg:info})
    }
  })
}
module.exports=sendMail;
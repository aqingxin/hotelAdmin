var logout=function (req,res) {
  if(req.session.destroy()){
    res.status(200).json({code:200,msg:'注销成功'})
  }else{
    res.status(201).json({code:201,msg:'注销失败'})
  }
}

module.exports=logout;
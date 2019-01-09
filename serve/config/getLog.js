var connection=require('./connectionDb');

var getLog=function(req,res){
  connection.query("SELECT * FROM log ORDER BY id DESC",function(err,result){
    if(err){
      console.log(err);
      res.status(201).json({code:201,msg:'获取数据失败'})
    }else{
      res.status(200).json({code:200,msg:result})
    }
  })
}
module.exports=getLog;
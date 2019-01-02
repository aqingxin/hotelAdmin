var connection=require('./connectionDb');

var getStatistic=function(req,res){
  let getSql1="SELECT * FROM openroom WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= expire_date AND status=1";
  let getSql2="SELECT * FROM openroom WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= expire_date AND status=1"
  connection.query(getSql1,function(err,result){
    if(err){
      console.log(err)
      res.status(210).json({code:210,msg:'获取数据失败'})
    }else{
      console.log(result)
      res.status(200).json({code:200,msg:result})
    }
  })
}
module.exports=getStatistic;
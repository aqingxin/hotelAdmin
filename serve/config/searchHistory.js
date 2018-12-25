const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})

var searchHistory=function(req,res){
  let searchSql="SELECT * FROM openroom WHERE name=? AND open_date LIKE ? AND status=1";
  let searchData=[req.body.name,"%"+req.body.date+"%"];
  connection.query(searchSql,searchData,function(err,result){
    if(err){
      console.log(err)
      res.status(210).json({code:210,msg:'搜索数据失败'})
    }else{
      console.log(result)
    }
  })
}
module.exports=searchHistory;
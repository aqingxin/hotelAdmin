const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})

var searchHistory=function(req,res){
  let searchSql="SELECT openroom.id,openroom.name,openroom.gender,openroom.certificates,openroom.open_date,openroom.expire_date,openroom.collect_money,openroom.deposit,room.room_num,room.room_type,room.room_money,room.id AS allRoomId FROM openroom INNER JOIN room ON openroom.room_id=room.id WHERE name=? AND open_date LIKE ? AND status=1";
  let searchData=[req.body.name,"%"+req.body.date+"%"];
  connection.query(searchSql,searchData,function(err,result){
    if(err){
      console.log(err,1)
      res.status(210).json({code:210,msg:'搜索数据失败'})
    }else{
      res.status(200).json({code:200,msg:result})
    }
  })
}
module.exports=searchHistory;
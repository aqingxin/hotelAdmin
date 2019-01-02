const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})


var getHistory=function(req,res){
  let selsectSql="SELECT history.id,history.name,history.gender,history.certificates,history.open_date,history.expire_date,history.collect_money,history.deposit,room.room_num,room.room_type,room.room_money,room.id AS allRoomId FROM history INNER JOIN room ON history.room_id=room.id";
  connection.query(selsectSql,function(err,result){
    if(err){
      console.log(err);
      res.status(210).json({code:210,msg:'获取数据错误'})
    }else{
      res.status(200).json({code:200,msg:result})
    }
  })
}
module.exports=getHistory;
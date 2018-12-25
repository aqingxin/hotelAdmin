const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})


var getHistory=function(req,res){
  let selsectSql="SELECT openroom.id,openroom.name,openroom.gender,openroom.certificates,openroom.open_date,openroom.expire_date,openroom.collect_money,openroom.deposit,room.room_num,room.room_type,room.room_money,room.id AS allRoomId FROM openroom INNER JOIN room ON openroom.room_id=room.id WHERE openroom.status=1";
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
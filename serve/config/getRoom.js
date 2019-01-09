var connection=require('./connectionDb');

var getRoom=function(req,res){
  let getSql="SELECT * FROM room WHERE room_status=0";
  let joinSql="SELECT openroom.id,openroom.name,openroom.gender,openroom.certificates,openroom.open_date,openroom.expire_date,openroom.collect_money,openroom.deposit,room.room_num,room.room_status,room.room_type,room.room_money,room.id AS allRoomId FROM openroom INNER JOIN room ON openroom.room_id=room.id WHERE openroom.status=0";
  connection.query(getSql,function(err,result){
    if(err){
      console.log(err)
      res.status(210).json({code:210,msg:'获取数据出错'})
    }else{
      connection.query(joinSql,function(error,results){
        if(error){
          console.log(error)
          res.status(210).json({code:210,msg:'获取数据出错'})
        }else{
          res.status(200).json({code:200,notOpen:result,open:results})
        }
      })
    }
  })
}
module.exports=getRoom;
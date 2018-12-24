const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})

var changeRoom=function(req,res){
  let changeRoomSql="UPDATE openroom SET room_id=? WHERE id=?";
  let changeData=[req.body.newRoomId,req.body.changeId];
  let updateRoom1="UPDATE room SET room_status=? WHERE id=?";
  let updateData1=[1,req.body.newRoomId];
  let updateRoom2="UPDATE room SET room_status=? WHERE room_num=?";
  let updateData2=[0,req.body.oldRoomNum];
  connection.query(changeRoomSql,changeData,function(err,result){
    if(err){
      res.status(210).json({code:210,msg:err})
    }else{
      connection.query(updateRoom1,updateData1,function(error,results){
        if(error){
          console.log(error);
          res.status(210).json({code:210,msg:error})
        }else{
          connection.query(updateRoom2,updateData2,function(errors,result2){
            if(errors){
              console.log(errors);
              res.status(210).json({code:210,msg:err})
            }else{
              res.status(200).json({code:200,msg:'换房成功'})
            }
          })
        }
      })
    }
  })  
}
module.exports=changeRoom;
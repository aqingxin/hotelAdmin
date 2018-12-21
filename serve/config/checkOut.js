const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})

var checkOut=function(req,res){
  let checkOutSql="DELETE FROM openroom WHERE room_id=?";
  let checkOutData=[req.body.roomid];
  connection.query(checkOutSql,checkOutData,function(err,result){
    if(err){
      res.status(210).json({code:210,msg:'退房失败'})
    }else{
      let updateRoomSql="UPDATE room SET room_status=? WHERE id=?";
      let updateRoomData=[0,req.body.roomid];
      connection.query(updateRoomSql,updateRoomData,function(error,results){
        if(err){
          res.status(210).json({code:210,msg:'退房失败'})
        }else{
          res.status(200).json({code:200,msg:'退房成功'})
        }
      })
    }
  })
}

module.exports=checkOut;
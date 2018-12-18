const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})

var modifyRoom=function(req,res){
  let updateTime=new Date().toLocaleDateString();
  let updateSql="UPDATE room SET room_num=?,room_type=?,room_money=?,update_time=? WHERE id=?";
  let updateData=[req.body.roomNum,req.body.roomType,req.body.roomMoney,updateTime,req.body.roomId];
  connection.query(updateSql,updateData,function(err,result){
    if(err){
      console.log(err)
      res.status(210).json({code:210,msg:'房间信息更新失败'})
    }else{
      res.status(200).json({code:200,msg:'房间信息更新成功'})
    }
  })
}

module.exports=modifyRoom;
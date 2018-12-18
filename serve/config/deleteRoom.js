const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})

var deleteRoom=function(req,res){
  let deleteSql="DELETE FROM room WHERE id=?";
  let deleteData=[req.query.roomId];
  connection.query(deleteSql,deleteData,function(err,result){
    if(err){
      console.log(err);
      res.status(210).json({code:210,msg:'删除失败'})
    }else{
      res.status(200).json({code:200,msg:'删除成功'})
    }
  })
}

module.exports=deleteRoom;
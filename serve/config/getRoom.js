const mysql=require('mysql');
var connection=mysql.createConnection({   //创建数据库连接
	host:'localhost',
	user:'root',
	password:'',
	database:'hotel',
})

var getRoom=function(req,res){
  let getSql="SELECT * FROM room WHERE room_status=0";
  let joinSql="SELECT * FROM openroom INNER JOIN room ON openroom.room_id=room.id";
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
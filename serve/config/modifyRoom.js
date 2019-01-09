var connection=require('./connectionDb');
var log=require('./log');
var modifyRoom=function(req,res){
  let updateTime=new Date().toLocaleDateString();
  let updateSql="UPDATE room SET room_num=?,room_type=?,room_money=?,update_time=? WHERE id=?";
  let updateData=[req.body.roomNum,req.body.roomType,req.body.roomMoney,updateTime,req.body.roomId];
  connection.query(updateSql,updateData,function(err,result){
    if(err){
      console.log(err)
      res.status(210).json({code:210,msg:'房间信息更新失败'})
    }else{
      connection.query('SELECT * FROM room WHERE id=?',[req.body.roomId],function(errors,getRes){
        if(errors){
          console.log(errors);
          res.status(210).json({code:210,msg:errors});
        }else{
          log.addLog(`管理员更新了${getRes[0].room_num}房间信息`).then(data=>{
            res.status(200).json({code:200,msg:'房间信息更新成功'})
          }).catch(error=>{
            res.status(210).json({code:210,msg:'房间信息更新失败'})
          })
        }
      })
    }
  })
}

module.exports=modifyRoom;
var connection=require('./connectionDb');
var log=require('./log');
var deleteRoom=function(req,res){
  let deleteSql="DELETE FROM room WHERE id=?";
  let deleteData=[req.query.roomId];
  connection.query(deleteSql,deleteData,function(err,result){
    if(err){
      console.log(err);
      res.status(210).json({code:210,msg:'删除失败'})
    }else{
      log.addLog(`管理员删除了房间"${req.query.room_num}"`).then(data=>{
        res.status(200).json({code:200,msg:'删除成功'})
      }).catch(error=>{
        res.status(210).json({code:210,msg:'删除失败'})
      })
    }
  })
}

module.exports=deleteRoom;
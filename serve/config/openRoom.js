var connection=require('./connectionDb');
var log=require('./log');

var openRoom=function(req,res){
  let insertSql="INSERT INTO `openroom` (room_id,name,gender,certificates,open_date,expire_date,collect_money,deposit) VALUES (?,?,?,?,?,?,?,?)";
  let insertData=[req.body.roomId,req.body.name,req.body.gender,req.body.certificates,req.body.date1,req.body.date2,req.body.roomMoney,req.body.deposit];
  connection.query(insertSql,insertData,function(err,result){
    if(err){
      console.log(err);
      res.status(210).json({code:210,msg:err})
    }else{
      let updateRoom="UPDATE room SET room_status=? WHERE id=?";
      let updateData=[1,req.body.roomId];
      connection.query(updateRoom,updateData,function(error,results){
        if(error){
          console.log(error);
          res.status(210).json({code:210,msg:error});
        }else{
          connection.query('SELECT * FROM room WHERE id=?',[req.body.roomId],function(errors,getRes){
            if(errors){
              console.log(errors);
              res.status(210).json({code:210,msg:errors});
            }else{
              log.addLog(`管理员admin开出了房间"${getRes[0].room_num}"`).then(data=>{
                res.status(200).json({code:200,msg:'开房成功'});
              }).catch(errorss=>{
                console.log(errorss);
                res.status(210).json({code:210,msg:errorss});
              })
            }
          })
        }
      })
    }
  })
}

module.exports=openRoom;
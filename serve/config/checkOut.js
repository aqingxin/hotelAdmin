var connection=require('./connectionDb');

var checkOut=function(req,res){
  var checkOut=new Promise(function(resolve,reject){
    let checkOutSql="UPDATE openroom SET status=? WHERE id=?";
    let checkOutData=[1,req.body.roomid];
    connection.query(checkOutSql,checkOutData,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
  var updateRoom=new Promise(function(resolve,reject){
    let updateRoomSql="UPDATE room SET room_status=? WHERE id=?";
    let updateRoomData=[0,req.body.allRoomId];
    connection.query(updateRoomSql,updateRoomData,function(error,results){
      if(error){
        reject(error)
      }else{
        resolve(results)
      }
    })
  })

  Promise.all([checkOut,updateRoom]).then(data=>{
    res.status(200).json({code:200,msg:'退房成功'})
  }).catch(err=>{
    res.status(210).json({code:210,msg:'退房失败'})
  })
}

module.exports=checkOut;
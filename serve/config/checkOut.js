var connection=require('./connectionDb');

var checkOut=function(req,res){
  var checkOut=new Promise(function(resolve,reject){   //更新openroom数据
    let checkOutSql="UPDATE openroom SET status=?,income=? WHERE id=?";
    let checkOutData=[1,req.body.income,req.body.roomid];
    connection.query(checkOutSql,checkOutData,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
  var updateRoom=new Promise(function(resolve,reject){   //更新所有房间中的数据状态
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

  var insertRoom=new Promise(function(resolve,reject){   //把openroom表中的数据复制到history表
    let insertSql="INSERT INTO history (name,room_id,gender,certificates,open_date,expire_date,collect_money,deposit,income) SELECT name,room_id,gender,certificates,open_date,expire_date,collect_money,deposit,income FROM openroom WHERE id=?";
    // let get="SELECT * FROM history";
    let insertData=[req.body.roomid];
    connection.query(insertSql,insertData,function(error,results){
      if(error){
        reject(error)
      }else{
        resolve(results)
      }
    })
  })

  Promise.all([checkOut,updateRoom,insertRoom]).then(data=>{
    res.status(200).json({code:200,msg:'退房成功'})
  }).catch(err=>{
    console.log(err)
    res.status(210).json({code:210,msg:'退房失败'})
  })
}

module.exports=checkOut;
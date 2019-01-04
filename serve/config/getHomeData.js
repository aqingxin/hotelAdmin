var connection = require('./connectionDb');

var getHomeData=function(req,res){
  var getUser=new Promise((resolve,reject)=>{
    let getUserSql="SELECT * FROM openroom WHERE to_days(open_date) = to_days(now()) AND status = 0";
    connection.query(getUserSql,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result);
      }
    })
  })
  let getRooms=new Promise((resolve,reject)=>{
    let getRoomsSql="SELECT * FROM openroom WHERE status = 0";
    connection.query(getRoomsSql,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result);
      }
    })
  })
  var surplusRooms=new Promise((resolve,reject)=>{
    let surplusRoomsSql="SELECT * FROM room WHERE room_status = 0";
    connection.query(surplusRoomsSql,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result);
      }
    })
  })
  var money=new Promise((resolve,reject)=>{
    let moneySql="SELECT * FROM history WHERE to_days(expire_date) = to_days(now())";
    connection.query(moneySql,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
  Promise.all([getUser,getRooms,surplusRooms,money]).then(function(data){
    res.status(200).json({code:200,users:data[0].length,rooms:data[1].length,surplusRooms:data[2].length,money:data[3]})
  }).catch(err=>{
    res.status(210).json({code:210,msg:'获取数据失败'})
  })
}

module.exports=getHomeData;
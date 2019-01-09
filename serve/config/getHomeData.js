var connection = require('./connectionDb');

var getHomeData=function(req,res){
  var getUser=new Promise((resolve,reject)=>{
    let getUserSql="SELECT * FROM openroom WHERE to_days(open_date) = to_days(now()) AND status = 0";    //在数据库获取当天的数据
    connection.query(getUserSql,function(err,result){
      if(err){
        reject(err)   //失败情况
      }else{
        resolve(result);   //数据获取成功
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
  var getMoney=new Promise((resolve,reject)=>{
    let moneySql="SELECT * FROM history WHERE to_days(expire_date) = to_days(now())";
    connection.query(moneySql,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
  var newOrder=new Promise((resolve,reject)=>{
    let getNewOrder="SELECT openroom.name,openroom.gender,openroom.open_date,room.room_num,room.room_status,room.room_type FROM openroom INNER JOIN room ON openroom.room_id=room.id ORDER BY openroom.id DESC LIMIT 6";
    connection.query(getNewOrder,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result);
      }
    })
  })

  //当所有数据获取后，再一起返回给前端
  Promise.all([getUser,getRooms,surplusRooms,getMoney,newOrder]).then(function(data){
    res.status(200).json({code:200,users:data[0].length,rooms:data[1].length,surplusRooms:data[2].length,money:data[3],newOrder:data[4]})
  }).catch(err=>{
    res.status(210).json({code:210,msg:'获取数据失败'})
  })
}

module.exports=getHomeData;
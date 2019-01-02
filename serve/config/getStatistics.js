var connection=require('./connectionDb');

var getStatistic=function(req,res){
  let getSql1="SELECT * FROM history WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= expire_date";
  let getSql2="SELECT * FROM history WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= expire_date"
  var get=new Promise(function(resolve,reject){
    connection.query(getSql1,function(err,result){
      if(err){
        reject(err)
      }else{
        resolve(result);
      }
    })
  })
  get.then(data=>{
    // res.status(200).json({code:200,msg:data})
    let selsectSql="SELECT history.id,history.name,history.gender,history.certificates,history.open_date,history.expire_date,history.collect_money,history.deposit,history.income,room.room_num,room.room_type,room.room_money,room.id AS allRoomId FROM history INNER JOIN room ON history.room_id=room.id";
    connection.query(selsectSql,function(error,results){
      if(error){
        res.status(210).json({code:210,msg:'获取数据失败'})
      }else{
        res.status(200).json({code:200,msg:results})
      }
    })
  })
  get.catch(err=>{
    res.status(210).json({code:210,msg:'获取数据失败'})
  })
}
module.exports=getStatistic;
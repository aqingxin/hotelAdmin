var connection = require('./connectionDb');

module.exports={
  addLog:function(txt){
    let currentTime = new Date();
    let addSql="INSERT INTO log (text,times) VALUES (?,?)";
    let addData=[txt,`${currentTime.getFullYear()}-${currentTime.getMonth()+1}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`];

    return new Promise((resolve,reject)=>{
      connection.query(addSql,addData,function(err,result){
        if(err){
          console.log(err)
          // return false;
          reject(err)
        }else{
          // return true;
          resolve(result)
        }
      })
    })
  }
}


// var addLog=function(req,res,txt){
//   let currentTime = new Date();
//   let addSql="INSERT INTO log (text,times) VALUES (?,?)";
//   let addData=[txt,`${currentTime.getFullYear()}-${currentTime.getMonth()+1}-${currentTime.getDate()}`];

//   connection.query(addSql,addData,function(err,result){
//     if(err){
//       console.log(err)
//       return false;
//     }else{
//       return true;
//     }
//   })
// }

// module.exports=addLog;
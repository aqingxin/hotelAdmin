const express=require('express');
const app=express();
const mysql=require('mysql');


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/login',function(req,res){
	console.log('222')
	res.json({msg:'success'})
})
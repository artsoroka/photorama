var express = require('express'); 
var request = require('request'); 
var app     = express(); 
var config  = require(__dirname + '/config'); 

app.get('/', function(req,res){
    res.send('hello photorama'); 
}); 

app.listen(config.APP_PORT, function(){
    console.log('Photorama is started on a port %d', config.APP_PORT); 
}); 

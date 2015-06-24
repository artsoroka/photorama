var express = require('express'); 
var request = require('request'); 
var app     = express(); 
var config  = require(__dirname + '/config'); 

app.get('/', function(req,res){
    res.send('hello photorama'); 
}); 

app.get(config.routes.VK_LOGIN_REDIRECT, function(req,res){
    res.send('vk login redirect url '); 
}); 

app.listen(config.APP_PORT, function(){
    console.log('Photorama is started on a port %d', config.APP_PORT); 
}); 

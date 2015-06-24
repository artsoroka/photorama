var express = require('express'); 
var request = require('request'); 
var app     = express(); 
var config  = require(__dirname + '/config'); 

app.use(express.static(__dirname + '/public')); 
app.set('view engine', 'ejs'); 

app.get('/', function(req,res){
    
    var vkLoginData = {
        client_id    : config.vk.id,  
        scope        : config.vk.scope, 
        display      : config.vk.display,  
        api_version  : config.vk.api_version,  
        redirect_uri : config.vk.redirect 
    }; 
    
    res.render('mainpage', {
        login: {
            vk: JSON.stringify(vkLoginData)
        }
    }); 
}); 

app.get(config.routes.VK_LOGIN_REDIRECT, function(req,res){
    res.render('auth/socialAuth');  
}); 

app.listen(config.APP_PORT, function(){
    console.log('Photorama is started on a port %d', config.APP_PORT); 
}); 

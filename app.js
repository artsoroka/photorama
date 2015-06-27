var express = require('express'); 
var request = require('request'); 
var app     = express(); 
var config  = require(__dirname + '/config'); 
var Auth    = require('./auth');
var auth    = new Auth(config.vk); 

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

    var code              = req.query.code || null; 
    var access_token      = req.query.access_token || null; 
    var error             = req.query.error || null; 
    var error_description = req.query.error_description || null; 
    
    if(access_token){
        var expires_in = req.query.expires_in || null;         
        var user_id = req.query.user_id || null;         
        
        return res.send('got response: ' + JSON.stringify({
            expires_in: expires_in, 
            user_id: user_id, 
            access_token: access_token
        })); 
    }

    if(code){
        console.log('got resonse from vk oAuth server with code: ', req.query.code); 
        auth.getAccessToken(code);     
        return res.render('auth/socialAuth');     
    }

    if( error || error_description )
        return res.send('error: ' + error_description); 

    return res.send('unknown error occured'); 
        
}); 

app.listen(config.APP_PORT, function(){
    console.log('Photorama is started on a port %d', config.APP_PORT); 
}); 

var querystring = require("querystring"); 
var extend      = require('util')._extend; 
var request     = require('request'); 

var Auth = function(config){
    this.config = config;     
}; 

Auth.prototype.getAccessToken = function(code){
  
  console.log('calling vk with code: ' + code); 
  
  var url = this.getUrl(code); 
  
  console.log('url: ', url); 
  
  request(url, function(err, response, body){
    if(err || response.statusCode != 200)
      return console.log('vk auth error: ', err, response.statusCode); 

    console.log('body: ', body); 

  });
  
}

Auth.prototype.getUrl = function(code){
   var base_url = 'https://oauth.vk.com/access_token';
   var config   = this.config; 
   var params   = {
       client_id    :   config.id, 
       client_secret:   config.secret, 
       redirect_uri :   config.redirect, 
       code         :   code

   }; 
   var query    = querystring.stringify(params, '&'); 
   
   return [base_url, query].join('?'); 
}; 

module.exports = Auth; 
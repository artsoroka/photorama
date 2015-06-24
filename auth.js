var querystring = require("querystring"); 
var extend      = require('util')._extend; 


var Auth = function(config){
    this.config = config;     
}; 

Auth.prototype.getUrl = function(){
   var base_url = 'https://oauth.vk.com/authorize?response_type=token';
   var config   = this.config; 
   var params   = {
       client_id :   config.id, 
       scope     :   config.scope.join(','), 
       display   :   config.display, 
       v         :   config.api_version, 
       redirect  :   config.redirect
   }; 
   var query    = querystring.stringify(params, '&'); 
   
   return [base_url, query].join('&'); 
}; 

module.exports = Auth; 
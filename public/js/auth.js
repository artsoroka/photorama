var Auth = {
    window: null, 
    provider: null, 
    vklogin: function(){
        var url = this.composeUrl('vk'); 
        this.provider = 'vk'; 
        this.window = window.open(url, "authentication", "width=800, height=450");
    },
    composeUrl: function(provider){
        if(provider == 'vk'){
            return this.getVkAuthUrl(); 
        }
    }, 
    getVkAuthUrl:  function(){
        var credentials = JSON.parse( document.getElementById('vk_login').dataset.credentials ); 
        var base_url = 'https://oauth.vk.com/authorize?response_type=code'; 
        var query = []; 
        for(var property in credentials){
            if(typeof property == 'object'){
                ; 
                query.push( [property, credentials[property].join('')].join('=') ); 
            } else {
                query.push([property, credentials[property]].join('=')); 
            }
        }
        
        return [base_url, query.join('&')].join('&'); 
         
    }, 
    
    readHash: function(hash){
        console.log('oauth response: ', hash);
        var data = this.parseHash(hash);
        console.log('extracted data drom hash string: ', data); 
    }, 
    parseHash: function (str){
        var data = {}; 
        
        str.split('&').map(function(kv){
            var kvPair = kv.split('='); 
            data[kvPair[0]] = kvPair[1]; 
        }); 
        
        return data; 
      
    }
}
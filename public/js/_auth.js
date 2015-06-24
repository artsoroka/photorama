    Auth = {
      window: null, 
      url: 'https://oauth.yandex.ru/authorize?response_type=token&client_id=eaa6d2ec0917404ab0221843c20c5686&display=popup&state=hello', 
      yandex: function(){
        this.window = window.open(this.url, "authentication", "width=800, height=450");
      },
      readHash: function(hash){
        var params = this.parse(hash); 
        if(params.error) 
          return this.noPermitionGranted(params.error); 
        
	if(params.access_token)
	  return this.setToken(params.access_token); 
      },    
      noPermitionGranted: function(){
      	console.log('no permition granted by the user'); 
      },
      setToken: function(token){
	var req = new XMLHttpRequest(); 
	req.open('POST', '/login/yandex', true); 
	req.setRequestHeader("Content-Type", 'application/json');	
	var self = this; 
	req.onreadystatechange = function(){
	  if(req.readyState == 4){
	    if(req.status == 200)
	      self.loginResponseHandler(req.responseText); 
	  } 
	}	
	req.send(JSON.stringify({ access_token : token })); 
      },
      loginResponseHandler: function(responseText){
        var res = JSON.parse(responseText); 
        if( ! res.error )
          console.log(res.cookie); 
      }, 
      parse: function(str){
        var params = {}; 
        if( ! str.length ) return params; 
        if( ! str.match('#') ) return params; 
        var hash = str.split('#')[1]; 
 
	hash.split('&').map(function(keyValue){
	  var data = keyValue.split('='); 
	  params[data[0]] = data[1]; 
        });
	return params; 
      }
    }
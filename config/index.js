var BASE_URL = 'http://vkstat.ru'; 
var VK_LOGIN_REDIRECT = '/auth/vk/'; 

module.exports = {
    APP_PORT: process.env.PHOTORAMA_PORT || 8080, 
    routes: {
        VK_LOGIN_REDIRECT: VK_LOGIN_REDIRECT
    }, 
    vk: {
        id: process.env.PHOTORAMA_VK_ID,  
        secret: process.env.PHOTORAMA_VK_SECRET, 
        scope: ['photos', 'wall', 'email', 'offline'], 
        display: 'popup', 
        api_version: '5.34', 
        redirect: BASE_URL + VK_LOGIN_REDIRECT 
    }
}; 
var http = require("http");
setInterval(function() {
    http.get("http://guess-who-pokemon.herokuapp.com");
}, 300000);
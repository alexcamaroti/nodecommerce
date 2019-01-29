var express = require('express');
var app = express();

app.listen(3000, function(){
    console.log("Server is running");
});

app.get('/', function(req, res){
    res.send("Good stuff!!!");
});
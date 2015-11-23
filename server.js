var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('seats',['seats']);

//app.get('/',function(req, res){
//   res.send("Hello world from server.js"); 
//});

//look for static files that dont change dynamically
app.use(express.static(__dirname + "/public"));
app.get('/seatlist',function(req,res){
    console.log("I receive a GET request"+res);
//    find
    db.seats.find(function(err,docs){
        console.log(docs);
        //send back to controller
        res.json(docs);
    });
});
app.listen(3000);
console.log("server running on port 3000");
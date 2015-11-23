var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('seats',['seats']);
//var url = require('url');
//var url_parts = url.parse(request.url,true);
//var query = url_parts.query;

//display result on homepage
app.get('/',function(req, res){
   res.send("Seat yo: "+req.query.result); 
});
//look for static files that dont change dyns
app.use(express.static(__dirname + "/public"));
//p.get('/seatlist',function(req,res){
//  console.log("I receive a GET request"+res);
////  db.seats.find(function(err,docs){
////      console.log(docs);
////        //send back to controller
////        res.json(docs);
////    });
//});
app.listen(3000);
console.log("server running on port 3000");
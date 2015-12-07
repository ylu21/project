var express = require('express');
var app = express();

//use with spot
function findSpot(col, myspot, callback){
    console.log("why im here");
    col.find({spot: myspot}).toArray(function(err,result){
        if(err){}
        else if(result.length){
            if(result[0].taken==true){
                console.log(result[0].spot + "now taken!");
                col.update({spot: myspot},{$set: {taken: false}});
                callback(false);
            }else{
                 console.log(result[0].spot + "now NOT taken!");
                col.update({spot: myspot},{$set: {taken: true}});
                callback(true);
            }
        }
        else{}
    });
}

//use with hashspot
function findHashSpot(col, myspot, callback){
    console.log("why im here");
    col.find({hash: myspot}).toArray(function(err,result){
        if(err){}
        else if(result.length){
            if(result[0].taken==true){
                console.log(result[0].spot + "now taken!");
                col.update({hash: myspot},{$set: {taken: false}});
                callback(false);
            }else{
                 console.log(result[0].spot + "now NOT taken!");
                col.update({hash: myspot},{$set: {taken: true}});
                callback(true);
            }
        }
        else{}
    });
}

//use with map
function checkTaken(col, callback){
    var myArray = [];
    var j=0;
    col.find({taken: true}).toArray(function(err,result){
        if(err){}
        else if(result.length){
            //console.log("found yo: ", result.length);
            //if found, update taken
            result.forEach(function(entry){
                myArray[j]=entry.locationx;
                myArray[j+1]=entry.locationy;
                myArray[j+2]=entry.sizex;
                myArray[j+3]=entry.sizey;
                j=j+4;
            });
            callback(myArray);
        }
        else{
        }
    });
}

// required to support parsing of POST request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// put all of your static files (e.g., HTML, CSS, JS, JPG) in the static_files/
// sub-directory, and the server will serve them from there. e.g.,:
//
// http://localhost:3000/fakebook.html
// http://localhost:3000/cat.jpg
//
// will send the file static_files/cat.jpg to the user's Web browser
app.use(express.static('frontend'));


// simulates a database in memory, to make this example simple and
// self-contained (so that you don't need to set up a separate database).
// note that a real database will save its data to the hard drive so
// that they become persistent, but this fake database will be reset when
// this script restarts. however, as long as the script is running, this
// database can be modified at will.
var fakeDatabase = [
//locations are fixed pixels on image (.jpg), scaling happens in canvas draw
  {area: 'Gleason', hash: '84EBC8AC9D905C20014AD355ECD85110', spot: 'GleasonTable1', taken: false, locationx: 1808, locationy: 216, sizex: 130, sizey: 54},
  {area: 'Gleason', hash: 'AE21AB7EBE326646E7F9A2EEEFC6646C', spot: 'GleasonTable2', taken: false, locationx: 1808, locationy: 320, sizex: 130, sizey: 54},
  {area: 'Gleason', hash: '161987612352A37F58F82D373C2DC4DA', spot: 'GleasonTable3', taken: false, locationx: 1808, locationy: 430, sizex: 130, sizey: 54},
  {area: 'Gleason', hash: 'BFC526BF21C589EA72B93C6B0595C0C0', spot: 'GleasonTable4', taken: false, locationx: 1808, locationy: 526, sizex: 130, sizey: 54},
  {area: 'Gleason', hash: '96DCD789605E3F39947BDE612633A03D', spot: 'GleasonTable5', taken: false, locationx: 1808, locationy: 620, sizex: 130, sizey: 54},
  {area: 'Gleason', hash: '3FC2FFE87B9E30D73A1F171FD1AFCD28', spot: 'GleasonTable6', taken: false, locationx: 1808, locationy: 718, sizex: 130, sizey: 54},
  {area: 'Gleason', hash: '75F7C9E77F7C93744992CEA90D6DE80A', spot: 'GleasonTable7', taken: false, locationx: 1808, locationy: 834, sizex: 130, sizey: 54},
  {area: 'Carlson', hash: '704B048750C871504927FDE5DAE72D2F', spot: 'CarlsonTable1', taken: false, locationx: 112, locationy: 164, sizex: 20, sizey: 20},
  {area: 'Carlson', hash: '5A8FAF8311F674498A2FDC2246D1B8E4', spot: 'CarlsonTable2', taken: false, locationx: 167, locationy: 142, sizex: 13, sizey: 38},
  {area: 'Carlson', hash: '9E18E3FD872C6F22C3AA1723DCF5C321', spot: 'CarlsonTable3', taken: false, locationx: 201, locationy: 143, sizex: 13, sizey: 38},
  {area: 'Carlson', hash: 'F44E5495CC969BFA7922BE71307227CD', spot: 'CarlsonTable4', taken: false, locationx: 231, locationy: 146, sizex: 13, sizey: 38},
  {area: 'Carlson', hash: '6A9C936E087246A2A1677CC79A010E24', spot: 'CarlsonTable5', taken: false, locationx: 270, locationy: 170, sizex: 20, sizey: 20},
  {area: 'Carlson', hash: '16A83692587B7C8FAD1B2D3A3DEE6373', spot: 'CarlsonTable6', taken: false, locationx: 295, locationy: 183, sizex: 20, sizey: 20},
  {area: 'Carlson', hash: '1456AC2842AFD3E60F2C9255C159B7C0', spot: 'CarlsonTable7', taken: false, locationx: 77, locationy: 281, sizex: 13, sizey: 38},
  {area: 'Carlson', hash: '31C8B259144AA23430469C6486D3A9CC', spot: 'CarlsonTable8', taken: false, locationx: 77, locationy: 332, sizex: 13, sizey: 38},
  {area: 'Carlson', hash: 'CF8234ADE22B22CB5E0B4C4BC27260BB', spot: 'CarlsonTable9', taken: false, locationx: 87, locationy: 463, sizex: 20, sizey: 20},
  {area: 'Carlson', hash: 'C68D879301CD047BC3029B2032DF3E4F', spot: 'CarlsonTable10', taken: false, locationx: 120, locationy: 470, sizex: 20, sizey: 20},
  {area: 'Carlson', hash: '9F1E0284EE82217A948514268E978FD6', spot: 'CarlsonTable11', taken: false, locationx: 165, locationy: 453, sizex: 20, sizey: 20},
];

//database
var mongodb = require('mongodb');
var mongojs = require('mongojs');
var url = 'mongodb://localhost:27017/mydb';
var db = mongojs(url);
var roomcollection = db.collection('room');
var k = 1;
//db.room.createIndex( { "hash": 1 } );
roomcollection.ensureIndex({hash:1}, {unique:true});
for (var i = 0; i < fakeDatabase.length; i++) {
    roomcollection.insert(fakeDatabase[i],function(err, result){
            if(err){

            }
            else{
                console.log("inserted: "+i, result);
            }
        });
}


// REST API as described in http://pgbovine.net/rest-web-api-basics.htm

/* Run through a full API test session with curl (commands typed after '$',
   outputs shown on the line below each command) ...

$ curl -X GET http://localhost:3000/users
["Philip","Jane","John"]

$ curl -X GET http://localhost:3000/users/Philip
{"name":"Philip","job":"professor","pet":"cat.jpg"}

$ curl -X PUT --data "job=bear_wrangler&pet=bear.jpg" http://localhost:3000/users/Philip
OK

$ curl -X GET http://localhost:3000/users/Philip
{"name":"Philip","job":"bear_wrangler","pet":"bear.jpg"}

$ curl -X DELETE http://localhost:3000/users/Philip
OK

$ curl -X GET http://localhost:3000/users/Philip
{}

$ curl -X GET http://localhost:3000/users
["Jane","John"]

$ curl -X POST --data "name=Carol&job=scientist&pet=dog.jpg" http://localhost:3000/users
OK

$ curl -X GET http://localhost:3000/users
["Jane","John","Carol"]

$ curl -X GET http://localhost:3000/users/Carol
{"name":"Carol","job":"scientist","pet":"dog.jpg"}

*/

// CREATE a new user
//
// To test with curl, run:
//   curl -X POST --data "spot=CarlsonTable11" http://45.79.134.174/spots
app.post('/spots', function (req, res) {
  var postBody = req.body;
  var mySpot = postBody.spot;
  var response = 'error';

  // must have a spot!
  if (!mySpot) {
    res.send('ERROR');
    return; // return early!
  }

  //alternate between take and untake
  findSpot(roomcollection, mySpot, function(boo){
      if(boo){
        response = 'take';
      }else{
        response = 'untake';
      }
  });
//  // check if user's name is already in database; if so, send an error
//  for (var i = 0; i < fakeDatabase.length; i++) {
//    var temp = fakeDatabase[i];
//    if (temp.spot == mySpot) {
//        if(temp.taken==true){
//            query(roomcollection, temp.hash);
//            temp.taken = false;
//            response = 'untake';
//            console.log(temp.spot + "now NOT taken!");
//        }
//        else{
//            query(roomcollection, temp.hash);
//            temp.taken = true;
//            response = 'take';
//            console.log(temp.spot + "now taken!");
//        }
//
//
//      break; // get out of here early!
//    }
//  }

  // otherwise add the user to the database by pushing (appending)
  // postBody to the fakeDatabase list
 // fakeDatabase.push(postBody);

  console.log("Yes: "+mySpot);
  res.send(response);
});


app.get('/asdfg/*', function (req, res) {
var mySpot = req.params[0];

  // must have a spot!
  if (!mySpot) {
    res.send('ERROR');
    return; // return early!
  }

  //check if hash is in table
  findHashSpot(roomcollection, mySpot, function(boo){
      if(boo){
        response = 'take';
      }else{
        response = 'untake';
      }
  });

  // otherwise add the user to the database by pushing (appending)
  // postBody to the fakeDatabase list
 // fakeDatabase.push(postBody);

  console.log("Yes: "+mySpot);
  res.send('OK');
});


// READ profile data for a user
//
// To test with curl, run:
//   curl -X GET http://localhost:3000/users/Philip
//   curl -X GET http://localhost:3000/users/Jane
app.get('/maps/*', function (req, res) {
  var userSpot = req.params[0]; // this matches the '*' part of '/users/*' above
  //look up in database
  checkTaken(roomcollection, function(arr){
      if(arr.length){
          res.send(arr);
      }
  });
  return;

  res.send('{}'); // failed, so return an empty JSON object!
});


// READ a list of all usernames (note that there's no '*' at the end)
//
// To test with curl, run:
//   curl -X GET http://localhost:3000/users


// UPDATE a user's profile with the data given in POST
//
// To test with curl, run:
//   curl -X PUT --data "job=bear_wrangler&pet=bear.jpg" http://localhost:3000/users/Philip
app.put('/users/*', function (req, res) {
  var nameToLookup = req.params[0]; // this matches the '*' part of '/users/*' above
  // try to look up in fakeDatabase
  for (var i = 0; i < fakeDatabase.length; i++) {
    var e = fakeDatabase[i];
    if (e.name == nameToLookup) {
      // update all key/value pairs in e with data from the post body
      var postBody = req.body;
      for (key in postBody) {
        var value = postBody[key];
        e[key] = value;
      }

      res.send('OK');
      return; // return early!
    }
  }

  res.send('ERROR'); // nobody in the database matches nameToLookup
});


// DELETE a user
//
// To test with curl, run:
//   curl -X DELETE http://localhost:3000/users/Philip
//   curl -X DELETE http://localhost:3000/users/Jane
app.delete('/users/*', function (req, res) {
  var nameToLookup = req.params[0]; // this matches the '*' part of '/users/*' above
  // try to look up in fakeDatabase
  for (var i = 0; i < fakeDatabase.length; i++) {
    var e = fakeDatabase[i];
    if (e.name == nameToLookup) {
      fakeDatabase.splice(i, 1); // remove current element at index i
      res.send('OK');
      return; // return early!
    }
  }

  res.send('ERROR'); // nobody in the database matches nameToLookup
});


// start the server on http://localhost:3000/
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s/', port);
});

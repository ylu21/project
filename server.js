//Rochester HCI 212 - Dandy Study
//Jackson Ding, Yichen Lu, and Tom Craw
//
//Code skeleton uses Professor Guo's CSC 210 lecture code
//From his code the .ajax calls, request handling, and beginning requirements (ex. var express = require('express')) are all used
//We also got the idea of using a javascript table (in RAM) as a fakedatabase
//
//All of the code inside of the URL requests handling has been heavily modified to suit our needs
//The structure of the fakeDatabase is our own

var express = require('express');
var app = express();


// required to support parsing of POST request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static('frontend'));


// simulates a database in memory, to make this example simple and
// self-contained (so that you don't need to set up a separate database).
// note that a real database will save its data to the hard drive so
// that they become persistent, but this fake database will be reset when
// this script restarts. however, as long as the script is running, this
// database can be modified at will.
var fakeDatabase = [
//locations are fixed pixels on image (.jpg), scaling happens in canvas draw
  {area: 'Gleason', hash: '84EBC8AC9D905C20014AD355ECD85110', spot: 'GleasonTable1', taken: false, locationx: 1808, locationy: 216, sizex: 130, sizey: 55},
  {area: 'Gleason', hash: 'AE21AB7EBE326646E7F9A2EEEFC6646C', spot: 'GleasonTable2', taken: false, locationx: 1808, locationy: 320, sizex: 130, sizey: 55},
  {area: 'Gleason', hash: '161987612352A37F58F82D373C2DC4DA', spot: 'GleasonTable3', taken: false, locationx: 1808, locationy: 430, sizex: 130, sizey: 55},
  {area: 'Gleason', hash: 'BFC526BF21C589EA72B93C6B0595C0C0', spot: 'GleasonTable4', taken: false, locationx: 1808, locationy: 526, sizex: 130, sizey: 55},
  {area: 'Gleason', hash: '96DCD789605E3F39947BDE612633A03D', spot: 'GleasonTable5', taken: false, locationx: 1808, locationy: 620, sizex: 130, sizey: 55},
  {area: 'Gleason', hash: '3FC2FFE87B9E30D73A1F171FD1AFCD28', spot: 'GleasonTable6', taken: false, locationx: 1808, locationy: 718, sizex: 130, sizey: 55},
  {area: 'Gleason', hash: '75F7C9E77F7C93744992CEA90D6DE80A', spot: 'GleasonTable7', taken: false, locationx: 1808, locationy: 834, sizex: 130, sizey: 55},
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

var commentDatabase = [

];

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

  // check if user's name is already in database; if so, send an error
  for (var i = 0; i < fakeDatabase.length; i++) {
    var temp = fakeDatabase[i];
    if (temp.spot == mySpot) {
        if(temp.taken==true){
            temp.taken = false;
            response = 'untake';
            console.log(temp.spot + "now NOT taken!");
        }
        else{
            temp.taken = true;
            response = 'take';
            console.log(temp.spot + "now taken!");
        }


      break; // get out of here early!
    }
  }

//comments post request
app.post('/comments', function (req, res) {
    var postBody = req.body;
    
    // check if user's name is already in database; if so, send an error
    for (var i = 0; i < fakeDatabase.length; i++) {
      var temp = fakeDatabase[i];
      if (temp.spot == mySpot) {
          if(temp.taken==true){
              temp.taken = false;
              response = 'untake';
              console.log(temp.spot + "now NOT taken!");
          }
          else{
              temp.taken = true;
              response = 'take';
              console.log(temp.spot + "now taken!");
          }


        break; // get out of here early!
      }
    }

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
  for (var i = 0; i < fakeDatabase.length; i++) {
    var temp = fakeDatabase[i];
    if (temp.hash == mySpot) {
        if(temp.taken==true){
            temp.taken = false;
            console.log(temp.spot + "now NOT taken!");
        }
        else{
            temp.taken = true;
            console.log(temp.spot + "now taken!");
        }


      break; // get out of here early!
    }
  }

  // otherwise add the user to the database by pushing (appending)
  // postBody to the fakeDatabase list
 // fakeDatabase.push(postBody);

  console.log("Yes: "+mySpot);
  res.send('OK');
});


app.get('/maps/*', function (req, res) {
  var userSpot = req.params[0];
  var myArray = [];

  var j = 0;
  for (var i = 0; i < fakeDatabase.length; i++) {

      if(fakeDatabase[i].area==userSpot && fakeDatabase[i].taken){
       myArray[j]=fakeDatabase[i].locationx;
       myArray[j+1]=fakeDatabase[i].locationy;
       myArray[j+2]=fakeDatabase[i].sizex;
       myArray[j+3]=fakeDatabase[i].sizey;
       j=j+4;

       console.log(fakeDatabase[i].locationx);
   }
  }

  res.send(myArray);
  return;

  res.send('{}'); // failed, so return an empty JSON object!
});

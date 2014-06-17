var request = require('request');

var accountSid = require('../config/secrets.js').twilio_sid;
var authToken = require('../config/secrets.js').twilio_token;
var to = require('../config/secrets.js').to;
var from = require('../config/secrets.js').from;

var client = require('twilio')(accountSid, authToken);

request('https://www.duolingo.com/users/slpengy2', function(err, response){
  var json = JSON.parse(response.body);
  var finishedToday = json.streak_extended_today;
  if(!finishedToday){

   client.messages.create({
     body: "Hey! Remember to Duolingo!",
     to: to,
     from: from
   }, function(err, message) {
     process.stdout.write(message.sid);
   }); 
  }
  else {
   client.messages.create({
     body: "Good job Duolingoin'",
     to: to,
     from: from
   }, function(err, message) {
     process.stdout.write(message.sid);
   }); 
  }
});

var request = require('./request');
var client = require('./twilio');

var to = require('../config/secrets.js').to;

request('johnkpaul').then(function(json){
  var finishedToday = json.streak_extended_today;
  if(!finishedToday){
    client.send(to, "Remember to Duolingo today!");
  }
  else {
    client.send(to, "Good job Duolingoing!");
  }
});

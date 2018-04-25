var request = require('./request');
var client = require('./twilio');
var BlueBird = require("bluebird");

var users = require('../config/secrets.js').users;
var me = users.find(function(u){ return u.duolingo_handle === "johnkpaul"; })
console.log(me)

var promises = [];
users.forEach(function(user){
  promises.push(request(user.duolingo_handle));
});

BlueBird.all(promises).then(function(duolingoData){
  var allDuolingoCompleted = duolingoData.every(function(data){
    return data.streak_extended_today === true;
  });
  
  if(!allDuolingoCompleted){
    // TODO call me
    
  }
});



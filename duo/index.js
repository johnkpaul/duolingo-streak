var request = require('./request');
var client = require('./twilio');

var users = require('../config/secrets.js').users;

users.forEach(function(user){
  var to = user.phone_number;

  request(user.duolingo_handle).then(function(json){
    var finishedToday = json.streak_extended_today;
    if(!finishedToday){
      client.send(to, "Remember to Duolingo today!").then(function(message){
        console.log(JSON.stringify(message));
        console.log('Hope to be proud of' + user.duolingo_handle);
      });
    }
    else {
      client.send(to, "Good job Duolingoing!").then(function(){
        console.log(JSON.stringify(message));
        console.log('Be proud of' + user.duolingo_handle);
      });;
    }
  });

});

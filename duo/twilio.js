var accountSid = require('../config/secrets.js').twilio_sid;
var authToken = require('../config/secrets.js').twilio_token;
var from = require('../config/secrets.js').from;

var client = require('twilio')(accountSid, authToken);
var BlueBird = require("bluebird");

module.exports = {
  send: function send(to, message){
    return new BlueBird(function(resolve, reject){
       client.messages.create({
         body: message,
         to: to,
         from: from
       }, function(err, message) {
         if(err) {
           reject(err);
         }
         resolve(message);
       }); 
    });
  }
};

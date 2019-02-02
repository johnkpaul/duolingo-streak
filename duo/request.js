var BlueBird = require("bluebird");
var promisifiedRequest = BlueBird.promisify(require('request'));

module.exports = function(username){
  return promisifiedRequest('http://api.duolingo.com/users/' + username, {
            headers: {
              'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
            }
          }).then(function(message){
    var body = message[1];
    return JSON.parse(body);
  });
};

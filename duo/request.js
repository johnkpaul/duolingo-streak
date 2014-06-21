var Promise = require("bluebird");
var promisifiedRequest = Promise.promisify(require('request'));

module.exports = function(username){
  return promisifiedRequest('https://www.duolingo.com/users/' + username);
}

var fs = require('fs');

if (!fs.existsSync(__dirname + "/secrets.json")) {
  console.error("Config file [conf/secrets.json] missing!");
  console.error("Did you forget to run `npm run decrypt_conf`?");
  process.exit(1);
}

module.exports = require('./secrets.json');

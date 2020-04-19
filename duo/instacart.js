// */10 22-23 * * *
var request = require('./request');
var client = require('./twilio');
var fetch = require('node-fetch');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'instacart'});

var users = require('../config/secrets.js').users;
var aldiCookie = require('../config/secrets.js').instacart.aldi.cookie;

var aldiRes =  fetch("https://shop.aldi.us/v3/containers/aldi/next_gen/retailer_information/content/delivery?source=web&cache_key=e4665d-18934-f-480", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:68.0) Gecko/20100101 Firefox/68.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "x-client-identifier": "web",
        "Cookie": aldiCookie,
        "X-CSRF-Token": "1lAEEZ5ic+y4CIvcn8vMIH0dVA7OzS9HusmSkMTgxmF3Prge8dlkSPIghCzfDmQ73CRFYaMB3lo21Du/J3mcaA=="
    },
    "referrer": "https://shop.aldi.us/store/aldi/info?tab=delivery",
    "method": "GET",
    "mode": "cors"
});
aldiRes.then(res => res.json())
    .then(json => {
        log.info(json)
	    var data = json.container.modules[0]
	    var id = data.id;
	    if(!id.includes("errors_no_availability")){

            log.info(JSON.stringify(json));

	    users.forEach(function(user){
	     var to = user.phone_number;
	    if(!to.includes("267")) return

		  client.send(to, "Aldi has more availability")
                      .then(function(message){
		   log.info("text message sent", message);
		});

	    });


	    }
}).catch((e) => log.error(e))
/*
var costcoRes = fetch("https://sameday.costco.com/v3/containers/costco/next_gen/retailer_information/content/delivery?source=web&cache_key=000c4b-1529-f-53e", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:68.0) Gecko/20100101 Firefox/68.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "x-client-identifier": "web",
        "Cookie": "CostcoCookie",
        "X-CSRF-Token": "G8L/NyQr8rt14r6mpJ7K5Wo9FgRwGyXxkJJ120/cOD0DCGcgQjEEZ/a4x7Nw2g9saqchGCmCLe3ylNzMT3cXWA=="
    },
    "referrer": "https://sameday.costco.com/store/costco/info?tab=delivery",
    "method": "GET",
    "mode": "cors"
}); 


costcoRes.then(res => res.json())
    .then(json => {
	    var data = json.container.modules[0]
	    var id = data.id;
	    if(!id.includes("errors_no_availability")){


	    users.forEach(function(user){
	     var to = user.phone_number;
	    if(!to.includes("267")) return

		  client.send(to, "Costco has more availability").then(function(message){
		   console.log(data);
		});

	    });


	    }
}).catch((e) => console.log(e))
*/

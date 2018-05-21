var client = require('./twilio');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

console.log(__dirname);
const adapter = new FileSync(__dirname +'/db.json')
const db = low(adapter)
 
db.defaults({lastFBText:''})
  .write()

var users = require('../config/secrets.js').users;
var me = users.find(function(u){ return u.duolingo_handle === "johnkpaul"; })


const puppeteer = require('puppeteer');

  (async () => { 
    let text = '';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/HM4HBNY/posts_to_page/');
    try {
    //await page.waitForSelector("#pages_posts_to_page_pagelet");

          await delay(1000);
          text = await page.evaluate(() => {
          return document.getElementById('pages_posts_to_page_pagelet').textContent;
        });
    }
    catch(e){
      await page.screenshot({path: '/tmp/screenshot.png'})
      console.log(e);
      browser.close();
      return;
    }

    var oldValue = db.get('lastFBText').value();
    
      if (oldValue != text){
          //console.log('changed from: ' + oldValue + ' \n\nto\n\n ' + text);
      }
      if (stringsAreDifferent(oldValue, text)){
          console.log('changed from: ' + oldValue + ' to ' + text);
          db.set('lastFBText', text).write();
          client.send(me.phone_number, "There was an update on HM4HBNY \n\n" + text.substring(0, 100)).then(function(message){
            console.log(JSON.stringify(message));
            console.log("sent message to phone");
          });
      } else {
        //console.log('same');
      }
    await browser.close();
    console.log('done');
  })();

function stringsAreDifferent(oldValue, newValue){
  var stringSimilarity = require('string-similarity');

  var similarity = stringSimilarity.compareTwoStrings(oldValue.substring(0, 10), newValue.substring(0, 10)); 
  
  return similarity < .97;

}
function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}

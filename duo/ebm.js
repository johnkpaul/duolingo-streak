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

    text = await page.evaluate(() => {
      return document.getElementById('pages_posts_to_page_pagelet').textContent;
    });

    var oldValue = db.get('lastFBText').value();
    
      if (oldValue != text){
          //console.log('changed from: ' + oldValue + ' \n\nto\n\n ' + text);
      }
      if (stringsAreDifferent(oldValue, text)){
          console.log('changed from: ' + oldValue + ' to ' + text);
          db.set('lastFBText', text).write();
          client.send(me.phone_number, "There was an update on HM4HBNY").then(function(message){
            console.log(JSON.stringify(message));
            console.log("sent message to phone");
          });
      } else {
        //console.log('same');
      }
    await browser.close();
  })();

function stringsAreDifferent(oldValue, newValue){
  var stringSimilarity = require('string-similarity');

  var similarity = stringSimilarity.compareTwoStrings(oldValue.substring(0, 10), newValue.substring(0, 10)); 
  
  return similarity < .97;

}

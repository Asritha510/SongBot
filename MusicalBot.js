const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const token = 'your_telegram_bot_APIkey';
const bot = new TelegramBot(token, {polling: true});
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./serviceAccountkey.json");       
//serviceAccountkey is used to link the Firebase

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

bot.on('message', function(mg){
const options = {
  method: 'GET',
  url: 'https://k-pop.p.rapidapi.com/songs',
  qs: {q: mg.text, by: 'Song Name'},
  headers: {
    'X-RapidAPI-Key': 'your_API_key', //generate API key using KPOP Rapid API
    'X-RapidAPI-Host': 'k-pop.p.rapidapi.com',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
  console.log(error);
	console.log(body);
  if(JSON.parse(body).status =="success" && JSON.parse(body).data != undefined && JSON.parse(body).count != 0){
      let len = mg.text.length;
      console.log(JSON.parse(body).data[0]["Song Name"].slice(0, len));
      if(JSON.parse(body).data[0]["Song Name"].slice(0, len)== mg.text){
        db.collection('SongSearch').add({
          user_id: mg.from.id,
          song : mg.text,
          result : "Artist "+JSON.parse(body).data[0].Artist
        });
        bot.sendMessage(mg.chat.id, "Artist "+JSON.parse(body).data[0].Artist);
        bot.sendMessage(mg.chat.id, "Release Date "+JSON.parse(body).data[0].Date);
        bot.sendMessage(mg.chat.id, "Release Type "+JSON.parse(body).data[0].Release);
        bot.sendMessage(mg.chat.id, "MV "+JSON.parse(body).data[0].Video);
      }
      else{
        db.collection('SongSearch').add({
          user_id: mg.from.id,
          song : mg.text,
          result : "Not Found"
        });
        bot.sendMessage(mg.chat.id, "Sorry, Song not found");
      }
  }
  else{
      db.collection('SongSearch').add({
        user_id: mg.from.id,
        song : mg.text,
        result : "Not Found"
      });
      bot.sendMessage(mg.chat.id, "Song not found")
  }
});
});

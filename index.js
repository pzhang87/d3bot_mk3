const Discord = require('discord.io');
const logger = require('winston');
const https = require('https');
const auth = require('./auth.json');
const channels = require('./channels.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // check to see if command - and check to see if belongs to unrestricted channel
    // later we'll abstract the 2nd check out and change it to a throttle instead
    if (message.substring(0, 1) == '!' && channels.unrestricted.indexOf(channelID) != -1) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            // !killd3bot
            case 'killd3bot':
                bot.sendMessage({
                    to: channelID,
                    message: 'no u'
                });
            break;

            // im@s search
            case 'imas':
              // construct the query
              let query = args.join(' ')
              let url = "https://www.googleapis.com/customsearch/v1" +
                "?key=" + auth.GOOGLE_CUSTOM_SEARCH_KEY +
                "&cx=" + auth.GOOGLE_CUSTOM_SEARCH_ENGINE_ID +
                "&q=" + query;

              // handle the http request here.
              https.get(url, res => {
                let body = '';

                res.on("data", data => {
                  body += data;
                });

                res.on("end", () => {
                  body = JSON.parse(body);
                  let reply = body.items ? body.items[0].link : "No results found."
                  bot.sendMessage({
                    to: channelID,
                    message: reply
                  })
                });

              }).on("error", (err) => {
                logger.info("Error: " + err.message)
                bot.sendMessage({
                  to: channelID,
                  message: "Error: " + err.message
                })
              });
            break;
         }
     }
});

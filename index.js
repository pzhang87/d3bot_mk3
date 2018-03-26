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
                  // look at this horrendous sequence of ternaries. let's fix it later.
                  // 1. check body for search results. if any exist, create object. if not, return 'no result'
                  // 2. while creating object, add another ternary.
                  // 3. TODO: do something that fixes the description, since snippets/htmlsnippets don't play well in discord.
                  let message = body.items
                    ?
                      {
                        to: channelID,
                        message: body.items[0].link,
                        embed: {
                          title: body.items[0].title,
                          description: body.items[0].snippet,
                          url: body.items[0].link,
                          image: body.items[0].pagemap && body.items[0].pagemap.cse_image
                            ?
                              {
                                url: body.items[0].pagemap.cse_image[0].src,
                                height: 200,
                                width: 200
                              }
                            :
                              {}
                        }
                      }
                    :
                      {
                        to: channelID,
                        message: "No results found."
                      }
                  logger.info(message);
                  bot.sendMessage(message)
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

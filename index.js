const Discord = require('discord.io');
const logger = require('winston');
const https = require('https');
const _ = require('lodash')

const auth = require('./auth.json');
const channels = require('./channels.json');

// import * from 'search';
const Wikiquery = require('./wikiquery.js');

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

function onReady(evt){
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');

  channels.unrestricted.forEach( (channel) => {
    bot.sendMessage({
      to: channel,
      message: "`d3bot online`"
    })
  })
}

async function onMessage(user, userID, channelID, message, evt){

  var commands = {
    'killd3bot': () => { return 'no u'},
    // 'async': async (args) => {
    //   let promise = new Promise((resolve, reject) => {
    //     setTimeout( () => resolve("done!", 10000) )
    //   });
    //
    //   let result = await promise;
    //   logger.info(result)
    //   return result;
    // },
    'im@s': async (args) => {
      try {
        var search = new Wikiquery('im@s', args);

        let data = await search.find(search.url);
        logger.info(data);

        return search.mwToMessageFormatter(data);
      }

      catch (error) {
        return "search failed. error: " + error
      }
    },

    'imas': async (args) => {
      try {
        var search = new Wikiquery('imas_gcse', args);

        let data = await search.find(search.url);
        logger.info(data);

        return search.gcseToMessageFormatter(data);
      }

      catch (error) {
        return "search failed. error: " + error
      }
    },

    'feh': async (args) => {
      try {
        var search = new Wikiquery('feh', args);

        let data = await search.find(search.url);
        logger.info(data);

        return search.gcseToMessageFormatter(data);
      }

      catch (error) {
        return "search failed. error: " + error
      }
    },

    'default': () => { return 'unrecognized command'}
  }

  // check if valid message.
  if (message.substring(0, 1) == '!' && channels.unrestricted.indexOf(channelID) != -1) {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);

    logger.info(cmd + " " + _.has(commands, cmd))

    var reply = _.has(commands, cmd) ? await commands[cmd](args) : commands['default']();

    bot.sendMessage({
      to: channelID,
      message: reply.message ? reply.message : reply,
      embed: reply.embed ? reply.embed : {}
    })

  }
}

bot.on('ready', onReady);
bot.on('message', onMessage);

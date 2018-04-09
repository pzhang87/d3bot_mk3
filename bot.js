const Discord = require('discord.io');
const logger = require('winston');
const https = require('https');
const _ = require('lodash')

const token = process.env.AUTH_TOKEN;
const channels = JSON.parse(process.env.CHANNELS);
const env = process.env.NODE_ENV;
const ownerChannel = process.env.OWNER_CHANNEL;

// import * from 'Commands';
const Commands = require('./commands.js')

// bot specific
const COMMAND_PREFIX = "?"

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: token,
   autorun: true
});

function onReady(evt){
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');

  // alerts dev-server channel when d3bot is on.
  bot.sendMessage({
    to: ownerChannel,
    message: "`d3bot (" + env + ") online`"
  })
  // })
}

async function onMessage(user, userID, channelID, message, evt){

  // logger.info("channel: " + channelID )

  // temp greeting
  if (message.substring(0, 8) == "hi d3bot"){
    bot.sendMessage({
      to: channelID,
      message: "hi `" + user + "`"
    })
  }

  // check if valid message. also check if channel is not restricted.
  if (message.substring(0, 1) == COMMAND_PREFIX) {

    // separate out the command from the arguments.
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    var reply;

    try {
      reply = _.has(Commands.list, cmd) ? await Commands.list[cmd](cmd, args) : Commands['default']();
    }

    catch (error) {
      reply.message = "error: " + error
    }

    bot.sendMessage({
      to: channelID,
      message: reply.message || reply,
      embed: reply.embed ? reply.embed : {}
    })

  }
}

bot.on('ready', onReady);
bot.on('message', onMessage);

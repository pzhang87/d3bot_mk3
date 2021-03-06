const Discord = require('discord.io');
const logger = require('winston');
const https = require('https');
const _ = require('lodash')

const token = process.env.AUTH_TOKEN;
const channels = JSON.parse(process.env.CHANNELS);
const env = process.env.NODE_ENV;
const ownerChannel = process.env.OWNER_CHANNEL;

const moment = require('moment')

const COMMAND_PREFIX = "?"

// import * from 'Commands';
const Commands = require('./commands.js')

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
  logger.info('Time: ' + moment().format())

  // alerts dev-server channel when d3bot is on.
  bot.sendMessage({
    to: ownerChannel,
    message: "d3bot `(" + env + ")` online at `" + moment().format("dddd, MMMM Do YYYY, h:mm:ss a (ZZ)") + "`"
  })
  // })
}

async function onMessage(user, userID, channelID, message, evt){
  if (message.substring(0, 8) === "hi d3bot"){
    var reply = {
      to: channelID,
      message: "hi `" + user + "`"
    }
    bot.sendMessage(reply)
  }

  // check if valid message. also check if channel is not restricted.
  if (message.startsWith(COMMAND_PREFIX)) {

    // separate out the command from the arguments.
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    // set up config to be passed into the handler. is an object so that we don't have to rely on arg order
    var cmdConfig = {
      cmd: cmd,
      args: args,
      userID: userID
    }

    // reply should be an object.
    var reply;

    try {
      reply = await Commands.handle(cmdConfig);
      if (reply && reply.message){
        reply.to = channelID,
        bot.sendMessage(reply)
      } else {
        logger.info("bot did not reply")
      }
    }

    catch (error) {
      logger.info('error: ' + error)
    }

  }
}

bot.on('ready', onReady);
bot.on('message', onMessage);

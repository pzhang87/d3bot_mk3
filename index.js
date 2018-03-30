const Discord = require('discord.io');
const logger = require('winston');
const https = require('https');
const _ = require('lodash')

const auth = require('./config/auth.json');
const channels = require('./config/channels.json');

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
   token: auth.token,
   autorun: true
});

function onReady(evt){
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');

  channels.unrestricted.forEach( (channel) => {
    // disabled for now.

    // bot.sendMessage({
    //   to: channel,
    //   message: "`d3bot online`"
    // })
  })
}

async function onMessage(user, userID, channelID, message, evt){

  // temp greeting
  if (message.substring(0, 8) == "hi d3bot" && channels.unrestricted.indexOf(channelID) != -1){
    bot.sendMessage({
      to: channelID,
      message: "hi `" + user + "`"
    })
  }

  // check if valid message. also check if channel is not restricted.
  if (message.substring(0, 1) == '!' && channels.unrestricted.indexOf(channelID) != -1) {

    // separate out the command from the arguments.
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    var reply;

    try {
      reply = _.has(Commands, cmd) ? await Commands[cmd](cmd, args) : Commands['default']();
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

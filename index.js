const Discord = require('discord.io');
const logger = require('winston');
const https = require('https');
const _ = require('lodash')

const auth = require('./auth.json');
const channels = require('./channels.json');

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
      reply.message = error
    }

    bot.sendMessage({
      to: channelID,
      message: reply.message,
      embed: reply.embed ? reply.embed : {}
    })

  }
}

bot.on('ready', onReady);
bot.on('message', onMessage);

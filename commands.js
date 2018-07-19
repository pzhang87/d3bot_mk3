const Search = require('./search.js');
const DKPL = require('./dkpl.js');
const logger = require('winston');
const Emote = require('./emote.js')

var list = {
  killd3bot() { return { message: 'no u'} },
  '2hu': Search.find,
  'im@s': Search.find,
  'imas': Search.find,
  'feh': Search.find,
  'kc': Search.find,
  'ytv': Search.find,
  'dkpl': DKPL.handle,
  'info': userInfo,
  'mirimote': Emote.handle,
  'deremote': Emote.handle,
  commands (){
    return { message: "available commands:\n\n" +  Object.keys(this).map(key => {return "`" + key.toString() + "`"}).join(', ') }
  }
}

// cmdConfig is an object with 3 params: cmd, args, and userID

function userInfo(cmdConfig){
  var message = (process.env.NODE_ENV == "development")
    ? "Your discord ID is: " + cmdConfig.userID
    : "the only info u need is that `u suck`"
  return { message: message }
}

function handle(cmdConfig){
  try {
    return list[cmdConfig.cmd](cmdConfig)
  }
  catch (error){
    logger.info("error: " + error)
  }
}

module.exports = {
  handle: handle
}

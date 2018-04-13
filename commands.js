const Search = require('./search.js');
const DKPL = require('./dkpl.js');
const logger = require('winston')

var list = {
  killd3bot() { return { message: 'no u'} },
  '2hu': Search.find,
  'im@s': Search.find,
  'imas': Search.find,
  'feh': Search.find,
  'kc': Search.find,
  'dkpl': DKPL.handle,
  'info': userInfo,
  commands (){
    return { message: "available commands:\n\n" +  Object.keys(this).map(key => {return "`" + key.toString() + "`"}).join(', ') }
  }
}

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
    logger.info("unrecognized command: " + cmdConfig.cmd)
  }
}

module.exports = {
  handle: handle
}

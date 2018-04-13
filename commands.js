const _ = require('lodash');
const Search = require('./search.js');
const DKPL = require('./dkpl.js');

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
  var message;
  if (process.env.NODE_ENV == "development"){
    message = "Your discord ID is: " + cmdConfig.userID
  } else {
    message = "the only info u need is that `u suck`"
  }
  return { message: message }
}

// note to self: default is a special keyword in JS because of switches, so don't use it willy nilly
function defaultCmd() {
  return { message: 'unrecognized command' }
}

async function handle(cmdConfig){
  return _.has(list, cmdConfig.cmd) ? await list[cmdConfig.cmd](cmdConfig) : defaultCmd();
}

module.exports = {
  handle: handle
}

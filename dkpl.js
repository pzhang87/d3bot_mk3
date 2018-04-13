_ = require('lodash')

var dkplist = {
  defaultCmd: defaultCmd,
  register: register,
  add: roll
}

function defaultCmd(){
  return { message: "unrecognized command" }
}

// pseudocode
async function register(cmdConfig){
  var reply;

  // make an http request to see if the user is registered.

  // if so, register the user. if not, tell the user isn't registered.

  return reply;
}

async function roll(cmdConfig){
  // make http request to the server, passing in the userID from cmdConfig.
  // return results of what you rolled?
}

async function handle(cmdConfig){
  return _.has(dkplist, cmdConfig.cmd) ? await dkplist[cmdConfig.cmd](cmdConfig) : defaultCmd();
}

module.exports = {
  handle: handle
}

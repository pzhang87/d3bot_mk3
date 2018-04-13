const logger = require('winston')

var dkplist = {
  register: register,
  pull: pull
}

// pseudocode
async function register(cmdConfig){
  var reply;

  // make an http request to see if the user is registered.

  // if so, register the user. if not, tell the user isn't registered.
  reply = { message: "feature unimplemented. you are not registered."}
  return reply;
}

async function pull(cmdConfig){
  // make http request to the server, passing in the userID from cmdConfig.
  // return results of what you rolled?

  return { message: "feature unimplemented. you did not pull."}
}

function handle(cmdConfig){
  logger.info(cmdConfig)
  try {
    return dkplist[cmdConfig.args[0]](cmdConfig)
  }
  catch (error) {
    logger.info("unrecognized command: " + cmdConfig.cmd + " " + cmdConfig.args.join(" "))
  }
}

module.exports = {
  handle: handle
}

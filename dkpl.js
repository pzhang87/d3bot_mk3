const logger = require('winston')

var dkplist = {
  register: register,
  pull: pull,
  roll: pull,
  commands (){
    return { message: "available dkpl commands:\n\n" +  Object.keys(this).map(key => {return "`" + key.toString() + "`"}).join(', ') }
  }
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
    if (cmdConfig.args.length){
      return dkplist[cmdConfig.args[0]](cmdConfig)
    } else {
      return dkplist.commands();
    }
  }
  catch (error) {
    logger.info("error: " + error)
    return null;
  }
}

module.exports = {
  handle: handle
}

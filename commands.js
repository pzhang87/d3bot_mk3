const Search = require('./search.js');

var list = {
  killd3bot() { return 'no u' },
  '2hu': Search.find,
  'im@s': Search.find,
  'imas': Search.find,
  'feh': Search.find,
  'kc': Search.find,
  '+dkpl': () => { return "that command is unimplemented. you currently have 0 dkpls" },
  '-dkpl': () => { return "that command is unimplemented. you currently have 0 dkpls" },
  commands (){
    return "available commands:\n\n" +  Object.keys(this).map(key => {return "`!" + key.toString() + "`"}).join(', ')
  }
}

// note to self: default is a special keyword in JS because of switches, so don't use it willy nilly
function defaultCmd() { return 'unrecognized command' }

module.exports = {
  list: list,
  default: defaultCmd
}

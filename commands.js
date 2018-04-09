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

function default() { return 'unrecognized command' }

module.exports = {
  list: list,
  default: default
}

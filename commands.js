const Search = require('./search.js');

module.exports = {
  killd3bot() { return 'no u' },
  '2hu': Search.find,
  'im@s': Search.find,
  'imas': Search.find,
  'feh': Search.find,
  'kc': Search.find,
  '+dkpl': () => { return "that command is unimplemented. you currently have 0 dkpls" },
  '-dkpl': () => { return "that command is unimplemented. you currently have 0 dkpls" },
  default() { return 'unrecognized command' },
  commands (){
    return "available commands:\n\n" +  Object.keys(this).map(key => {return "`!" + key.toString() + "`"}).join(', ')
  }
}

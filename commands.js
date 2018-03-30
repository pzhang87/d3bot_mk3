const Search = require('./search.js');

module.exports = {
  'killd3bot': () => { return 'no u' },
  'im@s': Search.find,
  'imas': Search.find,
  'feh': Search.find,
  '+dkpl': () => { return "that command is unimplemented. you currently have 0 dkpls" },
  '-dkpl': () => { return "that command is unimplemented. you currently have 0 dkpls" },
  'default': () => { return 'unrecognized command'}
}

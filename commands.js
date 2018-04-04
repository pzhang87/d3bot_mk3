const Search = require('./search.js');

module.exports = {
  'killd3bot': () => { return 'no u' },
  '2hu': Search.find,
  'im@s': Search.find,
  'imas': Search.find,
  'feh': Search.find,
  'kc': Search.find,
  '+dkpl': () => { return "that command is unimplemented. you currently have 0 dkpls" },
  '-dkpl': () => { return "that command is unimplemented. you currently have 0 dkpls" },
  'default': () => { return 'unrecognized command' },
  'commands': () => { return `available commands are: !2hu, !imas, !im@s, !feh, !kc, !killd3bot, !+dkpl, !-dkpl` }
}

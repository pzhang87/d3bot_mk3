# d3bot mk3: return of the d3bot

discord bot for personal use. but I guess you could use it if you want to?

### features/commands:
* **!imas** [query] - uses Google Custom Search Engine and returns first relevant result from Project-Im@s wiki. Provides embed information for Discord.
* **!im@s** [query] - uses Mediawiki API native to Project-Im@s wiki to return first relevant result. No embed information.
* **!feh** [query] - similar to !im@s, except searches the FEHeroes Gamepedia wiki.
* **!kc** [query] - queries the Kancolle Wikia API for the search term and returns the first relevant result. Provides embed information for Discord via page snippet.
* **!killd3bot** - test command, doesn't actually do anything.

## how to use:

no fancy build processes yet. maybe afterwards.
* `git clone`, `npm install --save`
* go into the `config` folder, add keys, discord channelIDs, and other auth info in the `*_example.json` files, and rename them to `*.json`.
* `node index.js` to start
* open discord and start using commands in the channels you provided

## issues/todo:

* can still improve mediawiki search. query sometimes works better than opensearch, and additional configuration on a wiki by wiki basis leads to more meaningful results. could just crawl the namespaces and do fuzzy matching.
* fully migrate to ES6 - transpiler, linter, etc. whatever
* deploy d3bot to an actual hosting platform so it has uptime
* WRITE TESTS

## ideas:

* dkpl game - earn and spend dkpl points. probably gonna need a different repo for that - database + API + user interface.

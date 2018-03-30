// export function test(){
//   return 'test function'
// }
const querystring = require('querystring');
const logger = require('winston');

const _ = require('lodash');
const axios = require('axios');

const sites = require('./sites.json')

async function find(name, args){

  // since we're searching, we'll auto-join the rest of the args.
  var query = args.join(' ');
  var site = _.find(sites.list, ['name', name])
  var type = site.type

  var url = site.base_url + "?" + querystring.stringify(site.params) +
      "&" + site.method + "=" + encodeURIComponent(query)

  try {
    var res = await axios.get(url);
    var reply = format[type](res.data)
    return reply;

  } catch (error) {
    logger.info("error: " + error)
    return error;
  }
}

// gross global variable but idk what else to do here yet

var format = {
  mediawiki: function(data){
    return { message: data[1].length ? data[3][0].toString() : "No results found." }
  },

  gcse: function(data){
    if (data.items){
      return {
        message: data.items[0].link,
        embed: {
          title: data.items[0].title,
          description: data.items[0].snippet.replace(/\n|\r/g, ""),
          url: data.items[0].link,
          thumbnail: data.items[0].pagemap && data.items[0].pagemap.cse_thumbnail
            ?
              {
                url: data.items[0].pagemap.cse_thumbnail[0].src,
                height: 200,
                width: 200
              }
            :
              {}
        }
      }
    } else {
      return { message: "No items found." }
    }
  }
}

module.exports = {
  find: find
}

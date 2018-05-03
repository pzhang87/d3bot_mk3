// export function test(){
//   return 'test function'
// }
const querystring = require('querystring');
const logger = require('winston');

const _ = require('lodash');
const axios = require('axios');

const sites = require('./config/sites.json')

async function find(cmdConfig){

  // since we're searching, we'll auto-join the rest of the args.
  var query = cmdConfig.args.join(' ');
  var site = _.find(sites.list, ['name', cmdConfig.cmd])
  var format = site.format


  var url = site.base_url + site.endpoint + "?" + querystring.stringify(site.params) +
      "&" + site.method + "=" + encodeURIComponent(query)

  try {
    var res = await axios.get(url);
    var reply = formatter[format](res.data, site)

    return reply;

  } catch (error) {
    logger.info("error: " + error)
    return error;
  }
}

// gross global variable but idk what else to do here yet

var formatter = {
  mediawiki: function(data, site){
    if (data.query.search.length){
      var link = site.base_url + site.page_prefix + encodeURIComponent(data.query.search[0].title)
      return {
        // embed: {
        //   title: data.query.search[0].title,
        //   url: link
        // },
        message: link
      }
    } else {
      return { message: "No items found." }
    }
  },

  gcse: function(data){
    if (data.items){
      return {
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
        },
        message: data.items[0].link,
      }
    } else {
      return { message: "No items found." }
    }
  },

  wikia: function(data){
    if (data.items){
      return {
        embed: {
          title: data.items[0].title,
          description: data.items[0].snippet,
          url: data.items[0].url
        },
        message: data.items[0].url
      }
    } else {
      return { message: "No items found." }
    }
  },

  youtube: function(data){
    if (data.items){
      return { message: "https://youtu.be/" + data.items[0].id.videoId };
    } else {
      return { message: "No items found." }
    }
  }
}

module.exports = {
  find: find
}

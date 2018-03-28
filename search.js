// export function test(){
//   return 'test function'
// }
const _ = require('lodash');

const sites = require('./sites.json')

function mwQueryBuilder(name, query){
  // lodash method that crawls the sites object and returns the object if the name property matches.
  let site = _.find(sites.list, ['name', name])
  if (!_.isUndefined(site)) {
    return site.base_url + "&search=" + encodeURIComponent(query.toString())
  }
}

function mwToMessageFormatter(channelID, body){
  if (body[1].length){
    return {
      to: channelID,
      message: body[3][1]
    }
  }
}

function gcseToMessageFormatter(channelID, body){
  if (body.items){
    return {
      to: channelID,
      message: body.items[0].link,
      embed: {
        title: body.items[0].title,
        description: body.items[0].snippet,
        url: body.items[0].link,
        thumbnail: body.items[0].pagemap && body.items[0].pagemap.cse_thumbnail
          ?
            {
              url: body.items[0].pagemap.cse_thumbnail[0].src,
              height: 200,
              width: 200
            }
          :
            {}
      }
    }
  } else {
    return {
      to: channelID,
      message: "No results found."
    }
  }
}

module.exports = {
  mwQueryBuilder: mwQueryBuilder,
  mwToMessageFormatter: mwToMessageFormatter,
  gcseToMessageFormatter: gcseToMessageFormatter
}

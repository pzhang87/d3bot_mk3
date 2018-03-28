// export function test(){
//   return 'test function'
// }
const _ = require('lodash');

const sites = require ('./sites.json')

function mwQueryBuilder(name, args){
  let query = args.join(' ')

  // lodash method that crawls the sites object and returns the object if the name property matches.
  let site = _.find(sites, ['name', name])
  if (!_.isUndefined(site)) {
    return site.base_url + "&search=" + encodeURIComponent(query.toString())
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

// function responseHandler(res, callback){
//   let body = '';
//
//   res.on("data", (data){
//     body += data
//   })
//
//   res.on("end", (callback) => {
//
//   })
// }

module.exports = {
  test: test
  search: search
}

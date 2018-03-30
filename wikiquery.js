// export function test(){
//   return 'test function'
// }
const querystring = require('querystring');

const _ = require('lodash');
const axios = require('axios');

const sites = require('./sites.json')

module.exports = class Wikiquery {
  constructor(name, args){
    this.name = name;
    this.query = args.join(' ');
    this.url = this.urlBuilder(name, this.query);
  }
  urlBuilder(){
    var site = _.find(sites.list, ['name', this.name])
    if (!_.isUndefined(site)) {
      return site.base_url + "?" + querystring.stringify(site.params) +
        "&" + site.method + "=" + encodeURIComponent(this.query)
    }
  }

  async find(url){
    try {
      var res = await axios.get(url);
      var data = res.data;
      console.log("test: " + res.data);
      return res.data;
    } catch (error) {
      console.log("error: " + error)
    }
  }

  mwToMessageFormatter(data){
    return data[1].length ? data[3][0].toString() : "No results found."
  }

  gcseToMessageFormatter(data){
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
      return "No items found."
    }
  }
}

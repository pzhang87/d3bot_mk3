const querystring = require('querystring');
const logger = require('winston');

const _ = require('lodash');
const axios = require('axios');

const emotes = require('./config/sites.json').emotes

async function handle(cmdConfig){
  var { cmd, args } = cmdConfig
  var emoteSet = _.find(emotes.list, ['name', cmd])
  let url = emotes.base_url + emoteSet.endpoint

  try {
    return await axios.get(url, {
      headers: emotes.headers,
      responseType: 'json'
    }).then( (response) => {
      var reply = {};
      // wtf is this why does this work
      var album = response.data.data

      // set the reply message here

      // album should contain images
      if (album.images && album.images.length >= 1){
        var showList = args.indexOf('--list') !== -1 ? true : false
        var imagesList = album.images.map((image, index) => {
          return image.description || index + 1
        }).map((name) => {return '`' + name + '`'}).join(", ")

        if (args.length >= 1 && !showList){
          var imageFound = _.find(album.images, ['description', args[0]])
          logger.info("image found? ", imageFound)
          reply.message = imageFound
            ? imageFound.link
            : "emote not found. available emotes: " + imagesList
        } else if (args.length == 1 && showList) {
          reply.message = imagesList
        } else {
          reply.message = album.images[_.random(album.images.length)].link
        }
      } else {
        reply.message = "emote album contains no images"
      }


      return reply;

    })
  } catch (error) {
    logger.info("error: " + error)
    return error;
  }
}

module.exports = {
  handle: handle
}

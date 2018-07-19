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

      if (album.images && album.images.length >= 1 && args.length >= 1){
        var imageFound = _.find(album.images, ['description', args[0]])
        logger.info("image found? ", imageFound)
        reply.message = imageFound ? imageFound.link : album.link
      } else {
        reply.message = "emotes not found"
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

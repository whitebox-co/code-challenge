const fetch = require('node-fetch');
const {
  buildImageStringForMany,
  buildImageStringForSelected,
} = require('./stringBuilder');

// ### Keeps same images persistent for the duration of the server session
const itemCache = {};

const retrieveItems = async (json) => {
  const { guid } = json;
  if (itemCache[guid]) {
    return itemCache[guid];
  } else {
    try {
      const response = await fetch('https://picsum.photos/300/300/?random');
      const image = buildImageStringForMany(response.url);
      const returnJson = { ...json, image };
      itemCache[guid] = returnJson;
      return returnJson;
    } catch (e) {
      console.error('Error fetching random image:', e);
    }
  }
};

const retrieveOne = (guid) => {
  const selected = itemCache[guid];
  const image = buildImageStringForSelected(selected.image);
  return { ...selected, image };
};

const retrieveOthers = (json) => {
  const { guid, tags } = json;
  const similarItems = new Set();
  for (let otherItem in itemCache) {
    if (otherItem !== guid) {
      const otherItemTags = itemCache[otherItem].tags;
      for (let otherTag of otherItemTags) {
        if (tags.includes(otherTag)) {
          similarItems.add(itemCache[otherItem]);
        }
      }
    }
  }
  return [...similarItems];
};

module.exports = { retrieveItems, retrieveOne, retrieveOthers };

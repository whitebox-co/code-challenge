const buildImageStringForSelected = (url) => {
  const number = grabImageNum(url);
  return `https://i.picsum.photos/id/${number}/1200/900.jpg`;
};

const buildImageStringForMany = (url) => {
  const number = grabImageNum(url);
  return `https://i.picsum.photos/id/${number}/720/960.jpg`;
};

//seems to not be formatting as expected so ignored using
// const buildImageStringForRelated = (url) => {
//   const number = grabImageNum(url);
//   return `https://i.picsum.photos/id/${number}/100/140.jpg`;
// };

const grabImageNum = (url) => {
  let imageNum;
  for (let i = 26; i < 32; i += 1) {
    if (url[i] === '/') {
      imageNum = url.slice(27, i);
    }
  }
  return imageNum;
};

module.exports = { buildImageStringForMany, buildImageStringForSelected };

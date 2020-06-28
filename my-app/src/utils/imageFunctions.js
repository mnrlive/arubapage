// eslint-disable-next-line
// const regex = /^(.*[\\\/])(.*)/;
// const regex2 = /[^\/]*(.*)/;


// export const imageBintiCuater = function (ora) {
//   try {
//     // return ('https://arubapage.com/static/media/' + (regex.exec(ora._embedded['wp:featuredmedia'][0].source_url)[2]) + '.1');
//     return require("../images/24ora.jpg");
//   } catch (e) {
//     return require("../images/24ora.jpg");
//   }
// };

export const imageSports = function (sports) {
  let url = sports._embedded["wp:featuredmedia"][0].source_url;
  let httpUrl = url.replace(/^https:\/\//i, "http://");
  try {
    return 'https://images.weserv.nl/?url=' + httpUrl + '&w=800&h=800';
  } catch (e) {
    return require("../images/297sport.JPG");
  }
};
const regex = /^(.*[\\/])(.*)\.[^.]+$/;

export const imageRuba = function(arubiano) {
  try {
      // only 900 x 425 format
      return (require('../webimages/' + (regex.exec(arubiano._embedded['wp:featuredmedia'][0].source_url)[2]) + '-900x425.jpg'));
  } catch (e) {
      try {
          return ((require('../webimages/' + (regex.exec(arubiano._embedded['wp:featuredmedia'][0].source_url)[2]) + '-900x425.jpeg')));
      }catch(e){

      }
      return require('../images/eArubiano.PNG');
  }
}

export const imageTest = function(boletin) {
  try {
      return ((require('../webimages/' + (regex.exec(boletin._embedded['wp:featuredmedia'][0].source_url)[2]) + '-620x330.jpg')));
  } catch (e) {
      return require('../images/boletinHD.jpg');
  }
}
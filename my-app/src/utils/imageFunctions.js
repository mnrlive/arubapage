// eslint-disable-next-line
const regex = /^(.*[\\\/])(.*)/;

export const imageRuba = function(arubiano) {
            try {
                return (('https://arubapage.com/static/media/' + (regex.exec(arubiano._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url)[2]) + '.1'));
            } catch (e) {
                return require('../images/eArubiano.PNG');
            }
}

export const imageTest = function(boletin) {
            try {
                return ('https://arubapage.com/static/media/' + (regex.exec(boletin._embedded['wp:featuredmedia'][0].source_url)[2]) + '.1');
            } catch (e) {
                return require('../images/boletinHD.jpg');
            }
}

export const imageBintiCuater = function (ora) {
                    try {
                        return ('https://arubapage.com/static/media/' + (regex.exec(ora._embedded['wp:featuredmedia'][0].source_url)[2]) + '.1');
                    } catch (e) {
                        return require('../images/24ora.jpg');
                    }
}

// export const imageSolo = function (solo) {
//                     try {
//                         return ('https://arubapage.com/static/media/' + (regex.exec(solo._embedded['wp:featuredmedia'][0].media_details['file'])[2]) + '.1');
//                     } catch (e) {
//                         return require('../images/boletinHD.jpg');
//                     }
// }

export const imageSports = function (sports) {
    const d = new Date();
                    try {
                        return ('http://www.297sports.com/wp-content/uploads/' + d.getFullYear() + '/' + (("0" + (d.getMonth() + 1)).slice(-2)) + '/' + (regex.exec(sports._embedded['wp:featuredmedia'][0].source_url)[2]));
                    } catch (e) {
                        return require('../images/297sport.JPG');
                    }
}
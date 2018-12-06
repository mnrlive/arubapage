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
                        return ((require('../images/' + (regex.exec(ora._embedded['wp:featuredmedia'][0].source_url)[2]) + '.jpg')));
                    } catch (e) {
                        return require('../images/24ora.jpg');
                    }
}
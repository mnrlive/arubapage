import _ from 'lodash'
import ogs from 'open-graph-scraper';

export const mapOpenGraphImageResults = (services, setState) => {
        if (services.noticiaCla && services.noticiaCla.length > 0) {
            let noticiaCla = _.cloneDeep(services.noticiaCla);
            let done = _.after(noticiaCla.length, () => {
                setState(state => ({
                    ...state,
                    services: {
                        ...state.services,
                        noticiaCla
                    }
                }));
            })
            // eslint-disable-next-line
            noticiaCla.map((cla, index) => {
                const options = { 'url': 'https://wordpressmade.com/' + cla.link }
                ogs(options)
                    .then(function (result) {
                        cla.imgUrl = result.data.ogImage.url;
                        done();
                    })
                    .catch(function (error) {
                        console.log('error:', error);
                    })
            })
        }
}
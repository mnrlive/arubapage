export const fetchDataFromSocialMedia = function(setState) {
    Promise.all([
        fetch('https://sitelift.nl/wp-json/wp/v2/posts?_embed')
            .then((response) => response.json())
            .then(response => {
                const boletins = {
                    boletins: response,
                    loaded: true
                }
            }),
        fetch('https://provider.arubapage.com/https://publish.twitter.com/oembed?url=https://twitter.com/arubapage/status/977901243275403265')
            .then((response) => response.json())
            .then(response => {
                const twitters = {
                    twitters: response,
                    loaded: true
                    }
            }),
        fetch('https://api.instagram.com/oembed/?url=http://instagr.am/p/Bgoyxryg-eD/')
            .then((response) => response.json())
            .then(response => {
                const instagrams = {
                    instagrams: response,
                    loaded: true
                }
            })
    ]);

}

const articleCount = 12;
const proxy = 'https://provider.arubapage.com/';

export const arubaNative = `${proxy}https://arubanative.com/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const noticiaCla = `${proxy}https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.noticiacla.com%2Frss`;
// export const awe24 = proxy + 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.awe24.com%2Frss`;
export const eArubianoNews = `${proxy}https://earubianonews.com/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const aweMainta = `${proxy}https://awemainta.com/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const _24ora = `${proxy}https://24ora.com/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const boletinExtra = `${proxy}https://boletinextra.com/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const masNoticia = `${proxy}https://www.masnoticia.com/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const diario = `${proxy}https://www.diario.aw/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const focus = `${proxy}https://focus.aw/index.php/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const batiBleki =`${proxy}https://www.visitaruba.com/blog/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const bonDia = `${proxy}https://www.bondia.com/wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
export const sports = `${proxy}http://www.297sports.com/wp-json//wp/v2/posts?_embed&per_page=${articleCount}`;
export const solo = `${proxy}http://solodipueblo.com//wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;
// export const xclusivo = `${proxy}http://xclusivomagazine.com//wp-json/wp/v2/posts?_embed&per_page=${articleCount}`;


const services = {
    arubaNative,noticiaCla,eArubianoNews,aweMainta,_24ora,boletinExtra,masNoticia,diario,focus,batiBleki,bonDia,sports,solo
}
export default services;
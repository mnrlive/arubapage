// Cathing erros and showing default
export const imageErrorCheck = function (provider) {
  const regEx = /[-a-zA-Z0-9@:%_.~#?&=]{2,256}\.[a-z]{2,4}/;
  const link = regEx.exec(provider.link);
  // const proxy = 'https://images.weserv.nl/?url=';
  // const resize = '&w=300&h=300';

  if (link[0] === "arubanative.com") {
    try {
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    } catch (e) {
      return require("../images/arubaNative.PNG");
    }
  }
  if (link[0] === "www.bondia.com") {
    try {
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    } catch (e) {
      return require("../images/bondia.PNG");
    }
  }
  if (link[0] === "focus.aw") {
    try {
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    } catch (e) {
      return require("../images/focus.PNG");
    }
  }
  if (link[0] === "xclusivomagazine.com") {
    try {
      return 'https://images.weserv.nl/?url=' + provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url + '&w=800&h=800';
    } catch (e) {
      return require("../images/focus.PNG");
    }
  }
  if (link[0] === "24ora.com") {
    try {
      return 'https://images.weserv.nl/?url=' + provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url + '&w=800&h=800';
    } catch (e) {
      return require("../images/24ora.jpg");
    }
  }
  if (link[0] === "www.eanews.com") {
    try {
      // const regexErubiano = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
      .source_url
    } catch (e) {
      return require("../images/eArubiano.PNG");
    }
  }
  if (link[0] === "www.awemainta.com") {
    try {
      const aweM = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
      let initial_url;
      let processed_url;
      initial_url = aweM.exec(provider.content.rendered)[0];
      processed_url = "http" + initial_url.slice(5);
      return 'https://images.weserv.nl/?url=' + processed_url + '&w=800&h=800';
    } catch (e) {
      return require("../images/aweMainta.PNG");
    }
  }
  // if (link[0] === "awe24.com") {
  //   // const regImage = /src\s*=\s*"(.+?)"/;
  //   const regImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
  //   try {
  //     return regImage.exec(provider.content.rendered)[0];
  //   } catch (e) {
  //     return require("../images/awe.PNG");
  //   }
  // }
  if (link[0] === "www.297sports.com") {
    try {
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    } catch (e) {
      return require("../images/coolFm.png");
    }
  }
  if (link[0] === "diario.aw") {
    try {
      return provider.jetpack_featured_media_url;
    } catch (e) {
      return require("../images/diario.PNG");
    }
  }
  if (link[0] === "masnoticia.com") {
    try {
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    } catch (e) {
      return require("../images/masnoticia.PNG");
    }
  }
  if (link[0] === "solodipueblo.com") {
    try {
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    } catch (e) {
      return require("../images/soloDefaultimg.jpg");
    }
  }
  if (link[0] === "www.visitaruba.com") {
    try {
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    } catch (e) {
      return require("../images/batiBlekiHD.PNG");
    }
  }
  if (link[0] === "xclusivomagazine.com") {
    try {
      return provider._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    } catch (e) {
      return require("../images/focus.PNG");
    }
  }
};

import React from "react"
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';
import NewsItem from '../components/common/NewsItem/NewsItem';
import NewsItem2 from '../components/common/NewsItem/NewsItem2';
import { imageErrorCheck } from "../utils/imageErrorCheck";
import { imageRuba, imageTest,imageBintiCuater, imageSports } from "../utils/imageFunctions";

export const formatNewsSources = (services) => {
  // TODO: work this into newsitem2;
  let noticiaCla = services.noticiaCla && services.noticiaCla.map((cla, index) => {
    return (
        <NewsItem key={index} index={index} cla={cla}  />
    )
  })
// e arubiano Crawl for images!
  let eArubianoNews = services.eArubianoNews && services.eArubianoNews.map((arubiano, index) => {
      return (
        <NewsItem2 key={index} index={index} newsSource={arubiano} provider="earubianonews.com" imgFunction={imageRuba(arubiano)} />
      )
  })
  //awe mainta
  let aweMainta = services.aweMainta && services.aweMainta.map((mainta, index) => {
      return (
          <NewsItem2 key={index} index={index} newsSource={mainta} provider="awemainta.com" imgFunction={imageErrorCheck(mainta)} />
      )
  })
  //boletin extra Crawl for images!
  let boletinExtra =  services.boletinExtra && services.boletinExtra.map((boletinExtra, index) => {
      return (
          <NewsItem2 key={index} index={index} newsSource={boletinExtra} provider="boletinextra.com" imgFunction={imageTest(boletinExtra)} />
      )
  })
  //24ora Crawl for images!

  let bintiCuatroOra = services._24ora && services._24ora.map((ora, index) => {
      return (
          <NewsItem2
              key={index}
              index={index}
              newsSource={ora}
              provider="24ora.com"
              imgFunction={imageBintiCuater(ora)}
              renderedContent={ReactHtmlParser(sanitizeHtml(ora.content.rendered, {
                                  allowedTags: ['p', 'em', 'strong', 'b', 'i', 'span'],
                                  transformTags: {
                                      'span': function (tagName, attribs) {
                                          return {
                                              tagName: 'span',
                                              text: ' '
                                          };
                                      }
                                  }
                              }))}
          />
      )
  })
  //masnoticia
  let masNoticia = services.masNoticia && services.masNoticia.map((masNoticia, index) => {
      return (
          <NewsItem2
              key={index}
              index={index}
              newsSource={masNoticia}
              provider="masnoticia.com"
              imgFunction={imageErrorCheck(masNoticia)}
              renderedContent={ReactHtmlParser(sanitizeHtml(masNoticia.content.rendered, {
                                  allowedTags: ['p', 'li', 'iframe', 'i', 'strong', 'blockquote'],
                                  allowedAttributes: { 'iframe': ['src'] },
                                  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
                              }))}
          />
      )
  })
  //diario
  let diario = services.diario && services.diario.map((diario, index) => {
      return (
          <NewsItem2 key={index} index={index} newsSource={diario} provider="diario.aw" imgFunction={imageErrorCheck(diario)} />
      )
  })
  //aruba native
  let arubaNative = services.arubaNative && services.arubaNative.map((arubaNative, index) => {
      return (
          <NewsItem2 key={index} index={index} newsSource={arubaNative} provider="arubanative.com" imgFunction={imageErrorCheck(arubaNative)} />
      )
  })
    //solo di pueblo
    let solo = services.solo && services.solo.map((solo, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={solo} provider="solodipueblo.com" imgFunction={imageErrorCheck(solo)} />
        )
    })
  //bon dia aruba
  let bondia = services.bonDia && services.bonDia.map((bondia, index) => {
      return (
          <NewsItem2 key={index} index={index} newsSource={bondia} provider="bondia.com" imgFunction={imageErrorCheck(bondia)} />
      )
  })
  //focus
  let focus = services.focus && services.focus.map((focus, index) => {
      return (
          <NewsItem2
              key={index}
              index={index}
              newsSource={focus}
              provider="focus.aw"
              imgFunction={imageErrorCheck(focus)}
              renderedContent={ReactHtmlParser(sanitizeHtml(focus.content.rendered, {
                                  allowedTags: ['p', 'li', 'iframe', 'i', 'strong', 'blockquote'],
                                  allowedAttributes: { 'iframe': ['src'] },
                                  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
                              }))}
          />
      )
  })
  //visit aruba
  let visitAruba = services.batiBleki && services.batiBleki.map((visitAruba, index) => {
      return (
          <NewsItem2
              key={index}
              index={index}
              newsSource={visitAruba}
              provider="visitaruba.com"
              imgFunction={(!visitAruba._embedded['wp:featuredmedia'] || visitAruba._embedded['wp:featuredmedia'][0].code) ?
                      require('../images/batiBlekiHD.PNG') : visitAruba._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}
          />
      )
  })
  //coolaruba
//   let coolAruba = services.coolAruba && services.coolAruba.map((coolAruba, index) => {
//       return (
//           <NewsItem2
//               key={index}
//               index={index}
//               newsSource={coolAruba}
//               provider="coolaruba.com"
//               imgFunction={imageErrorCheck(coolAruba)}
//               renderedContent={ReactHtmlParser(sanitizeHtml(coolAruba.content.rendered, {
//                                   allowedTags: ['p', 'em', 'strong', 'b', 'i']
//                               }))}
//           />
//       )
//   })
      //coolaruba
    let sports = services.sports && services.sports.map((sports, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={sports}
                provider="www.297sports.com"
                imgFunction={imageSports(sports)}
                renderedContent={ReactHtmlParser(sanitizeHtml(sports.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i']
                                }))}
            />
        )
    })

  const formattedNewsSources = [arubaNative, masNoticia, noticiaCla, bondia, diario, bintiCuatroOra, boletinExtra, eArubianoNews, aweMainta, focus, visitAruba, solo, sports];

  return formattedNewsSources;
}
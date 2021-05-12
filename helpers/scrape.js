import cheerio from "cheerio";
import { v4 as uuid } from "uuid";
import fetch from "node-fetch";

export default async function scrape(sauce) {
  sauce = parseInt(sauce);
  sauce = !isNaN(sauce) ? sauce : Math.floor(Math.random() * 320000);

  const html = await fetch(`https://nhentai.net/g/${sauce}`)
    .then((body) => body.text())
    .catch((err) => {
      return {
        error: true,
        msg: err.message,
      };
    });

  const $ = cheerio.load(html);

  let pretty = $('meta[itemprop="name"]').attr("content");

  if (pretty === undefined) {
    return {
      sauce,
      noDoujin: true,
    };
  }

  let title = $("h1.title").text();

  let image = $('meta[itemprop="image"]').attr("content");

  let mediaId = image.slice(32, image.length - 10);

  const doujinInfo = [];

  [...Array(7)].forEach((e, i) => {
    let info = $(`#tags > div:nth-child(${i + 1}) > span`)
      .children()
      .toArray()
      .map((i) => $(i).children().first().text());
    if (!info) info = [];
    doujinInfo.push(info);
  });

  let [parodies, characters, tags, artists, groups, languages, categories] =
    doujinInfo;

  let pageAmount = parseInt($("#tags > div:nth-child(8) > span").text());

  let uploadDate = $("#tags > div:nth-child(9) > span").text();

  const pages = [],
    thumbnails = [];
  for (let i = 0; i < pageAmount; i++) {
    pages.push(`https://i.nhentai.net/galleries/${mediaId}/${i + 1}.jpg`);
    thumbnails.push(`https://t.nhentai.net/galleries/${mediaId}/${i + 1}t.jpg`);
  }

  let id = uuid();

  return {
    id,
    sauce,
    image,
    pretty,
    title,
    tags,
    pageAmount,
    parodies,
    characters,
    artists,
    groups,
    languages,
    categories,
    uploadDate,
    pages,
    thumbnails,
    noDoujin: false,
  };
}

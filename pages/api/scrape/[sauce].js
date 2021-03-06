import cheerio from "cheerio";
import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

export default async (req, res) => {
  let sauce = parseInt(req.query.sauce);

  sauce = !isNaN(sauce) ? sauce : Math.floor(Math.random() * 320000);

  const html = await fetch(`https://nhentai.net/g/${sauce}`)
    .then((body) => body.text())
    .catch((err) => {
      res.json({ error: true });
      return;
    });

  const $ = cheerio.load(html);

  let pretty = $('meta[itemprop="name"]').attr("content");

  if (pretty === undefined) {
    res.json({ noDoujin: true });
    return;
  }

  let title = $("h1.title").text();

  let image = $('meta[itemprop="image"]').attr("content");

  let mediaId = image.slice(32, image.length - 10);

  const doujinInfo = [];

  for (let i = 1; i < 7; i++) {
    doujinInfo.push(
      $(`#tags > div:nth-child(${i}) > span`)
        .children()
        .toArray()
        .map((i) => $(i).children().first().text())
    );
  }

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

  res.json({
    id,
    sauce,
    pretty,
    title,
    image,
    pageAmount,
    tags,
    parodies,
    characters,
    groups,
    uploadDate,
    categories,
    languages,
    artists,
    pages,
    thumbnails,
    noDoujin: false,
  });
};

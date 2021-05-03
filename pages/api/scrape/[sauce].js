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

  let parodies = $("#tags > div:nth-child(1) > span")
    .children()
    .toArray()
    .map((i) => $(i).children().first().text());

  let characters = $("#tags > div:nth-child(2) > span")
    .children()
    .toArray()
    .map((i) => $(i).children().first().text());

  let tags = $("#tags > div:nth-child(3) > span")
    .children()
    .toArray()
    .map((i) => $(i).children().first().text());

  let artists = $("#tags > div:nth-child(4) > span")
    .children()
    .toArray()
    .map((i) => $(i).children().first().text());

  let groups = $("#tags > div:nth-child(5) > span")
    .children()
    .toArray()
    .map((i) => $(i).children().first().text());

  let languages = $("#tags > div:nth-child(6) > span")
    .children()
    .toArray()
    .map((i) => $(i).children().first().text());

  let categories = $("#tags > div:nth-child(7) > span")
    .children()
    .toArray()
    .map((i) => $(i).children().first().text());

  let pageAmount = parseInt($("#tags > div:nth-child(8) > span").text());

  let uploadDate = $("#tags > div:nth-child(9) > span").text();

  let pages = [...Array(pageAmount)].map(
    (e, i) => `https://i.nhentai.net/galleries/${mediaId}/${i + 1}.jpg`
  );

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
    noDoujin: false,
  });
};

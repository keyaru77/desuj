const express = require('express');
const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', async (req, res) => {
  const url = 'https://doujindesu.tv/';

  try {
    console.log(`Fetching URL: ${url}`);

    const response = await cloudscraper.get(url, {
      headers: {
        'Origin': 'https://doujindesu.tv',
        'Referer': 'https://doujindesu.tv',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': '5vng653351248l; 7351380231328194288; 8o7cqh765otn7keu2udap9mgjo; AC3a3wAAAABmeP1Q; AC3a3wAAAAAAAAAC'
      }
    });

    console.log(`Response status: ${response.statusCode}`);
    const html = response;
    const $ = cheerio.load(html);

    const entries = [];

    $('div.entries article.entry').each((_, element) => {
      const anchor = $(element).find('a').first();
      const img = anchor.find('img');
      const title = $(element).find('h3.title span');
      const chapterLink = $(element).find('div.artists a').first();
      const chapterText = chapterLink.find('span').text().trim();

      entries.push({
        link: anchor.attr('href'),
        imgAlt: img.attr('alt'),
        imgSrc: img.attr('data-cfsrc'),
        title: title.text().trim(),
        chapterLink: chapterLink.attr('href'),
        chapterText: chapterText
      });
    });

    res.json(entries);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    res.status(500).send('An error occurred while fetching the data.');
  }
});

module.exports = router;

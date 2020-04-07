/*
 *  Description: 抓取前端日报每日的内容
 *  Author: LuckRain7
 *  Date: 2020-04-07 12:12:10
 */

const request = require("request");
const cheerio = require("cheerio");

// 通过 get 获取内容
function request_get(url) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: url,
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      }
    );
  });
}

async function init(date) {
  const HTML = await request_get(`http://caibaojian.com/fe-daily-${date}.html`);
  const $ = cheerio.load(HTML);

  const p = $("p.fed-title");

  let result = [];
  p.each((index, item) => {
    const a = cheerio.load(item)("a").first()[0];

    result.push({
      id: index,
      title: a.children[0].data,
      url: a.attribs.href,
    });
  });

  return result;
}

const link = init("20200406");

/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-07 11:32:24
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

// 时间处理函数
function switchTime(val = +new Date(), dateType = "YYYY-MM-DD hh:mm:ss") {
  // 将字符串转换成数字
  const timeStamp = +new Date(val);

  // 如果转换成数字出错
  if (!timeStamp) {
    return val;
  }
  let str;
  // 得到时间字符串
  const dateStr = new Date(timeStamp);
  str = dateType.replace("YYYY", dateStr.getFullYear());
  str = str.replace(
    "MM",
    (dateStr.getMonth() + 1 < 10 ? "0" : "") + (dateStr.getMonth() + 1)
  );
  str = str.replace(
    "DD",
    (dateStr.getDate() < 10 ? "0" : "") + dateStr.getDate()
  );
  str = str.replace(
    "hh",
    (dateStr.getHours() < 10 ? "0" : "") + dateStr.getHours()
  );
  str = str.replace(
    "mm",
    (dateStr.getMinutes() < 10 ? "0" : "") + dateStr.getMinutes()
  );
  str = str.replace(
    "ss",
    (dateStr.getSeconds() < 10 ? "0" : "") + dateStr.getSeconds()
  );

  return str;
}

async function init() {
  const body = await request_get("http://caibaojian.com/c/news");

  const $ = cheerio.load(body);

  const a = $("h2.entry-title").first().find("a");
  const link = a[0].attribs.href; //获取文章链接
  const title = cheerio.load(a[0])("span").text(); //获取文章标题

  const [time] = title.split(" "); // 处理获得时间

  let timeNow = switchTime(new Date(), "YYYYMMDD");

  // 获取前一天的
  if ((timeNow - 1).toString() === time) {
    return link; //返回链接
  }

  return false;
}

const link = init();

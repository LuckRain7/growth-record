/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-07 11:09:27
 */

const cheerio = require("cheerio");

const html = '<h2 class="title">hello world</h2>';

let $ = cheerio.load(html);

console.log($("h2.title").html());

// 迭代用 each

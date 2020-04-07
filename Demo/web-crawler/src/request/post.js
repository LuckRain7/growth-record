/*
 *  Description: post
 *  Author: LuckRain7
 *  Date: 2020-04-07 10:28:09
 */
const request = require("request");
// 用户注册功能

const options = {
  url: "http://localhost:3000/signup",
  method: "POST",
  json: true, // 是json 一定更要把json：true 加上
  headers: {
    "Content-Type": "application/json",
  },
  body: { name: "rain", age: 18 },
};

request(options, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body);
  } else {
    console.log(error);
  }
});

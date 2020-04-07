/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-07 10:44:11
 */

const request = require("request");
const fs = require("fs");
const path = require("path");

// 在html如果有文件上传的话，需要指定 encrytype="multipart-formdata"

let formData = {
  name: "rain",
  content: fs.createReadStream(path.resolve(__dirname, "content.txt")),
};

request.post(
  {
    url: "http://localhost:3000/upload",
    formData: formData,
  },
  function (err, response, body) {
    if (!err && response.statusCode === 200) {
      console.log(body);
    } else {
      console.log(err);
    }
  }
);

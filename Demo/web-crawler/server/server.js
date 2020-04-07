/*
 *  Description: 模拟服务端
 *  Author: LuckRain7
 *  Date: 2020-04-07 10:29:27
 */

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer"); //解析上传文件

// 当服务器端收到请求体的时候，如果它是一个formdata类型，则会把接受里边并解析里边的数据
// 数据分为两种，一种是普通的文本，另一种是文件
// 文本放在req.body  文件数据放在req.file里

const upload = multer({
  dest: path.resolve(__dirname, "uploads"),
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", function (req, res) {
  console.log(req.body);

  let user = req.body;
  res.json(user);
});

// single 表示这个请求form中只有一个文件字段
app.post("/upload", upload.single("content"), function (req, res) {
  let body = req.body;
  let file = req.file;
  console.log(body);
  console.log(file);

  res.json(1);
});

app.listen(3000, function () {
  console.log("running http://localhost:3000");
});

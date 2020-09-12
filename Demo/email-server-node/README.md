# 使用 Node 发送邮件

## 核心库

- [express](https://github.com/expressjs/express)

- [nodemailer](https://github.com/nodemailer/nodemailer)

## 安装

```
npm install
#or
yarn install
```

## 使用

启动服务

```
npm run start
#or
yarn start
```

调用接口

```txt
// 发送邮件接口
// POST
// URL: http://localhost:3000/email/post
// {
//  toUrl: String, // 收件人邮箱地址
//  title: String, // 邮件标题
//  context: String, // 邮件正文
// };
```

## 核心代码

```javascript
var express = require('express')
var router = express.Router()
const nodemailer = require('nodemailer')

const emailUser = '邮箱账号',
  emailPassword = '邮箱密码'

function postEmail(toUrl, title, context, cb) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.exmail.qq.com', // POP3/SMTP协议 发送邮件服务器 地址
    port: 465, // POP3/SMTP协议 发送邮件服务器 端口
    secure: true, // use SSL
    auth: {
      user: emailUser, // 账号
      pass: emailPassword, // 密码
    },
  })

  let mailOptions = {
    from: emailUser,
    to: toUrl, // to: "11111111@qq.com",
    subject: title, // 邮件主题 "Hello World",
    text: context, // 邮件正文 "this is test Email",
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      cb(0)
      return
    }
    cb(1)
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('hello world Email')
})

// 发送有限接口
// POST
// URL: http://localhost:3000/email/post
// {
//   toUrl: String, // 收件人邮箱地址
//   title: String, // 邮件标题
//   context: String, // 邮件正文
// };

router.post('/post', function (req, res, next) {
  console.log(' --- req.body --- ')

  const { toUrl, title, context } = req.query
  postEmail(toUrl, title, context, function (status) {
    status
      ? res.send({
          code: 0,
          message: '操作成功！',
          success: true,
        })
      : res.send({
          code: 1,
          message: '操作失败！',
          success: false,
        })
  })
  res.send('ok')
})

module.exports = router
```

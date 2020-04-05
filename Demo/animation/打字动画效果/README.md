# 打字效果动画

话不多少！直接上代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>打字动画效果</title>
    <link href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <style>
        #app {
            height: 300px;
            width: 400px;
            margin: 100px auto;
        }

        .btn {
            margin: 30px 0;
        }

        .print {
            height: auto;
            width: 400px;
        }
    </style>
</head>

<body>
    <div id="app">
        <div class="form-group">
            <label for="exampleInputEmail1">输入文字</label>
            <input type="text" class="form-control" id="content">
            <button type="button" class="btn btn-primary" onclick="go()">打印</button>
            <div class="print">

            </div>
        </div>
    </div>
    <script>


        window.go = function () {

            // 获取输入文字
            const data = document.querySelector('#content').value

            // 获取输入dom
            const outDom = document.querySelector('.print')
            outDom.innerHTML = ''

            // 字符串分割
            const writeData = data.split('')

            let index = 0
            function writing(index) {
                if (index < data.length) {
                    outDom.innerHTML += data[index]
                    setTimeout(writing.bind(this), 200, ++index)
                }
            }

            writing(0)
        }
    </script>
</body>

</html>
```



参考文章：

[5行代码带你实现一个js的打字效果](https://juejin.im/post/5ddf55835188257313541581)
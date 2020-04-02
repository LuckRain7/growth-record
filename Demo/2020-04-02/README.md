# 文件上传



### 方式一：FromData 数据格式化 (client/index.html)

客户端选择文件 -> FromData 数据格式化 -> 接送到客户端传递的file等信息 -> 在服务器创建file等信息 -> 把服务器存储的文件地址返回给客户端 -> 客户端 ajax请求  POST

需掌握的知识：

- `input` 标签的使用，可通过  `accept="image/*"` 进行上传文件的选择

-  `FormData()`构造函数用于创建一个新的 FormData 对象。[参考MDN]( https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData ) 

```html
<!--
 * @Description:  FromData 数据格式化 上传文件
 * @Author: LuckRain7
 * @Date: 2020-04-02 16:17:10
 -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>大图上传</title>
</head>

<body>
    <input type="file" id="fileInp" accept="image/*">
    <br>
    <img src="" alt="" id="serverImg">

    <script src="https://cdn.bootcss.com/blueimp-md5/2.13.0/js/md5.min.js"></script>
    <script src="./ajax.js"></script>
    <script>
        let limitType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'], limitMaxSize = 100 * 2014;
        console.log(fileInp);

        fileInp.onchange = async function () {
            let file = fileInp.files[0]
            console.log(file);
            if (!file) return

            // 对文件类型进行限制
            if (!limitType.includes(file.type)) {
                alert('上传格式不正确')
                fileInp.value = ''
                return
            }

            // 对文件大小进行限制
            if (file.size > limitMaxSize) {
                alert('最大只能上传100KB')
                fileInp.value = ''
                return
            }

            // 生成上传数据
            let formData = new FormData()
            // 默认 Content-Type：mutilpart/form-data
            formData.append('chunk', file)
            formData.append('filename', $formatFileName(file.name).filename)

            // 上传
            let result = await $ajax({
                url: 'http://127.0.0.1:5678/single',
                data: formData,
            })

            // 接受返回的图片地址
            if (result.code == 0) {
                serverImg.src = result.path
            }

        }
    </script>
</body>

</html>
```



### 方式二： base64 编码（流信息）(client/index2.html)

客户端选择问题件 -> 传递给服务器，当前文件的 base64 编码（流信息） -> 服务器接收到 base64 信息 -> 把 base64 转换成具体的图片存储 -> 返回存储图片的地址 -> 客户端 ajax请求  POST



```html
<!--
 * @Description:  base64编码方式
 * @Author: LuckRain7
 * @Date: 2020-04-02 17:55:43
 -->



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>大图上传</title>
</head>

<body>
    <input type="file" id="fileInp" accept="image/*">
    <br>
    <img src="" alt="" id="serverImg">

    <script src="https://cdn.bootcss.com/blueimp-md5/2.13.0/js/md5.min.js"></script>
    <script src="./ajax.js"></script>
    <script>


        let limitType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'], limitMaxSize = 100 * 2014;
        console.log(fileInp);

        // 将文件转换为base64编码
        function convertBase64(file) {
            return new Promise((resolve, reject) => {
                let fileRead = new FileReader()
                fileRead.readAsDataURL(file)
                fileRead.onload = ev => {
                    resolve(ev.target.result)
                }
            })
        }

        fileInp.onchange = async function () {
            let file = fileInp.files[0]
            if (!file) return

            // 对文件类型进行限制
            if (!limitType.includes(file.type)) {
                alert('上传格式不正确')
                fileInp.value = ''
                return
            }

            // 对文件大小进行限制
            if (file.size > limitMaxSize) {
                alert('最大只能上传100KB')
                fileInp.value = ''
                return
            }

            // 转换为base64编码
            let base64 = await convertBase64(file)

            // 上传
            let result = await $ajax({
                url: 'http://127.0.0.1:5678/single2',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: `chunk=${encodeURIComponent(base64)}&filename=${$formatFileName(file.name).filename}`,
            })

            // 接受返回的图片地址
            if (result.code == 0) {
                serverImg.src = result.path
            }

        }
    </script>
</body>

</html>
```



 ##  切片上传 (client/index3.html)

客户端：

1. 把大文件切片化  切5个   ->  file是Blob类的实例  (Blob.prototype.slice 可以把一个文件切换处理)

2. HTTP可以多个并发传递 6-7

3. 等5个等上传完，在向服务器发送一个合并图片的请求

服务器端：

1. upload目录下创建一个一hash命名的临时目录

  xxxxxx123（切片存储到这个目录）

​	xxxxxxx123-1.png

​	xxxxxxx123-2.png

​	.......

2. 收到merge合并请求

根据hash找到之前存储的临时目录，按顺序读取目录中的切片信息，把每一个切片信息合并到最后一张图片中（合并完删除临时目录和里边的切片即可）

```html
<!--
 * @Description:   切片上传 并添加进度信息
 * @Author: LuckRain7
 * @Date: 2020-04-02 20:41:27
 -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>切片上传</title>
</head>

<body>
    <input type="file" id="fileInp" accept="image/*">
    <span id="progress"></span>
    <br>
    <img src="" alt="" id="serverImg">

    <script src="https://cdn.bootcss.com/blueimp-md5/2.13.0/js/md5.min.js"></script>
    <script src="./ajax.js"></script>
    <script>

        let _data = new Proxy({ total: 0 }, {
            set(target, key, value) {
                target[key] = value
                if (_data.total >= 100) {
                    progress.innerHTML = '上传成功'
                    return
                }
                progress.innerHTML = `${_data.total}%`
            }
        })


        fileInp.onchange = async function () {
            let file = fileInp.files[0]
            if (!file) return
            progress.innerHTML = '0%'
            // 把一个文件切成5个切片（可以固定切片数据，或者切片大小）
            let partSize = file.size / 5,
                cur = 0,
                i = 0,
                partList = [],
                { hash,
                    suffix,
                    filename } = $formatFileName(file.name)

            while (i < 5) {

                partList.push({
                    chunk: file.slice(cur, cur + partSize),
                    filename: `${hash}-${i}.${filename}`
                })
                cur += partSize
                i++
            }

            // 并发切片请求
            partList = partList.map(async item => {

                let formData = new FormData()
                formData.append('chunk', item.chunk)
                formData.append('filename', item.filename)

                return $ajax({
                    url: 'http://127.0.0.1:5678/chunk',
                    data: formData
                }).then(result => {

                    if (result.code === 0) {
                        _data.total += 20
                        return Promise.resolve(result)
                    }

                    return Promise.reject(result)
                })
            })

            // 合并发送请求
            await Promise.all(partList)

            // 发送合并请求
            let result = await $ajax({
                url: 'http://127.0.0.1:5678/merge',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: `filename=${filename}`,
            })

            // 接受返回的图片地址
            if (result.code == 0) {
                serverImg.src = result.path
            }

        }
    </script>
</body>

</html>
```



### 服务端代码 （server/）


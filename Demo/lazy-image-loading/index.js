let imagesModule = (function () {

    let columns = Array.from(document.querySelectorAll('.column'))



    // 数据绑定
    function bindHtml(data) {
        // 根据服务器返回的图片的宽和高，动态计算出图片放到230容器中，高度应该怎么缩放
        // 因为我们后期要做图片的延迟加载，在没有图片之前，我们也需要知道未来图片要渲染的高度，这样才能占一个容器位置
        data = data.map(item => {
            let {
                width, height
            } = item
            item.height = height / (width / 230)
            item.width = 230
            return item
        })

        // 每三个为一组获取数据
        for (let i = 3; i < data.length; i += 3) {
            let group = data.slice(i, i + 3)

            // 实现每一列的降序
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight
            })

            // 把一组的数据进行生序
            group.sort((a, b) => {
                return a.height - b.height
            })

            // 分别把最小的数据插入到最大的列中
            group.forEach((item, index) => {
                let {
                    width, height, title, pic
                } = item
                let card = document.createElement('div')
                card.className = 'card'
                card.innerHTML = `
                    <a href="#">
                        <div class="lazyImageBox" style="height:${height}px;">
                            <img  data-image="${pic}" class="lazy-img" />
                        </div>
                        <p>${title}</p>
                    </a>
                `
                columns[index].appendChild(card)
            })

        }
    }

    // 实现图片的延迟加载
    let lazyImageBoxs;
    let winH = document.documentElement.clientHeight;
    function lazyFunc() {
        console.log(' --- ok --- ');
        !lazyImageBoxs
            ? lazyImageBoxs = document.querySelectorAll('.lazyImageBox')
            : null;

        lazyImageBoxs.forEach(lazyImageBox => {
            // 已经处理过 则不再处理
            let isLoad = lazyImageBox.getAttribute('isLoad')
            if (isLoad) return

            // 加载条件：「盒子底边距离body距离 < 浏览器底边距离 body的距离」
            // let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight,
            //     A = winH + document.documentElement.scrollTop;
            // if (B <= A) {
            //     lazyImg(lazyImageBox)
            // }
            let { bottom } = lazyImageBox.getBoundingClientRect();
            // 盒子的底距离页面最上的距离 小于页面整体高度
            if (bottom < winH) {
                lazyImg(lazyImageBox)
            }

        })
    }

    // 单张图片加载
    function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector("img");
        let trueImg = img.getAttribute('data-image');
        img.src = trueImg
        img.onload = function () {
            // 图片加载成功
            utils.css(img, 'opacity', 1)
        }
        img.removeAttribute('data-image')
        // 记录当前图片已经处理过了
        lazyImageBox.setAttribute('isLoad', 'true')
    }

    return {
        async init() {
            let data = await utils.ajax('./data.json')
            console.log(' --- data --- ', data);
            bindHtml(data)
            setTimeout(lazyFunc, 500)
            // onscroll 触发的频率太高了，滚动一下可能被触发很多次，导致很多没必要的计算和处理，消耗性能 
            // => 我们需要降低 onscroll 的触发频率表（节流）

            window.onscroll = utils.throttle(lazyFunc, 500)
        }
    }

})()

imagesModule.init()


/*
 * 为啥要做图片的延迟加载
 *  浏览器渲染页面
 *      1.构建 DOM 树
 *      2.构建 CSSOM 树
 *      3.生成 RENDER TREE
 *      4.布局
 *      5.分层
 *      6.栅格化
 *      7.绘制
 * 构建DOM树中如果遇见img
 *      老版本：阻碍DOM渲染
 *      新版本：不会阻碍 每一个图片请求都会占用一个HTTP（浏览器同时发送的HTTP 6个）
 *             拿回来资源后会和RENDER TREE一起渲染
 * .....
 * 开始加载图片，一定会让也没按第一次渲染速度变慢（白屏）
 * 图片延迟加载：第一次不请求异步加载图片，等页面加载完，其他资源都渲染好了，再去请求加载图片
 *
 *
 * 显示图片的部分拿一个盒子占位，盒子有一个默认的背景图：loading图
 * 开始图片不加载
 * 我们把真是图片的地址赋值给img的自定义属性 data-src/data-image...
 * 延迟加载：在页面滚动的时候，把出现在视口中的图片做延迟加载
 *
 *
 *

 * 距离 计算图：
 1.盒子顶部距离 body 的偏移
 2.盒子本身的高度
        +--------+-------------+ XX
        |        |             |  XX
        |        |             |   XXX  -> 滚动条卷去的高度
        |        |1            |  XX
        |        |             |  X
        |        |             |  X
+---------------------------------------+ X
|       |        |             |        | XX
|       |        | 1           |        |  XX
|       |        |             |        |   XXX
|       |        |             |        |     XX -> 浏览器高度
|       |    +---+-+-----+     |        |    X
|       |    |     |     |     |        |   X
|       |    |     | 2   |     |        |  XX
|       |    |     |     |     |        |  X
+------------+-----+-----+--------------+ XX
 */


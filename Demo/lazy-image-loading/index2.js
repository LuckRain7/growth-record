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

    // 实现图片的延迟加载 这种方法性能非常好
    let lazyImageBoxs,
        // IntersectionObserver 用来监听一个DOM对象，当DOM对象，出现和离开视口的时候 触发回调函数
        observer = new IntersectionObserver(changes => {
            // 判断符合条件的才进行加载
            changes.forEach(item => {
                let { isIntersecting, target } = item
                if (isIntersecting) {
                    lazyImg(target)
                    observer.unobserve(target) // 移除监听
                }

            })
        });

    function lazyFunc() {

        !lazyImageBoxs
            ? lazyImageBoxs = document.querySelectorAll('.lazyImageBox')
            : null;

        lazyImageBoxs.forEach(lazyImageBox => {
            observer.observe(lazyImageBox)
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
        }
    }

})()

imagesModule.init()


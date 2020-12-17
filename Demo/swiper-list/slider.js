function Swiper(obj) {
  // --- 接受数据 ---
  this.imgArr = obj.imgArr || []; // 设置显示图片数组
  this.aniTime = obj.aniTime || 1000; // 动画滑动时间
  this.intervalTime = obj.intervalTime || 1000; // 循环播放时间
  this.autoplay = obj.autoplay || true; // 是否自动播放

  // 拼接多张照片
  this.retImgArr = [
    this.imgArr[this.imgArr.length - 1],
    ...this.imgArr,
    this.imgArr[0],
  ];

  // DOM
  this.swiperListDom = document.querySelector(obj.el);

  this.moveWidth = this.swiperListDom.offsetWidth; // 外部大小
  this.timer = null; // 定时任务
  this.prevTime = Date.now(); // 当前时间 用防抖节流
  this.nowIndex = 0; // 记录当前图片页数
}

Swiper.prototype = {
  init: function () {
    this.initDom(); // 设置初始化 DOM

    // 添加图片
    let li = "";
    for (let i = 0; i < this.retImgArr.length; i++) {
      let img = `<img src="${this.retImgArr[i].imgPath}" alt=""/>`;
      let a = `<a href="${this.retImgArr[i].url}">${img}</a>`;
      // prettier-ignore
      li += `<li style="left:${i * this.moveWidth}px; width: ${this.moveWidth}px" class="swiper-item">${a}</li>`;
    }
    this.mainDom.innerHTML = li;

    // 小圆点 li
    let spotLi = "";
    for (let i = 0; i < this.imgArr.length; i++) {
      if (i === 0) {
        spotLi += `<li class="spot-item" style="background-color: #ff5c1f;" index=${i}></li>`;
      } else {
        spotLi += `<li class="spot-item" index=${i}></li>`;
      }
    }
    this.swiperSpotDom.innerHTML = spotLi;

    // 上一张，下一张，小圆点绑定点击事件
    this.eventBind();
  },
  initDom: function () {
    // 轮播图片 DOM 容器
    this.mainDom = document.createElement("ul");
    this.mainDom.className = "swiper-main";
    this.mainDom.style.width = `${this.moveWidth * (this.imgArr.length + 2)}px`;
    this.mainDom.style.left = `${-this.moveWidth}px`;
    this.swiperListDom.appendChild(this.mainDom); // 添加 DOM

    // 小圆点ul容器
    this.swiperSpotDom = document.createElement("ul");
    this.swiperSpotDom.className = "swiper-spot";
    this.swiperListDom.appendChild(this.swiperSpotDom);

    // 上一张按钮
    this.leftBtn = document.createElement("img");
    this.leftBtn.className = "leftBtn";
    this.leftBtn.src = "/img/left.png";
    this.swiperListDom.appendChild(this.leftBtn);

    // 下一张按钮
    this.rightBtn = document.createElement("img");
    this.rightBtn.className = "rightBtn";
    this.rightBtn.src = "/img/right.png";
    if (this.imgArr.length === 1) {
      this.leftBtn.style.display = "none";
      this.rightBtn.style.display = "none";
    }
    this.swiperListDom.appendChild(this.rightBtn);
  },
  eventBind() {
    let that = this;

    // 上一张事件绑定
    this.leftBtn.addEventListener("mouseover", function () {
      clearInterval(that.timer);
    });
    this.leftBtn.addEventListener("mouseout", function () {
      that.timer = setInterval(that.nextSlider.bind(that, that.aniTime), that.intervalTime);
    });
    this.leftBtn.addEventListener("click", function () {
      that.throttle(that.prevSlider, 300, 300);
    });

    // 下一张事件绑定
    this.rightBtn.addEventListener("mouseover", function () {
      clearInterval(that.timer);
    });
    this.rightBtn.addEventListener("mouseout", function () {
      that.timer = setInterval(that.nextSlider.bind(that, that.aniTime), that.intervalTime);
    });
    this.rightBtn.addEventListener("click", function () {
      that.throttle(that.nextSlider, 300, 300);
    });

    // 小圆点事件绑定
    this.swiperSpotDom.addEventListener('mouseover', function() {
      clearInterval(that.timer);
    })
    this.swiperSpotDom.addEventListener('mouseout', function() {
      that.timer = setInterval(that.nextSlider.bind(that, that.aniTime), that.intervalTime);
    })
    this.swiperSpotDom.addEventListener('click', function(e) {
      e = e || window.event; //这一行及下一行是为兼容IE8及以下版本
    　　var target = e.target || e.srcElement;
    　　if (target.tagName.toLowerCase() === "li") {
    　　　　 var ret = this.querySelectorAll("li");
    　　　　 let index = Array.prototype.indexOf.call(ret, target);
        that.nowIndex = index;
        that.setActiveSpot();
        that.mainDom.style.transition = `left .8s`
        that.mainDom.style.left = `${-(that.nowIndex+1) * that.moveWidth}px`;
    　　}
    })

    this.mainDom.addEventListener('touchstart', function(e) {
      clearInterval(that.timer);
      that.startX = e.changedTouches[0].clientX;
      that.startY = e.changedTouches[0].clientY;
    })
    this.mainDom.addEventListener('touchmove', function(e) {
      clearInterval(that.timer);
      that.endX = e.changedTouches[0].clientX;
      that.endY = e.changedTouches[0].clientY;
    })
    this.mainDom.addEventListener('touchend', function(e) {
      if (!that.mainDom.style.transition) {
        that.mainDom.style.transition = `left ${that.aniTime / 1000}s`
      }
      let angle = that.angle({ X: that.startX, Y: that.startY }, { X: that.endX, Y: that.endY });
      if (Math.abs(angle) > 30) return;
        if (that.endX > that.startX){ // 右滑
          that.prevSlider();
        } else { // 左滑
          that.nextSlider();
        }
      that.timer = setInterval(that.nextSlider.bind(that, that.aniTime), that.intervalTime);
    })
  },
  // 进行下一张图片滑动
  nextSlider(aniTime) {
    let that = this;
    if (this.imgArr.length === 1) return;
    this.nowIndex++; // 当前索引＋1
    // 设置滑动动画  整体 ul 想做滑动
    this.mainDom.style.transition = `left ${aniTime / 1000}s`;
    this.mainDom.style.left = `${parseInt(this.mainDom.style.left) - this.moveWidth}px`;

    // 设置进行循环轮播
    if (this.nowIndex === this.imgArr.length) {
      that.nowIndex = 0; // 重新设置索引
      that.setActiveSpot();
      // 重新设置为第一张
      setTimeout(function () {
        that.mainDom.style.transitionProperty = "none";
        that.mainDom.style.left = `${-that.moveWidth}px`;
      }, aniTime);
    } else {
      this.setActiveSpot();
    }
  },

  prevSlider(aniTime) {
    let that = this;
    if (this.imgArr.length===1) return;
    this.mainDom.style.transition = `left ${aniTime / 1000}s`
    this.mainDom.style.left = `${parseInt(this.mainDom.style.left) + this.moveWidth}px`;
    if (this.nowIndex === 0) {
      that.nowIndex = (that.imgArr.length-1);
      that.setActiveSpot();
      setTimeout(function() {
        that.mainDom.style.transitionProperty = 'none';
        that.mainDom.style.left = `${-that.imgArr.length * that.moveWidth}px`;
      }, aniTime)
    } else {
      this.nowIndex--;
      this.setActiveSpot();
    }
  },


  setActiveSpot: function() {
    for (let i = 0; i < this.swiperSpotDom.childElementCount; i++) {
        if (i === Math.abs(this.nowIndex)) {
            document.getElementsByClassName('spot-item')[i].style.backgroundColor = '#ff5c1f'
        } else {
            document.getElementsByClassName('spot-item')[i].style.backgroundColor = '#ccc'
        }
    }
  },

  // 节流：时间戳版
  throttle(handle, delay, val) {
    var now = Date.now();
    if (now - this.prevTime >= delay) {
      handle.call(this, val);
      this.prevTime = Date.now();
    }
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y;
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  },
};

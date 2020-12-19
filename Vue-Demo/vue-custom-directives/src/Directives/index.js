let Directives = {};

// 防抖 自定义指令
Directives.debounce = {
  inserted: function(el, binding) {
    let timer = null;

    el.addEventListener("click", () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        binding.value();
      }, 500);
    });
  },
};

// 银行卡号 自定义指令 四位一间隔
// 存在问题是： update更新 VNode 有可能没更新或提前更新
Directives.bankCardNum = {
  update: function(el) {
    let num = el.value;
    if (num.length >= 24) {
      console.log("[warning] 银行卡位数最大值19位");
      num = num.slice(0, 23);
    }
    let nospace = num.replace(/\s/g, "");
    el.value = nospace.replace(/(.{4})/g, "$1 ");
  },
};

export default Directives;

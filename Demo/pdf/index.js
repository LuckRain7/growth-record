/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-06-19 08:54:35
 */

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);

  return canvas;
}

function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}

window.print = function () {
  const name = document.querySelector("#aa").value;
  document.querySelector("#name").innerHTML = name;
  //  生成 canvas
  html2canvas(document.querySelector("#app")).then((canvas) => {
    // document.body.appendChild(canvas);
    const imageData = convertCanvasToImage(canvas);
    // document.body.appendChild(imageData);

    var contentWidth = canvas.width;
    var contentHeight = canvas.height;
    //一页pdf显示html页面生成的canvas高度;
    var pageHeight = (contentWidth / 592.28) * 841.89;
    //未生成pdf的html页面高度
    var leftHeight = contentHeight;
    //页面偏移
    var position = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = 595.28;
    var imgHeight = (592.28 / contentWidth) * contentHeight;

    var pdf = new jsPDF("", "pt", "a4");

    if (leftHeight < pageHeight) {
      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
    } else {
      // 分页
      while (leftHeight > 0) {
        pdf.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }

    pdf.save("text.pdf");
  });
};

window.a = function () {};

// generate the qrcode once the window is created
document.body.onload = function () {
  let time = Date.now().toString();
  console.log("time is: " + time);
  generateQRCode("attendance.uaeu.club/" + time);
  chrome.runtime.sendMessage({ action: "sendTime", data: time });
};

// get the window height dynamicaly to use it for the qrcode size
let vh = window.innerHeight;

function generateQRCode(url) {
  const qr = new QRCode(document.getElementById("qrcode"), {
    text: url,
    // length and height of the qrcode is 60% of the viewport height may change later
    width: 0.6 * vh,
    height: 0.6 * vh,
  });
}

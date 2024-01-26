// generate the qrcode once the window is created
document.body.onload = function () {
  // fetch the url to generate the qrcode
  // todo change to the real url send from the database
  fetch("../testing/qrcode.json")
    .then((response) => response.json())
    .then((data) => {
      let qrcodeURL = data.url;
      generateQRCode(qrcodeURL);
    })
    .catch((error) => console.error(error));
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

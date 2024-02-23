let errorMsg = document.getElementById("error");
// send message to the servic_worker.js if the user clicked the getQRCode button with the appropriat message
document.getElementById("getQRCode").addEventListener("click", function () {
  errorMsg.innerHTML = "";
  window.open("../qrcode/qrcode.html", "_blank");
});

// send message to the servic_worker.js if the user clicked the markAttendace button
document
  .getElementById("markAttendance")
  .addEventListener("click", function () {
    errorMsg.innerHTML = "";
    chrome.runtime.sendMessage({ action: "markAttendance" });
  });

// listen for a message from the servic_worker.js if the user try to mark attendance in the wrong page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "urlMismatch") {
    // Update the message in the popup
    document.getElementById("error").innerHTML =
      "Please go to the attendance page then try again!";
  }
});

// if there is no attendance in today's date
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "dateMismatch") {
    // Update the message in the popup
    document.getElementById("error").innerHTML =
      "It seems that you don't have a class today";
  }
});

// if the file does not exist that means no student used the qrcode
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fileNotExist") {
    // Update the message in the popup
    document.getElementById("error").innerHTML =
      "Please make sure to show the qrcode to the studenst before marking the attendance";
  }
});

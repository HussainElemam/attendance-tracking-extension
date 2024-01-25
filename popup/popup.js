// send message to the servic_worker.js if the user clicked the getQRCode button with the appropriat message
document.getElementById("getQRCode").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "getQRCode" });
});

// send message to the servic_worker.js if the user clicked the markAttendace button
document
  .getElementById("markAttendance")
  .addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "markAttendance" });
  });

// listen for a message from the servic_worker.js if the user try to mark attendance in the wrong page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "urlMismatch") {
    // Update the message in the popup
    document.getElementById("error").style.display = "block";
  }
});

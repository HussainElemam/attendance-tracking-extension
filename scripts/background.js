// unixTime will be used to generate a unique file that will store the studnet's ids
let unixTime;

// wait for the popup.js to send you the current time and assine it to unixTime
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "sendTime") {
    unixTime = request.data;
  }
});

// listen for the message which will come after clicking on the mark attendance button
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "markAttendance") {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        const currentTab = tabs[0];
        // first make sure we are in the attendance bage else display an error message
        if (
          currentTab &&
          currentTab.url &&
          currentTab.url.includes("uaeu.ac.ae")
        ) {
          let presentStudents;
          // fetch the data from the testing file later will get the data from the database
          await fetch(
            "https://files.uaeu.club/attendance/csbp301/01/" +
              unixTime +
              ".json"
          )
            .then((response) => response.json())
            .then((presents) => {
              presentStudents = presents;
              chrome.tabs.sendMessage(currentTab.id, {
                action: "MarkAttendanceInPage",
                data: presents,
              });
            })
            .catch((error) => {
              chrome.runtime.sendMessage({ action: "fileNotExist" });
              console.error(error);
            });
        } else {
          chrome.runtime.sendMessage({ action: "urlMismatch" });
        }
      }
    );
  }
});

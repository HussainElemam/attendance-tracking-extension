// this function will be called when the "mark attendance" buttom is clicked
// It will fetch the student list and go through the html page and compare the ids
// and mark the attendance accordingly
function checkAttendance() {
  // get the day of the week to knew the correct column for the attendance
  let today = new Date();

  // get all raws from the table expect first (the header)
  const students = document.querySelectorAll(
    `.bordertable tr:not(:first-child)`
  );

  // fetch the data from the testing file later will get the data from the database
  // todo fetch the real data
  fetch("../testing/attendance-report.json")
    .then((response) => response.json())
    .then((presents) => {
      let presentsArray = presents;
      for (let student of students) {
        // get the student id from the raw to check if it exist in the data
        let id = student.querySelector("td:nth-child(2) p a").innerHTML;
        if (presentsArray.includes(id)) {
          let radioButton = student.querySelector(
            `td:nth-child(${days.get(today.getDay() + 4)}) [value="P"]`
          );
          // make sure the radio button is not disabled
          if (!radioButton.hasAttribute("disabled")) radioButton.checked = true;
        } else {
          let radioButton = student.querySelector(
            `td:nth-child(${days.get(today.getDay() + 4)}) [value="A"]`
          );
          if (!radioButton.hasAttribute("disabled")) radioButton.checked = true;
        }
      }
    })
    .catch((error) => console.error(error));
}

// function to display the QRCode
// todo making the function after getting the data
// function displayQRCode() {

// }

// listen for the message whick will come after clicking on the mark attendance button
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "markAttendance") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];

      // first make sure we are in the attendance bage else display an error message
      // todo changin the url to the real url this one is for testin
      if (
        currentTab &&
        currentTab.url &&
        currentTab.url.includes("attendence-html-page.html")
      ) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: checkAttendance,
        });
      } else {
        chrome.runtime.sendMessage({ action: "urlMismatch" });
      }
    });
  }
});

// listen for the other button getQRCode
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getQRCode") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];

      if (
        currentTab &&
        currentTab.url &&
        currentTab.url.includes("attendence-html-page.html")
      ) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: displayQRCode,
        });
      } else {
        chrome.runtime.sendMessage({ action: "urlMismatch" });
      }
    });
  }
});

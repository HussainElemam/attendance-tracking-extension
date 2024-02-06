// this function will be called when the "mark attendance" buttom is clicked
// It will fetch the student list and go through the html page and compare the ids
let unixTime;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "sendDate") {
    unixTime = request.data;
  }
});
// and mark the attendance accordingly
async function checkAttendance(time) {
  // get the day of the week to knew the correct column for the attendance
  let today = new Date();

  // get all raws from the table expect first (the header)
  const students = document.querySelectorAll(
    `.bordertable tr:not(:first-child)`
  );

  // fetch the data from the testing file later will get the data from the database
  await fetch("https://files.uaeu.club/attendance/csbp301/01/" + time + ".json")
    .then((response) => response.json())
    .then((presents) => {
      for (let student of students) {
        // get the student id from the raw to check if it exist in the data
        let id = student.querySelector("td:nth-child(2) p a").innerHTML;
        if (presents[id]) {
          let radioButton = student.querySelector(
            `td:nth-child(${today.getDay() + 4}) [value="P"]`
          );
          // if today's column is empty return an error message
          if (radioButton === null) {
            chrome.runtime.sendMessage({ action: "dateMismatch" });
            return;
          }
          // make sure the radio button is not disabled
          if (!radioButton.hasAttribute("disabled")) radioButton.checked = true;
        } else {
          let radioButton = student.querySelector(
            `td:nth-child(${today.getDay() + 4}) [value="A"]`
          );
          // if today's column is empty return an error message
          if (radioButton === null) {
            chrome.runtime.sendMessage({ action: "dateMismatch" });
            return;
          }
          if (!radioButton.hasAttribute("disabled")) radioButton.checked = true;
        }
      }
    })
    .catch((error) => {
      chrome.runtime.sendMessage({ action: "fileNotExist" });
      console.error(error);
    });
}

// listen for the message whick will come after clicking on the mark attendance button
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "markAttendance") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];

      // first make sure we are in the attendance bage else display an error message
      // todo changin the url to the real url this one is for testin
      //   if (
      //     currentTab &&
      //     currentTab.url &&
      //     currentTab.url.includes("attendence-html-page.html")
      //   ) {
      //     chrome.scripting.executeScript({
      //       target: { tabId: currentTab.id },
      //       function: checkAttendance,
      //       args: [unixTime],
      //     });
      //   } else {
      //     chrome.runtime.sendMessage({ action: "urlMismatch" });
      //   }
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: checkAttendance,
        args: [unixTime],
      });
    });
  }
});

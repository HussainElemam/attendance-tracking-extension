function checkAttendance() {
  const students = document.getElementsByClassName("student");
  fetch("../testing/attendance-report.json")
    .then((response) => response.json())
    .then((presents) => {
      let presentsArray = presents;
      for (let student of students) {
        if (!presentsArray.includes(student.id)) {
          student.querySelector('[value="absent"]').checked = true;
        } else {
          student.querySelector('[value="present"]').checked = true;
        }
      }
    })
    .catch((error) => console.error(error));
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: checkAttendance,
    });
  }
});

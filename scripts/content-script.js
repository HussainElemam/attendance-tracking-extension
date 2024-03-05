(() => {
  console.log("Content script is injected successfully");
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.action === "MarkAttendanceInPage") {
      let presents = obj.data;
      console.log(presents);

      let today = new Date();

      // get all raws from the table expect first (the header)
      const students = document.querySelectorAll(
        `.bordertable tr:not(:first-child)`
      );
      for (let student of students) {
        // get the student id from the raw to check if it exist in the data
        let id = student.querySelector("td:nth-child(2) p a").innerHTML;
        if (presents.hasOwnProperty(id)) {
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
    }
  });
})();

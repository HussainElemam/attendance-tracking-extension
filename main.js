// let presents = [700001, 700003, 700005, 700007, 700009];

// let button = document.getElementsByTagName("button")[0];

// chrome.action.onClicked.addListener((tab) => {
//   console.log(tab);
//   document.body.append("first");
// });

// button.onclick = (tab) => {
//   document.body.append("second");
//   console.log("clicked");
//   console.log(tab);
//   if (tab.url.includes("test.html")) {
//     console.log("includes test");
//     let students = document.getElementsByClassName("student");
//     students.forEach((student) => {
//       if (!presents.includes(student.id)) {
//         console.log("he is absent");
//         student.querySelector(value == "absent").checked = true;
//       }
//     });
//   }
// };
// function reddenPage() {
//   document.body.style.backgroundColor = "red";
// }

// chrome.action.onClicked.addListener((tab) => {
//   if (!tab.url.includes("chrome://")) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: reddenPage,
//     });
//   }
// });

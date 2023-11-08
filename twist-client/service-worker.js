// aka background.js

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    showReadme();
  }
});

chrome.action.onClicked.addListener(() => {
  showReadme();
});

function showReadme() {
  chrome.tabs.create({ url: '/index.html' });
}

// chrome.action.onClicked.addListener((tab) => {
//   console.log("Line 25 of service-worker.js");
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: showContent
//   });
//   console.log("Line 30 of service-worker.js");
// });
//
// function showContent() {
//   console.log("Line 34 of service-worker.js");
//   const URLmatch = "https://twitter.com/compose/tweet";
//   const currentURL = window.location.href;
//   console.log("Line 37 of service-worker.js\ncurrentURL = ", currentURL);
//   if (URLmatch.test(currentURL)) {
//     console.log("Line 39 of service-worker.js");
//     const textBox = document.createElement('textarea');
//     textBox.textContent = 'Hello, world!';
//     document.body.appendChild(textBox);
//     console.log("Line 43 of service-worker.js");
//   }
//   console.log("Line 45 of service-worker.js");
// }

function sendPostRequest(data) {
  // Replace with your actual server URL
  const serverUrl = 'http://localhost:8080';

  fetch(serverUrl, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then((response) => response.json())
      .then((responseJson) => {
      // Handle the response from the server if needed
      console.log(responseJson);
      })
      .catch((error) => {
      console.error('Error:', error);
      });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  checkURLandInject(tab.url, tabId);

  sendPostRequest({'key': 'SAMPLE STR'});
});

// When the user is on the Twitter compose tweet page, the service worker will send a message to the content script letting them know
function checkURLandInject(currentURL, tabId) {
  // console.log("currentURL = ", currentURL);
  const URLmatch = "https://twitter.com/compose/tweet";
  if (currentURL && currentURL.includes(URLmatch)) {
    chrome.tabs.sendMessage(tabId, { message: "YOU ARE AT THE CORRECT URL" });
  }
}
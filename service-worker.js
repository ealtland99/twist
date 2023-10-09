// aka background.js

chrome.runtime.onInstalled.addListener(({ reason }) => {
  console.log("Line 4 of service-worker.js");
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    console.log("Line 6 of service-worker.js");
    showReadme();
    console.log("Line 8 of service-worker.js");
  }
});

chrome.action.onClicked.addListener(() => {
  console.log("Line 13 of service-worker.js");
  showReadme();
  console.log("Line 15 of service-worker.js");
});

function showReadme() {
  console.log("Line 19 of service-worker.js");
  chrome.tabs.create({ url: '/index.html' });
  console.log("Line 21 of service-worker.js");
}

chrome.action.onClicked.addListener((tab) => {
  console.log("Line 25 of service-worker.js");
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showContent
  });
  console.log("Line 30 of service-worker.js");
});

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

chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => {
  console.log("Line 49 of service-worker.js");
  //checkURLandInject(tab.url, tabId);
  console.log("Line 51 of service-worker.js");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Line 55 of service-worker.js");
  checkURLandInject(tab.url, tabId);
  console.log("Line 57 of service-worker.js");
});

function checkURLandInject(currentURL, tabId) {
  console.log("currentURL = ", currentURL);
  const URLmatch = "https://twitter.com/compose/tweet";
  if (currentURL && currentURL.includes(URLmatch)) {
    console.log("Line 64 of service-worker.js");
    chrome.tabs.sendMessage(tabId, {message: "YOU ARE AT THE CORRECT URL"});
    console.log("Line 66 of service-worker.js");
  }
}
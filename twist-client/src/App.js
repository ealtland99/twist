import React from 'react';
import logo from './logo.svg';
import './App.css';

// const sendMessageToContentScript = () => {
//   console.log("I'm in sendMessageToContentScript in App.js");
//   chrome.scripting.executeScript({
//     target: { tabId: chrome.tabs.TAB_ID_NONE }, // Execute in the current tab
//     function: sendPostRequest,
//   });
// };

// function sendPostRequest() {
//   const data = { key: 'value' }; // Replace with your JSON data

//   chrome.runtime.sendMessage({ action: 'sendPostRequest', data }, (response) => {
//     // Handle the response from the content script if needed
//     console.log(response);
//   });
// }

const App = () => {
  // Render your React component
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h2 /*style="color:var(--color-palette-maroon);"*/> <strong> Welcome to the TWIST app! </strong> </h2>
        {/* <button onClick={sendMessageToContentScript}>Send POST Request</button> */}
      </header>
      <body>
      </body>
    </div>
  );
}

export default App;

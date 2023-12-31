// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCircleInfo } from '@fortawesome/free-regular-svg-icons'
// library.add(faCircleInfo)

const sendMessageToContentScript = () => {
    console.log("I'm in sendMessageToContentScript in content-script.js");
    chrome.scripting.executeScript({
        target: { tabId: activeTab.id }, // Execute in the current tab
        function: sendPostRequest,
      });
  };
  
  function sendPostRequest() {
    const data = { key: 'value' }; // Replace with your JSON data
  
    chrome.runtime.sendMessage({ action: 'sendPostRequest', data }, (response) => {
      // Handle the response from the content script if needed
      console.log(response);
    });
  }

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

// When the content script receives a message, it will read it here then act
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("I received a message!  Here it is: ", message.message);

    if (message.action === 'sendPostRequest') {
        const data = message.data; // JSON data from the React app
        sendPostRequest(data);
    }
    
    // TODO - These seem to change names by X way more than they should so creating variables for them
    const twitterBoxNameWSpaces = "css-175oi2r r-1wbh5a2 r-htvplk r-1udh08x r-1867qdf r-rsyp9y r-1pjcn9w r-1potc6q";
    const twitterBoxName = "." + twitterBoxNameWSpaces.replace(/\s+/g, '.');
    const twitterPostButtonWSpaces = "css-175oi2r r-1awozwy r-18u37iz r-knv0ih";
    const twitterPostButton = "." + twitterPostButtonWSpaces.replace(/\s+/g, '.');
    // const addTweetButtonWSpaces = "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-1ceczpf r-lp5zef r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l";
    // const addTweetButton = "." + addTweetButtonWSpaces.replace(/\s+/g, '.');

    if (message.message == "YOU ARE AT THE CORRECT URL") {
        waitForElm(twitterBoxName).then((elm) => {
            if (document.getElementsByClassName("twist-extension-root")[0] == null) {
                const tweetContainer = document.querySelector(twitterBoxName);

                // Create the elements and set their properties - all the HTML stuff
                const backerBox = document.createElement("div");
                backerBox.classList.add("empty-backer-box");

                const twistAppContainer = document.createElement("div");
                twistAppContainer.classList.add("twist-extension-root");

                const twistApp = document.createElement("div");
                twistApp.classList.add("TwistApp");

                const twistAppHeader = document.createElement("div");
                twistAppHeader.classList.add("TwistApp-header");
                twistAppHeader.innerHTML = '<h1> \
                                                TWIST: Trigger Warning Includer for Sensitive Topics \
                                            </h1> \
                                            <a class="info" href="info.html" title="Learn more!"> \
                                                <FontAwesomeIcon icon="fa-regular fa-circle-info" class="icon-button" style="font-size:30px; color:var(--color-palette-purple);" /> \
                                            </a>';
                twistApp.appendChild(twistAppHeader);

                const twistAppBody = document.createElement("div");
                twistAppBody.classList.add("TwistApp-body");

                const twistPageContainer = document.createElement("div");
                twistPageContainer.classList.add("twist-page-container");
                twistPageContainer.innerHTML = '<div class="twist-page active" id="page0"> \
                                                    <p>Type your tweet(s) below...</p> \
                                                </div> \
                                                <div class="twist-page" id="page1"> \
                                                    <p>Warning detected.  Can I save this tweet and warning to learn more about the usage of trigger and content warnings?</p> \
                                                </div> \
                                                <div class="twist-page" id="page2"> \
                                                    <p>No trigger or content warning detected.  Would you like me to scan to see if you need a warning?</p> \
                                                </div> \
                                                <div class="twist-page" id="page3"> \
                                                    <p>Thanks for scanning!  No sensitive content detected.  For future reference, here are some topics where it is recommended to add a warning...</p> \
                                                </div> \
                                                <div class="twist-page" id="page4"> \
                                                    <p>Thanks for scanning!  Warning recommended due to a high likelihood of one of these sensitive topics being present ____.  Heres what a trigger or content warning may look like...</p> \
                                                </div> \
                                                <div class="twist-page" id="page5"> \
                                                    <p>Thanks for using the TWIST app and making social media a safer place for sensitive users.  You can now post your tweet(s).</p> \
                                                </div>\
                                                <div class="twist-page" id="page6"> \
                                                    <p>You can now post your tweet(s).</p> \
                                                </div>';
                twistAppBody.appendChild(twistPageContainer);
                
                // Creates "Previous", "Next", and "Skip" buttons
                const prevBtn = document.createElement('button');
                prevBtn.textContent = 'Back';
                prevBtn.id = 'prevBtn';

                const nextBtn = document.createElement('button');
                nextBtn.textContent = 'Next';
                nextBtn.id = 'nextBtn';

                const skipBtn = document.createElement('button');
                skipBtn.textContent = 'Skip';
                skipBtn.id = 'skipBtn';

                prevBtn.addEventListener('click', showPreviousPage);
                nextBtn.addEventListener('click', showNextPage);
                skipBtn.addEventListener('click', showSkipAheadPage);

                // Appends the pagination buttons to the twistAppBody
                twistPageContainer.appendChild(prevBtn);
                twistPageContainer.appendChild(nextBtn);
                twistPageContainer.appendChild(skipBtn);

                // Creates and appends the invisible button
                const invisibleButton = document.createElement("div");
                invisibleButton.classList.add("invisible-button", "small-invis-btn");
                
                waitForElm(twitterPostButton).then((elm) => {
                    const elements = document.querySelectorAll(twitterPostButton);
                    if (elements.length >= 2) {
                        const targetElement = elements[1];
                        targetElement.appendChild(invisibleButton);
                    }
                });

                // Adds event listener to the invisible button click so TWIST app shows on page
                invisibleButton.addEventListener("click", function () {
                    twistAppContainer.style.display = "block";

                    // Look at text and print to console for now
                    let inputTextBoxes = tweetContainer.getElementsByClassName("DraftEditor-editorContainer");
                    let tweetText = "";
                    for (let i = 0; i < inputTextBoxes.length; i++) {
                        if (i > 0) {
                            tweetText = tweetText + " ";
                        }
                        tweetText = tweetText + inputTextBoxes[i].innerText;
                    }
                    console.log(tweetText);

                    // Simple check for whether warning is already present
                    if (tweetText.toLowerCase().includes("trigger warning") || tweetText.toLowerCase().includes("content warning")) {
                        showPage(1);
                    }
                    else {
                        showPage(2);
                    }
                });

                // Sets up the functionality for multiple pages in the design
                const pages = twistAppBody.querySelectorAll('.twist-page');
                let currentPageIndex = 0;
                let lastPageIndex = 0;

                function showPage(index) {
                    if (pages.length >= 1) {
                        pages.forEach((page, i) => {
                            if (i === index) {
                                page.classList.add('active');
                            } else {
                                page.classList.remove('active');
                            }
                        });

                        lastPageIndex = currentPageIndex;
                        currentPageIndex = index;
                        switch (currentPageIndex) {
                            case 0:
                                invisibleButton.style.display = "block";
                                prevBtn.style.display = "none";
                                nextBtn.style.display = "none";
                                skipBtn.style.display = "none";
                                break;
                            case 1:
                                invisibleButton.style.display = "block";
                                prevBtn.style.display = "none";

                                nextBtn.style.display = "block";
                                nextBtn.textContent = "Yes";

                                skipBtn.style.display = "block";
                                skipBtn.textContent = "No";
                                break;
                            case 2:
                                invisibleButton.style.display = "block";
                                prevBtn.style.display = "none";

                                nextBtn.style.display = "block";
                                nextBtn.textContent = "Yes";

                                skipBtn.style.display = "block";
                                skipBtn.textContent = "No";
                                break;
                            case 3:
                                invisibleButton.style.display = "block";
                                prevBtn.style.display = "none";

                                nextBtn.style.display = "block";
                                nextBtn.textContent = "Got It";

                                skipBtn.style.display = "none";
                                break;
                            case 4:
                                invisibleButton.style.display = "block";
                                prevBtn.style.display = "none";

                                nextBtn.style.display = "block";
                                nextBtn.textContent = "Got It";

                                skipBtn.style.display = "none";
                                break;
                            case 5:
                                invisibleButton.style.display = "none";
                                prevBtn.style.display = "block";
                                nextBtn.style.display = "none";
                                skipBtn.style.display = "none";
                                break;
                            case 6:
                                invisibleButton.style.display = "none";
                                prevBtn.style.display = "block";
                                nextBtn.style.display = "none";
                                skipBtn.style.display = "none";
                            }
                    }
                }

                function showNextPage() {
                    let nextPageIndex = 0;
                    switch (currentPageIndex) {
                        case 1:
                            nextPageIndex = 5;
                            break;
                        case 2:
                            console.log("TODO Scan then navigate to page 3 or 4");
                            nextPageIndex = 4;
                            break;
                        case 3:
                            nextPageIndex = 5;
                            break;
                        case 4:
                            nextPageIndex = 5;
                        }

                    showPage(nextPageIndex);
                }

                function showPreviousPage() {
                    showPage(lastPageIndex);
                }

                function showSkipAheadPage() {
                    showPage(6);
                }

                showPage(currentPageIndex);

                // Creates a button to minimize/maximize the TWIST app
                function toggleTWIST() {
                    if (twistPageContainer.style.display == "none") {
                        twistPageContainer.style.display = "block";
                        hideAppBtn.textContent = 'Minimize App';
                    }
                    else {
                        twistPageContainer.style.display = "none";
                        hideAppBtn.textContent = 'Maximize App';
                    }
                }

                const hideAppBtn = document.createElement('button');
                hideAppBtn.textContent = 'Minimize App';
                hideAppBtn.id = 'hideAppBtn';

                hideAppBtn.addEventListener('click', toggleTWIST);
                twistAppBody.appendChild(hideAppBtn);

                // Creates POST button to test server stuff
                const postBtn = document.createElement('button');
                postBtn.textContent = 'Post Something';
                postBtn.id = 'postBtn';

                postBtn.addEventListener('click', sendPostRequest);
                twistAppBody.appendChild(postBtn);

                // Builds the twistAppContainer with all its components but hides it until the post button (really overlaid invisible button) is pressed
                twistApp.appendChild(twistAppBody);
                twistAppContainer.appendChild(twistApp);
                twistAppContainer.style.display = "none";

                // Append the elements to the target on Twitter page
                tweetContainer.insertBefore(twistAppContainer, tweetContainer.firstChild);

                console.log("TWIST APP HAS BEEN CREATED AND ADDED TO PAGE");
            }
            else {
                console.log("TWIST APP ALREADY EXISTS - I should never get here anymore");
            }
        });
    }
    else if (message.message == "ADD BUTTON PRESSED")  {
        // TODO add invisible button again
    }
});

// This function waits for an element to be present before acting on it 
// (like when you want to append to something, you need to ensure it's there first)
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

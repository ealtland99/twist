// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCircleInfo } from '@fortawesome/free-regular-svg-icons'
// library.add(faCircleInfo)

// When the content script receives a message, it will read it here then act
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("I received a message!  Here it is: ", message.message);

    if (message.message == "YOU ARE AT THE CORRECT URL") {
        waitForElm(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q").then((elm) => {
            console.log("FOUND ELEMENT TO PREPEND TO");

            if (document.getElementsByClassName("twist-extension-root")[0] == null) {
                console.log("TWIST APP DOES NOT EXIST");

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
                twistAppBody.innerHTML = '<div class="page-container"> \
                                            <div class="page active" id="page1"> \
                                                <h1>Page 1</h1> \
                                                <p>This is the first page.</p> \
                                            </div> \
                                            <div class="page" id="page2"> \
                                                <h1>Page 2</h1> \
                                                <p>This is the second page.</p> \
                                            </div> \
                                            <div class="page" id="page3"> \
                                                <h1>Page 3</h1> \
                                                <p>This is the third page.</p> \
                                            </div> \
                                        </div>';
                twistApp.appendChild(twistAppBody);

                // Sets up the functionality for multiple pages in the design
                const pages = document.querySelectorAll('.page');
                let currentPageIndex = 0;

                function showPage(index) {
                    if (index < 0) {
                        index = 0;
                    } else if (index >= pages.length) {
                        index = pages.length - 1;
                    }

                    pages.forEach((page, i) => {
                        if (i === index) {
                            page.classList.add('active');
                        } else {
                            page.classList.remove('active');
                        }
                    });

                    currentPageIndex = index;
                }

                function showNextPage() {
                    showPage(currentPageIndex + 1);
                }

                function showPreviousPage() {
                    showPage(currentPageIndex - 1);
                }

                showPage(currentPageIndex);

                // Creates "Previous" and "Next" buttons
                const prevBtn = document.createElement('button');
                prevBtn.textContent = 'Previous';
                prevBtn.id = 'prevBtn';

                const nextBtn = document.createElement('button');
                nextBtn.textContent = 'Next';
                nextBtn.id = 'nextBtn';

                prevBtn.addEventListener('click', showPreviousPage);
                nextBtn.addEventListener('click', showNextPage);

                // Appends the pagination buttons to the twistAppBody
                twistAppBody.appendChild(prevBtn);
                twistAppBody.appendChild(nextBtn);

                // Builds the twistAppContainer with all its components but hides it until the post button (really overlaid invisible button) is pressed
                twistAppContainer.appendChild(twistApp);
                twistAppContainer.style.display = "none";

                // Append the elements to the target on Twitter page
                const tweetContainer = document.querySelector(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q");
                tweetContainer.insertBefore(twistAppContainer, tweetContainer.firstChild);

                // Creates and append the invisible button
                const invisibleButton = document.createElement("div");
                invisibleButton.classList.add("invisible-button", "small-invis-btn");

                waitForElm(".css-1dbjc4n.r-1awozwy.r-18u37iz.r-1s2bzr4").then((elm) => {
                    const elements = document.querySelectorAll(".css-1dbjc4n.r-1awozwy.r-18u37iz.r-1s2bzr4");
                    if (elements.length >= 2) {
                        console.log("Elements: " + elements.length);
                        const targetElement = elements[1];
                        targetElement.appendChild(invisibleButton);
                    } else if (elements.length == 1) {
                        // Handle the case where there are less than two elements with the specified class
                        console.log("ERROR ERROR ERROR - There are fewer than two elements with the specified class.");
                    }
                    else {
                        console.log("Need to add waitForElm I think");
                    }
                });

                // Adds event listener to the invisible button click so TWIST app shows on page
                invisibleButton.addEventListener("click", function () {
                    console.log("Button clicked!");
                    twistAppContainer.style.display = "block";
                });

                console.log("TWIST APP HAS BEEN CREATED AND ADDED TO PAGE");
            }
            else {
                console.log("TWIST APP ALREADY EXISTS");
            }
        });
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

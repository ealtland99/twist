// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCircleInfo } from '@fortawesome/free-regular-svg-icons'
// library.add(faCircleInfo)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("I received a message!  Here it is: ", message.message);

    waitForElm(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q").then((elm) => {
        console.log("FOUND ELEMENT TO PREPEND TO");

        if (document.getElementsByClassName("twist-extension-root")[0] == null) {
            console.log("TWIST APP DOES NOT EXIST");

            // jquery way
            // $(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q").prepend('<div class="empty-backer-box"> </div> \
            //                                                                                                 <div class="twist-extension-root"> \
            //                                                                                                     <div class="TwistApp"> \
            //                                                                                                         <div class="TwistApp-header"> \
            //                                                                                                             <h1> \
            //                                                                                                                 TWIST: Trigger Warning Includer for Sensitive Topics \
            //                                                                                                             </h1> \
            //                                                                                                             <a class="info" href="info.html" title="Learn more!"> \
            //                                                                                                                 <FontAwesomeIcon icon="fa-regular fa-circle-info" class="icon-button" style="font-size:30px; color:var(--color-palette-purple);" /> \
            //                                                                                                             </a> \
            //                                                                                                         </div> \
            //                                                                                                         <div class="TwistApp-body"> \
            //                                                                                                             <p> Type your tweet(s) below... </p> \
            //                                                                                                         </div> \
            //                                                                                                     </div> \
            //                                                                                                 </div>');

            // Create the elements and set their properties
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
            twistAppBody.innerHTML = '<p> Type your tweet(s) below... </p>';
            twistApp.appendChild(twistAppBody);

            twistAppContainer.appendChild(twistApp);

            // Append the elements to the target
            const tweetContainer = document.querySelector(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q");
            tweetContainer.insertBefore(twistAppContainer, tweetContainer.firstChild);

            // jquery way
            // $(".twist-extension-root").after('<div class = "invisible-button">  </div>');
            // $(".invisible-button").on("click", function () {
            //     console.log("Button clicked!");

            //     $(".TwistApp-body").html('<div class="TwistApp-body"> <strong> Button was pressed! </strong> </div>');
            // });

            // Create and append the invisible button
            const invisibleButton = document.createElement("div");
            invisibleButton.classList.add("invisible-button");

            // const targetElement = document.querySelector(".css-1dbjc4n.r-1awozwy.r-18u37iz.r-1s2bzr4");
            // if (targetElement) {
            //     targetElement.appendChild(invisibleButton);
            // }

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

            // Add click event listener to the invisible button
            invisibleButton.addEventListener("click", function () {
                console.log("Button clicked!");
                twistAppBody.innerHTML = '<p class="TwistApp-body"> <strong> Button was pressed! </strong> </p>';
            });

            console.log("TWIST APP HAS BEEN CREATED AND ADDED TO PAGE");
        }
        else {
            console.log("TWIST APP ALREADY EXISTS");
        }
    });

});

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

function addWarning() {
    console.log("Add Warning Button Pressed");
}

function cancelWarning() {
    console.log("Maybe Later Button Pressed");
}
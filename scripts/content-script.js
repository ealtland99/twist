// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCircleInfo } from '@fortawesome/free-regular-svg-icons'
// library.add(faCircleInfo)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("I received a message!  Here it is: ", message.message);

    waitForElm(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q").then((elm) => {
        console.log("FOUND ELEMENT TO PREPEND TO");

        if (document.getElementsByClassName("twist-extension-root")[0] == null) {
            console.log("TWIST APP DOES NOT EXIST");

            $(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q").prepend('<div class="empty-backer-box"> </div> \
                                                                                                            <div class="twist-extension-root"> \
                                                                                                                <div class="TwistApp"> \
                                                                                                                    <header class="TwistApp-header"> \
                                                                                                                        <h1> \
                                                                                                                            TWIST: Trigger Warning Includer for Sensitive Topics \
                                                                                                                        </h1> \
                                                                                                                        <a class="info" href="info.html" title="Learn more!"> \
                                                                                                                            <FontAwesomeIcon icon="fa-regular fa-circle-info" class="icon-button" style="font-size:30px; color:var(--color-palette-purple);" /> \
                                                                                                                        </a> \
                                                                                                                    </header> \
                                                                                                                    <body class="TwistApp-body"> \
                                                                                                                    </body> \
                                                                                                                </div> \
                                                                                                            </div>');

            // gets inserted twice and only when "post" button is present not "post all" button :(
            // waitForElm(".css-1dbjc4n.r-1awozwy.r-18u37iz.r-1s2bzr4").then((elm) => {
            //     $(".css-1dbjc4n.r-1awozwy.r-18u37iz.r-1s2bzr4").before('<div class = "invisible-button"> abc </div>');
            // });

            $(".twist-extension-root").after('<div class = "invisible-button">  </div>');

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
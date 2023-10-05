chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("I received a message!  Here it is: ", message.message);

    waitForElm(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q").then((elm) => {
        console.log("FOUND ELEMENT TO PREPEND TO");

        // old way - 'warning needed' text and all buttons show up whenever /compose/tweet URL is detected
        if (document.getElementById("twist-extension-root") == null) {
            console.log("TWIST APP DOES NOT EXIST");
            $(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q").prepend('<div class="empty-backer-box"> </div> \
                                                                                                            <div id="twist-extension-root"> \
                                                                                                                <div class="TwistApp"> \
                                                                                                                    <header class="TwistApp-header"> \
                                                                                                                        <h1> \
                                                                                                                            TWIST: Trigger Warning Includer for Sensitive Topics \
                                                                                                                        </h1> \
                                                                                                                    </header> \
                                                                                                                    <body class="TwistApp-body"> \
                                                                                                                        <p> \
                                                                                                                            Based on the content highlighted below, we think you should add a trigger warning for _____.<br>Would you like me to add it as the first message of the thread? \
                                                                                                                        </p> \
                                                                                                                        <div class="buttons-box"> \
                                                                                                                            <button name="submit" class="action_btn submit" type="submit" value="Add Warning" onclick="addWarning()"> Yes please! </button> \
                                                                                                                            <button name="submit" class="action_btn cancel" type="submit" value="Cancel" onclick="cancelWarning()"> Maybe later </button> \
                                                                                                                            <a class="info" href="info.html" title="Learn more!"> \
                                                                                                                                <img \
                                                                                                                                    src="images/info_icon.png" \
                                                                                                                                    alt="info icon" \
                                                                                                                                /> \
                                                                                                                            </a> \
                                                                                                                        </div> \
                                                                                                                    </body> \
                                                                                                                </div> \
                                                                                                            </div>');
                                                                                                            
            console.log("TWIST APP HAS BEEN CREATED AND ADDED TO PAGE");
        }

        // beginnings of new way where simplified app is created initially then modifed if the need for a warning is detected
        // if (document.getElementsByClassName("TwistApp") == null) {
        //     console.log("TWIST APP DOES NOT EXIST");

        //     $(".css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q").prepend('<div class="empty-backer-box"> </div> \
        //                                                                                                     <div id="twist-extension-root"> \
        //                                                                                                         <div class="TwistApp"> \
        //                                                                                                             <header class="TwistApp-header"> \
        //                                                                                                                 <h1> \
        //                                                                                                                     TWIST: Trigger Warning Includer for Sensitive Topics \
        //                                                                                                                 </h1> \
        //                                                                                                             </header> \
        //                                                                                                             <body class="TwistApp-body"> \
        //                                                                                                             </body> \
        //                                                                                                         </div> \
        //                                                                                                     </div>');
            
        //     console.log("TWIST APP HAS BEEN CREATED AND ADDED TO PAGE");
        // }
        // else if (document.getElementsByClassName(".TwistApp .buttons-box") == null) {
        //     // Check if warning is needed here

        //     // $(".TwistApp-body").append('<p> \
        //     //                                 Based on the content highlighted below, we think you should add a trigger warning for _____.<br>Would you like me to add it as the first message of the thread? \
        //     //                             </p> \
        //     //                             <div class="buttons-box"> \
        //     //                                 <button name="submit" class="action_btn submit" type="submit" value="Add Warning" onclick="addWarning()"> Yes please! </button> \
        //     //                                 <button name="submit" class="action_btn cancel" type="submit" value="Cancel" onclick="cancelWarning()"> Maybe later </button> \
        //     //                                 <a class="info" href="info.html" title="Learn more!"> \
        //     //                                     <img \
        //     //                                         src="images/info_icon.png" \
        //     //                                         alt="info icon" \
        //     //                                     /> \
        //     //                                 </a> \
        //     //                             </div>');
        // }
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
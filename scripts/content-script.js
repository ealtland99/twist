chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("I received a message!  Here it is: ", message);

    // jquery way w/o waitForElm - doesn't work
    // $(document).ready(function() {
    //     $('.css-1dbjc4n.r-gtdqiz.r-ipm5af.r-136ojw6').prepend('<div style="color:DarkGreen; border: 1px"> <p> Testing 123 </p> </div>');
    // });

    // waitForElm('.css-1dbjc4n.r-gtdqiz.r-ipm5af.r-136ojw6').then((elm) => {
    //     console.log('Element is ready');

    //     // plain JS way
    //     var box = document.querySelector('.css-1dbjc4n.r-gtdqiz.r-ipm5af.r-136ojw6') 
    //     var myBox = document.createElement('p');
    //     myBox.style.color = "red";
    //     myBox.appendChild(document.createTextNode('Hello World!'));
    //     box.insertBefore(myBox, null);

    //     // jquery way
    //     $('.css-1dbjc4n.r-gtdqiz.r-ipm5af.r-136ojw6').prepend('<div style="color:DeepPink; border: 1px"> <p> Emily </p> </div>');
    // });

    waitForElm('.css-1dbjc4n.r-1pi2tsx.r-1d2f490.r-1xcajam.r-ipm5af.r-13qz1uu').then((elm) => {
        console.log('Found element');
        $('.css-1dbjc4n.r-1pi2tsx.r-1d2f490.r-1xcajam.r-ipm5af.r-13qz1uu').append('<div id="twist-extension-root"> \
                                                                                       <div className="TwistApp"> \
                                                                                           <header className="TwistApp-header"> \
                                                                                               <h1> \
                                                                                                   TWIST \
                                                                                               </h1> \
                                                                                           </header> \
                                                                                           <body className="TwistApp-body"> \
                                                                                               <h2> \
                                                                                                   Trigger Warning Includer for Sensitive Topics \
                                                                                               </h2> \
                                                                                               <p> \
                                                                                                   A chrome extension to nudge social media posters to use TW/CW \
                                                                                               </p> \
                                                                                           </body> \
                                                                                       </div> \
                                                                                   </div>');
        console.log('Appended to element');
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
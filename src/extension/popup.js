/* global chrome */

(function () {
    const allow = document.getElementById('allow');
    const disallow = document.getElementById('disallow');

    const doTheThing = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {findLinks: true}, function(response) {
            if(response.done) {
                allow.innerText = 'Links trusted: ' + response.linksCountAllowed;
                disallow.innerText = 'Links untrusted: ' + response.linksCountBlocked;
            }
          });
        });
    };

    doTheThing();
})();

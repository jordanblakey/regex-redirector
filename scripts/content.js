// This code is used to redirect users to a different URL based on the URL they
// are currently on. This is done by checking for a pattern match in the chrome
// storage with the URL. If a match is found, the user is redirected to the URL
// provided in the chrome storage.

const logStyle =
  "padding: 6px 12px; border-radius: 20px; font-weight: bold; color: white; background-color: #4158D0; background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);";

function checkRedirects() {
  chrome.storage.local.get(["redirects"]).then((response) => {
    for (pString in response.redirects) {
      let pattern = new RegExp(pString.slice(1, pString.length - 1));
      if (location.href.match(pattern)) {
        chrome.runtime.sendMessage({ redirectNotification: true });
        location.href = `http://${response.redirects[pString]}`;
      }
    }
  });
}

function createObserver() {
  var previousUrl = "";
  var observer = new MutationObserver((mutations) => {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
      checkRedirects();
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);
  console.log("%c▶️▶️ Regex Redirector is active.", logStyle);
}

checkRedirects(); // initial check
createObserver();

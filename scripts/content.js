const logStyle =
  "padding: 6px 12px; border-radius: 20px; font-weight: bold; color: white; background-color: #4158D0; background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);";

function createObserver() {
  var previousUrl = "";
  var observer = new MutationObserver((mutations) => {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
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
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);
  console.log("%c▶️▶️ Regex Redirector is active.", logStyle);
}

createObserver();

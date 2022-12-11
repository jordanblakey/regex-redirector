chrome.runtime.onMessage.addListener(function (request, sender) {
  if (
    request.hasOwnProperty("redirectNotification") &&
    request.redirectNotification == true
  ) {
    chrome.action.setBadgeText({ text: "▶️▶️" });
    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, 5000);
  }
});

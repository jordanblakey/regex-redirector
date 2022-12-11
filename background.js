// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender) {
  // If the message contains a 'redirectNotification' property
  // and its value is true
  if (
    request.hasOwnProperty("redirectNotification") &&
    request.redirectNotification == true
  ) {
    // Set the browser action's badge text to "▶️▶️"
    console.log("Setting badge text to '▶️▶️'");
    chrome.action.setBadgeText({ text: "▶️▶️" }, () => {
      // After 5 seconds, reset the badge text
      setTimeout(() => {
        console.log("Clearing badge text");
        chrome.action.setBadgeText({ text: "" });
      }, 5000);
    });
  }
});

import {
  handleAddRedirect,
  renderRedirectList,
  putRedirect,
} from "./handlers.js";

let button = document.getElementById("add-redirect");
button.addEventListener("click", handleAddRedirect);
await renderRedirectList();

// Dev only ///////////////////////////////////////////////////////////////////////////
async function seedRedirects() {
  await chrome.storage.local.remove(["redirects"]);
  await putRedirect(/\wtest1/, "www.example1.com");
  await putRedirect(/\wtest2/, "www.example2.com");
}
// await seedRedirects();
// await renderRedirectList();

// Use to convert an object key to a Regex pattern
// new RegExp(key.slice(1, key.length - 1))

import { handleAddRedirect, renderRedirectList } from "./handlers.js";

// Adds a click listener to the button to call handleAddRedirect.
// Calls renderRedirectList to display the current redirects.
let button = document.getElementById("add-redirect");
button.addEventListener("click", handleAddRedirect);
await renderRedirectList();

import { handleAddRedirect, renderRedirectList } from "./handlers.js";

let button = document.getElementById("add-redirect");
button.addEventListener("click", handleAddRedirect);
await renderRedirectList();

export async function putRedirect(pattern, url) {
  await chrome.storage.local.get(["redirects"]).then((res) => {
    if (!res.hasOwnProperty("redirects")) res.redirects = {};
    res.redirects[pattern] = url;
    chrome.storage.local.set({ redirects: res.redirects });
  });
}

export async function deleteRedirect(pattern) {
  await chrome.storage.local.get(["redirects"]).then((res) => {
    if (res.hasOwnProperty("redirects")) {
      delete res.redirects[pattern];
      chrome.storage.local.set({ redirects: res.redirects });
    }
  });
}

export async function printRedirects() {
  await chrome.storage.local.get(["redirects"]).then((res) => {
    console.log(res.redirects);
  });
}

function isUrl(string) {
  const urlValidator =
    /^(https?:\/\/)?([a-z]{2,3}\.)?([a-z-_0-9]{2,256}\.)([a-z]{2,6}\.?)+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return Boolean(string.match(urlValidator));
}

function isPattern(string) {
  if (string.startsWith("/") && string.endsWith("/") && string.length > 2) {
    return true;
  }
  return false;
}

export async function handleAddRedirect() {
  let patternInput = document.getElementById("pattern");
  let pattern = patternInput.value;
  let redirectInput = document.getElementById("redirect");
  let redirect = redirectInput.value;

  // validate input
  let errorTemplate = `Couldn't save redirect [pattern: "${pattern}" -> redirect: "${redirect}"].`;
  if (!isPattern(pattern)) {
    alert(errorTemplate + " Please enter a regex pattern");
    return;
  } else if (!isUrl(redirect)) {
    alert(errorTemplate + " Please enter a url.");
    return;
  }

  await putRedirect(pattern, redirect);
  await renderRedirectList();

  patternInput.value = "";
  redirectInput.value = "";
}

export async function renderRedirectList() {
  let response = await chrome.storage.local.get(["redirects"]);
  console.log(response);
  let redirectList = document.getElementById("redirect-list");
  redirectList.innerHTML = "";
  for (let pattern in response.redirects) {
    console.log(pattern);
    console.log(response.redirects[pattern]);
    let redirectListItem = document.createElement("li");
    redirectListItem.id = pattern;
    redirectListItem.innerHTML = `Pattern: ${pattern}<br />Redirect: ${response.redirects[pattern]}`;
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#x2715;";
    deleteButton.addEventListener("click", async function () {
      await deleteRedirect(pattern);
      renderRedirectList();
    });
    redirectListItem.appendChild(deleteButton);
    redirectList.appendChild(redirectListItem);
  }
}

async function putRedirect(pattern, url) {
  await chrome.storage.local.get(["redirects"]).then(res => {
    if (!res.hasOwnProperty("redirects")) res.redirects = {}
    res.redirects[pattern] = url
    chrome.storage.local.set({"redirects": res.redirects})
  })
}

async function deleteRedirect(pattern) {
  await chrome.storage.local.get(["redirects"]).then(res => {
    if (res.hasOwnProperty("redirects")) {
      delete res.redirects[pattern]
      chrome.storage.local.set({"redirects": res.redirects})
    }
  })
}


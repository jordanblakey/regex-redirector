console.log("Hello from content script")


chrome.storage.local.set({"test": 1})
let storageState = chrome.storage.local.get(null)
console.log(storageState)
console.log(Object.keys(storageState))

storageState.then(res => {console.log("res:", res)})

// console.log(chrome)
// chrome.runtime.sendMessage({redirect: "https://wikipedia.org"})
// console.log(window.location.href)

// if (window.location.href != 'https://www.example.com/') {
//   window.location.href = 'https://www.example.com/'
// }

// chrome.storage.local.clear();

// chrome.storage.local.get(["redirects"]).then(response => {
//   let redirects
//   if (response.hasOwnProperty("redirects")) {
//     redirects = response.redirects
//   } else {
//     redirects = {}
//   }
//   redirects["www.example.com"] = /\wtest1/
//   redirects["www.example2.com"] = /\wtest2/
//   chrome.storage.local.set({"redirects": redirects}).then(() => chrome.storage.local.get(["redirects"]).then(response => {
//     console.log(response)
//     console.log(Object.keys(response.redirects))
//     console.log(Object.values(response.redirects))
//     console.log(Object.entries(response.redirects))
//   }))
// })




// chrome.storage.local.get(["redirects"]).then(redirects => {
//   redirects["\wtest"] = "www.example.com"
//   chrome.storage.local.set({redirects})
// })

// chrome.storage.local.get(["redirects"]).then((redirects) => {
//   console.log(redirects)
// })
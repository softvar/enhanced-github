function openOptionsPage() {
  if(browser) {
    if(browser.runtime.openOptionsPage) {
      // Firefox
      browser.runtime.openOptionsPage();
    } else {
      // Edge
      browser.tabs.create({ url: `ms-browser-extension://${getRuntimeId()}/options.html` }); 
    }
  } else {
    // Chrome
    chrome.tabs.create({ url: `chrome://extensions/?options=${getRuntimeId()}` });
  }
}

function getRuntimeId() {
  if(typeof browser === undefined) {
    return chrome.runtime.id;
  } else {
    return browser.runtime.id;
  }
}
/* global chrome */
const MessageType = {
  PAGE_RENDERED: 'pageRendered'
};

let currentUrl = '';
let tabId;

chrome.webRequest.onCompleted.addListener(
  function(details) {
    const parsedUrl = new URL(details.url);

    if (currentUrl && currentUrl.indexOf(parsedUrl.pathname) > -1 && tabId) {
      chrome.tabs.sendMessage(tabId, { type: MessageType.PAGE_RENDERED });
    }
  },
  { urls: ['*://*.github.com/*'] }
);

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  tabId = details.tabId;
  currentUrl = details.url;
});

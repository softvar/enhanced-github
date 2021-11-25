/* global chrome */
const MessageType = {
  PAGE_RENDERED: 'pageRendered'
};

let currentUrl = '';
let tabId;

/**
 * Check the status of calls being sent from github.com domain.
 * This is required to know whether the page which is responsible for rendering GitHub page has completed.
 * GitHub is now SPA
 *
 * Read the deatiled blog - https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8
 */
chrome.webRequest.onCompleted.addListener(
  function(details) {
    const parsedUrl = new URL(details.url);

    if (currentUrl && currentUrl.indexOf(parsedUrl.pathname) > -1 && tabId) {
      chrome.tabs.sendMessage(tabId, { type: MessageType.PAGE_RENDERED });
    }
  },
  { urls: ['*://*.github.com/*'] }
);

/**
 * Since, GitHub is now SPA, we need to add this listener to know when page-url has changed so that Extension can work on all pages perfectly.
 *
 * Read the deatiled blog - https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8
 */
chrome.webNavigation.onHistoryStateUpdated.addListener(
  details => {
    tabId = details.tabId;
    currentUrl = details.url;
  },
  {
    url: [
      {
        hostSuffix: 'github.com'
      }
    ]
  }
);

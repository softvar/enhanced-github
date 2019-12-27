/* global chrome */
const domUtil = require('./domUtil');
const MessageType = require('../enums/MessageType');

let url = location.href;

let webNavigationUtil = {
  onPushStateHandler: () => {
    let urlVisitedList = [];

    window.onpopstate = event => {
      if (!urlVisitedList.includes(event.state.url)) {
        chrome.runtime.sendMessage({ url: event.state.url });
        // do not make an API call when url changes in a SPA app, thereby preventing rate limiting
        urlVisitedList.push(event.state.url);
        url = event.state.url;
      }
    };
  },
  onUrlChange: () => {
    // Reference - https://stackoverflow.com/a/44819548/2494535 by Sjeiti

    document.body.addEventListener(
      'click',
      () => {
        requestAnimationFrame(() => {
          if (url !== window.location.href) {
            chrome.runtime.sendMessage({ url: window.location.href });
            url = window.location.href;
          }
        });
      },
      true
    );
  },
  onMessage: () => {
    chrome.runtime.onMessage.addListener(function(request, _sender, _sendResponse) {
      if (request && request.type === MessageType.PAGE_RENDERED) {
        domUtil.addRepoData();
      }
    });
  },
  addListners: () => {
    webNavigationUtil.onPushStateHandler();
    webNavigationUtil.onUrlChange();
    webNavigationUtil.onMessage();
  }
};

module.exports = webNavigationUtil;

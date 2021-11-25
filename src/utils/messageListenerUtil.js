/* global chrome */
const domUtil = require('./domUtil');
const MessageType = require('../enums/MessageType');

const messageListenerUtil = {
  onMessage: () => {
    chrome.runtime.onMessage.addListener(function(request, _sender, _sendResponse) {
      if (request && request.type === MessageType.PAGE_RENDERED) {
        domUtil.addRepoData();
      }
    });
  },
  addListners: () => {
    messageListenerUtil.onMessage();
  }
};

module.exports = messageListenerUtil;

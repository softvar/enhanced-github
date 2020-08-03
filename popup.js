/* global chrome */

document.getElementById('settings-btn').addEventListener('click', function() {
  chrome.runtime.openOptionsPage();
});

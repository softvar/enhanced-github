/*!
 * enhanced-github
 * https://github.com/softvar/enhanced-github
 *
 * Licensed MIT (c) Varun Malhotrs
 */
const webNavigationUtil = require('./utils/webNavigationUtil');
const domUtil = require('./utils/domUtil');
const storageUtil = require('./utils/storageUtil');
const CommonEnum = require('./enums/CommonEnum');

window.chrome.extension.sendMessage({}, function(_response) {
  let readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      document.addEventListener(
        'click',
        function(e) {
          if (domUtil.hasClass(e.target, 'js-file-clipboard')) {
            domUtil.selectText();
          }
        },
        false
      );

      webNavigationUtil.addListners();

      window.chrome.storage.sync.get(
        {
          'x-github-token': ''
        },
        function(storedData) {
          storageUtil.set(CommonEnum.TOKEN, storedData['x-github-token']);
          domUtil.addRepoData();
        }
      );
    }
  }, 10);
});

/*!
 * enhanced-github
 * https://github.com/softvar/enhanced-github
 *
 * Licensed MIT (c) Varun Malhotra
 */
const messageListenerUtil = require('./utils/messageListenerUtil');
const domUtil = require('./utils/domUtil');
const storageUtil = require('./utils/storageUtil');
const CommonEnum = require('./enums/CommonEnum');

(function() {
  window.enhancedGithub = {
    config: {}
  };

  const readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      var vote_result = "not_hello";

      document.addEventListener(
        'click',
        function(e) {

          // graphql poste vote.
          // maybe gets vote side from chrome.storage that onPathContentFetched saved.

          // const vote = chrome.storage("vote")
          vote_result = getVote();

          if (vote_result !== "hello") {

            // if status is good, continue.

            if (domUtil.hasClass(e.target, 'js-file-clipboard')) {
              domUtil.selectText();
            }
          //} else {
          //   // maybe remove from chrome.storage the last vote.
          //}
          }

        },
        false
      );

      if (vote_result !== "hello") {
          messageListenerUtil.addListners();

          chrome.storage.sync.get(
            {
              'x-github-token': ''
            },
            function(storedData) {
              if (storedData) {
                storageUtil.set(CommonEnum.TOKEN, storedData['x-github-token']);
              }
              domUtil.addRepoData();
            }
          );
      }
    }
  }, 10);
})();

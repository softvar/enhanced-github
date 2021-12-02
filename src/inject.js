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
const superagent = require('superagent');
function post() {
  superagent
    .post('http://localhost:4000/graphql')
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "b", contributor_id: "2", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "a", contributor_id: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "a") { vote_code } }' }
      { query: '{ getVoteEverything }' }
      //{ query: '{ setVote(pr_id: "b" contributor_id: "1", side: 0 ) { vote_code } }' }
      //{ query: '{ setVote(pr_id: "c" contributor_id: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json')
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

var voted = false;

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
          vote_result = post();

          voted = true;


            // if status is good, continue.

            if (domUtil.hasClass(e.target, 'js-file-clipboard')) {
              domUtil.selectText();
            }
          //} else {
          //   // maybe remove from chrome.storage the last vote.
          //}

        },
        false
      );

      //if (voted === true) {
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
      //}
    }
  }, 10);
})();

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

if (window.opener && window.opener !== window) {
  // you are in a popup
} else {
  function post(issue_id, contributor_id, side) {
    superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        { query: `{ setVote(pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }` }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json')
      .end((err, res) => {
        // Calling the end function will send the request
      });
  }
  
  (function() {
    window.enhancedGithub = {
      config: {}
    };
  
    const readyStateCheckInterval = setInterval(function() {
      if (document.readyState === 'complete') {
        clearInterval(readyStateCheckInterval);
  
        document.addEventListener(
          'click',
          function(e) {
  
            // graphql poste vote.
            // maybe gets vote side from chrome.storage that onPathContentFetched saved.
            // const vote = chrome.storage("vote")
            // if status is good, continue.
  
            //console.log(e.target)
            var side = "undefined";
            if (domUtil.hasId(e.target, 'voteYes')) {
              side = "yes";
            } else if (domUtil.hasId(e.target, 'voteNo')) {
              side = "no";
            }
            if (side !== "undefined" ) {
              const issue_id = domUtil.getId(e.target, 'issue_id');
              const contributor_id = domUtil.getId(e.target, 'contributor_id');
  
              post(issue_id, contributor_id, side);
            }
  
            if (domUtil.hasClass(e.target, 'js-file-download')) {
              domUtil.selectText();
            }
  
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
}
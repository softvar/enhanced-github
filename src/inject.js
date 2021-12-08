/*!
 * enhanced-github
 * https://github.com/softvar/enhanced-github
 *
 * Licensed MIT (c) Varun Malhotra
 */
const React = require("react");
const { render } =require("react-dom");
const { createClient } = require('graphql-ws');
//const WebSocket = require('ws');

const messageListenerUtil = require('./utils/messageListenerUtil');
const domUtil = require('./utils/domUtil');
const storageUtil = require('./utils/storageUtil');
const CommonEnum = require('./enums/CommonEnum');
const superagent = require('superagent');
const commonUtil = require("./utils/commonUtil");
const authContributor = require("./authorizedContributor");

var isRepoTurboSrcToken = false;

let like_button_container = document.querySelectorAll('#like_button_container');
if (like_button_container.length) {

  const client = createClient({
    url: 'ws://localhost:3000/graphql',
    //webSocketImpl: WebSocket
  });


  // query
  //(async () => {
  //  const result = await new Promise((resolve, reject) => {
  //    let result;
  //    client.subscribe(
  //      {
  //        query: '{ hello }',
  //      },
  //      {
  //        next: (data) => (result = data),
  //        error: reject,
  //        complete: () => resolve(result),
  //      },
  //    );
  //  });
  //
  //  expect(result).toEqual({ hello: 'Hello World!' });
  //})();

  // subscription
  (async () => {
    const onNext = (data) => {
      /* handle incoming values */
      console.log(data);
    };

    let unsubscribe = () => {
      /* complete the subscription */
    };

    await new Promise((resolve, reject) => {
      unsubscribe = client.subscribe(
        {
          query: 'subscription { greetings }',
        },
        {
          next: onNext,
          error: reject,
          complete: resolve,
        },
      );
    });

    //expect(onNext).toBeCalledTimes(5); // we say "Hi" in 5 languages
  })();

//if (window.opener && window.opener !== window) {
  // you are in a popup
  // Button react component
  const e = React.createElement;

  class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = { liked: false };
    }

    render() {
      if (this.state.liked) {
        return 'You liked this.';
      }

      return e(
        'button',
        { onClick: () => this.setState({ liked: true }) },
        'Like'
      );
    }
  }

const domContainer = document.querySelector('#like_button_container');
render(e(LikeButton), domContainer);
} else {

  async function get_repo_status(repo_id) {
      return await superagent
      .post('http://localhost:4000/graphql')
      .send(
      { query: `{ getRepoStatus(repo_id: "${repo_id}") }`}
      ).set('accept', 'json')
      //.end((err, res) => {
      //  //console.log(repo_id)
      //  //console.log('hey')
      //  //console.log('res: ' + res['body']['data']['getRepoStatus'])
      //  //const text= res['text'];
      //  //console.log(text);
      //  //isRepoTurboSrcToken = res;
      //  // Calling the end function will send the request
      //  return res
      //})
  }

  async function get_authorized_contributor(repo_id, contributor_id) {
      return await superagent
      .post('http://localhost:4000/graphql')
      .send(
      { query: `{ getAuthorizedContributor(contributor_id: "${contributor_id}", repo_id: "${repo_id}") }`}
      ).set('accept', 'json')
  }

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

  (async function() {
    window.enhancedGithub = {
      config: {}
    };

    const path = commonUtil.getUsernameWithReponameFromGithubURL();
    const repo_id = `${path.user}/${path.repo}`;

    const res_get_repo_status = await get_repo_status(repo_id);
    const isRepoTurboSrcToken = res_get_repo_status['body']['data']['getRepoStatus'];
    const contributor_id =  authContributor.getAuthContributor();
    const res_get_authorized_contributor =  await get_authorized_contributor(contributor_id, repo_id);
    const isAuthorizedContributor = res_get_authorized_contributor['body']['data']['getAuthorizedContributor'];

    console.log('isAuthorizedContributor: ' + isAuthorizedContributor);

    const readyStateCheckInterval = setInterval(function() {
      if (document.readyState === 'complete'  & isRepoTurboSrcToken === true & isAuthorizedContributor === true) {
        clearInterval(readyStateCheckInterval);

        document.addEventListener(
          'click',
          async function(e) {

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
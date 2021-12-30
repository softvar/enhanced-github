/*!
 * enhanced-github
 * https://github.com/softvar/enhanced-github
 *
 * Licensed MIT (c) Varun Malhotra
 */
const React = require("react");
const {useState} = require("react");
const { render } =require("react-dom");
const { useDispatch } = require('react-redux')
const { createClient } = require('graphql-ws');
import './index.css';
import App from './App';
//const { createClient: redisCreateClient } = require('redis');
//const WebSocket = require('ws');

const messageListenerUtil = require('./utils/messageListenerUtil');
const domUtil = require('./utils/domUtil');
const storageUtil = require('./utils/storageUtil');
const CommonEnum = require('./enums/CommonEnum');
const superagent = require('superagent');
const commonUtil = require("./utils/commonUtil");
const authContributor = require("./authorizedContributor");

var isRepoTurboSrcToken = false;

let rootcontainer = document.querySelectorAll('#rootcontainer');
if (rootcontainer.length) {

  //const client = createClient({
  //  url: 'ws://localhost:3000/graphql',
  //  //webSocketImpl: WebSocket
  //});


  //var votes = [];

  //// subscription
  //(async () => {
  //  const onNext = (data) => {
  //    var data_str = data.data.newVotes;
  //    var data_str_list = data_str.split(': ')
  //    var issue_id_dirty = data_str.split(': ')[0]
  //    var vote_code = data_str_list[1].split('%')
  //    var contributor = vote_code[0]
  //    var issue_id = issue_id_dirty.replace("{", '')
  //    var side_dirty = vote_code[1]
  //    var side = side_dirty.replace('}', '')
  //    votes.push(issue_id)
  //      /* handle incoming values */
  //      //console.log(data);
  //    };

  //  let unsubscribe = () => {
  //    /* complete the subscription */
  //  };

  //  await new Promise((resolve, reject) => {
  //    unsubscribe = client.subscribe(
  //      {
  //        query: 'subscription { newVotes }',
  //      },
  //      {
  //        next: onNext,
  //        error: reject,
  //        complete: resolve,
  //      },
  //    );
  //  });

    //expect(onNext).toBeCalledTimes(5); // we say "Hi" in 5 languages
  //})();

//if (window.opener && window.opener !== window) {
  // you are in a popup
  // Button react component
  const e = React.createElement;

  //function like() {
  //  const dispatch = useDispatch();
  //  const [input, setInput] = useState('');

  //  useEffect(() => {
  //    client.on('message',(data) => {
  //     dispatch({input: data});
  //    })
  //  })
  //}

  var issueId = 'waiting...';

const domContainer = document.querySelector('#rootcontainer');
//const domContainerLikeButton = document.querySelector('#like_button_container');
render(e(App), domContainer);
//render(e(LikeButton), domContainerLikeButton);
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

  async function get_authorized_contributor(contributor_id, repo_id) {
      return await superagent
      .post('http://localhost:4000/graphql')
      .send(
      { query: `{ getAuthorizedContributor(contributor_id: "${contributor_id}", repo_id: "${repo_id}") }`}
      ).set('accept', 'json')
  }

  function post(owner, repo, issue_id, contributor_id, side) {
    superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        { query: `{ setVote(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }` }
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
        // When the user clicks the button, open the modal
        class LikeButton extends React.Component {
          constructor(props) {
            super(props);
            this.state = { liked: false };
          }

          render() {
            if (this.state.liked) {
              return 'You liked this.';
            }

            return ce(
              'button',
              { onClick: () => this.setState({ liked: true }) },
              'Like'
            );
          }
        }

        const ce = React.createElement;

        const containerItems = document.querySelectorAll(
          '.js-issue-row'
        );

        let actualDataIndex = 0;
        let startIndex = 0;

        const repoPath = commonUtil.getUsernameWithReponameFromGithubURL();

        if (
          window.location.pathname !== `/${repoPath.user}/${repoPath.repo}/pulls`
        ) {
          return;
        }

        // Get contributor_id from chain web wallet extension
        const contributor_id =  authContributor.getAuthContributor();
        for (var i = startIndex; i < containerItems.length; i++) {
              var issue_id = containerItems[i].getAttribute('id');

              var html = createButtonHtml(issue_id, contributor_id, "voteYes")
              containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforeEnd', html);
              //containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforeend', voteYesHtml + voteNoHtml);
              //containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforebegin', voteNoHtml);
        }


        clearInterval(readyStateCheckInterval);
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        //var span = document.getElementsByClassName("close")[0];

        document.addEventListener(
          'click',
          async function(event) {

            // graphql poste vote.
            // maybe gets vote side from chrome.storage that onPathContentFetched saved.
            // const vote = chrome.storage("vote")
            // if status is good, continue.

            if (event.path[1].id === "like_button_container") {
              console.log("like button container")
            }
            //if (e.target === "button#myBtn") {
              if (event.target.id === "myBtn" || event.path[1].id === "like_button_container") {


                modal.style.display = "block";

                const domContainerLikeButton = document.querySelector('#like_button_container');
                render(ce(LikeButton), domContainerLikeButton);

              } else {
                modal.style.display = "none";
              }

              var side = "undefined";
              if (domUtil.hasId(event.target, 'voteYes')) {
                side = "yes";
              } else if (domUtil.hasId(event.target, 'voteNo')) {
                side = "no";
              }
              if (side !== "undefined" ) {
                const issue_id = domUtil.getId(event.target, 'issue_id');
                const contributor_id = domUtil.getId(event.target, 'contributor_id');

                const path = commonUtil.getUsernameWithReponameFromGithubURL();
                post(path.user, path.repo, issue_id, contributor_id, side);
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
                //domUtil.addRepoData();
              }
            );
        //}
      }
    }, 10);
  })();
}

function createButtonHtml(issue_id, contributor_id, side) {
  var voteWay = ''
  if (side === "yes") {
    voteWay = 'voteYes'
  } else (
    voteWay = 'voteNo'
  )

  return  `
    <!-- Trigger/Open The Modal -->

    <button id="myBtn" style="height: 25px; width: 20px; padding: 0px;">
      <p>T</p>
    </button>
    <!-- The Modal -->
    <style>
      body {font-family: Arial, Helvetica, sans-serif;}

      /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }

      /* Modal Content */
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 33%;
      }
    </style>
    <div id="myModal" class="modal">
      <a ref data-vote="{issue_id: ${issue_id}, side: ${voteWay}, contributor: ${contributor_id}}

      <!-- Modal content -->
      <div class="modal-content">
        <div id="like_button_container">
        </div>
        <p>Some text in the Modal..</p>
      </div>

    </div>
    `
}
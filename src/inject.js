/*!
 * enhanced-github
 * https://github.com/softvar/enhanced-github
 *
 * Licensed MIT (c) Varun Malhotra
 */
const React = require('react');
const { useState } = require('react');
const { unmountComponentAtNode, render } = require('react-dom');
const { useDispatch } = require('react-redux');
const { createClient } = require('graphql-ws');

const { Button } = require('react-bootstrap');

//const { createClient: redisCreateClient } = require('redis');
//const WebSocket = require('ws');

const messageListenerUtil = require('./utils/messageListenerUtil');
const domUtil = require('./utils/domUtil');
const storageUtil = require('./utils/storageUtil');
const CommonEnum = require('./enums/CommonEnum');
const superagent = require('superagent');
const commonUtil = require('./utils/commonUtil');
const mathUtil = require('./utils/mathUtil');
const authContributor = require('./authorizedContributor');
const { getRepoStatus } = require('./requests');
import VoteTotalMain from './Components/VoteTotalMain';
import VoteButton from './Components/VoteButton';
import TurboSrcButtonOpen from './Components/TurboSrcButtonOpen';
const { postSetVote,
        postGetPullRequest, // updated
        postGetPRvoteYesTotals,
        postGetPRvoteNoTotals,
        postGetPRvoteTotals,
        postCreateRepo,
        postNewPullRequest,
        postGetContributorID,
        postGetContributorName,
        getGitHubPullRequest
      } = require('./requests')

const CONFIG = require('./config.js');
//const port = "http://localhost:4000";
//const port = "https://turbosrc-service.fly.dev"
//const port = "https://turbosrc-marialis.dev";
const url = CONFIG.url

var isRepoTurboSrcToken = false;

var modal;

var user;
var repo;
// This is the github convention of $owner/$repo.
var repo_id;
var issue_id;
var side;
var contributor_id;
var contributor_name;
var voteTotals;

//OAuth Code: ***
//Github redirects to localhost:5000/authenticated?code=...
//Get Github code from url:
const newUrl = window.location.href.split('?code=');
const reqBody = { code: newUrl[1] };
//Clear code from browser url: (optional)
window.history.pushState({}, null, newUrl[0]);
//Send code from url which to Github API for an access token
//The access token is then exchanged for the user's profile. Done in server/index.js.
fetch('https://turbosrc-auth.fly.dev/authenticate', {
  method: 'POST',
  body: JSON.stringify(reqBody)
})
  //Response is Github profile - username, avatar url, repos etc.
  .then(response => response.json())
  //Set Github user information to Chrome Storage for the turbo-src extension to get it on load:
  .then(githubUser => chrome.storage.local.set({ githubUser: JSON.stringify(githubUser) }))
  .catch(error => {
    console.log(error);
  });
//End of OAuth Code ****

// Add to requests.js (reconcile privateStoreRequests.js
async function get_authorized_contributor(contributor_id, repo_id) {
    const res = await superagent
      .post(`${url}`)
      .send({
        query: `{ getAuthorizedContributor(contributor_id: "${contributor_id}", repo_id: "${repo_id}") }`,
      })
      .set("accept", "json");

      const json = JSON.parse(res.text);
      console.log('getAuthorizedContributor:' + json.data.getAuthorizedContributor);
      return json.data.getAuthorizedContributor;
}

async function postPullFork(owner, repo, issue_id, contributor_id) {
  return await superagent
    .post(`${url}`)
    .send({
      query: `{ getPRfork(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`
    }) // sends a JSON post body
    .set('accept', 'json');
}

async function postGetPRforkStatus(owner, repo, issue_id, contributor_id) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ getPRforkStatus(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`
    }) // sends a JSON post body
    .set('accept', 'json');
  //const resJSON = JSON.parseFromString(res.text)
  //console.log(resJSON)
  //return resJSON.data.getPRforkStatus
  const json = JSON.parse(res.text);
  return json.data.getPRforkStatus;
}

(async function() {
  window.enhancedGithub = {
    config: {}
  };
  const getStorageData = key =>
    new Promise((resolve, reject) =>
      chrome.storage.sync.get(key, result =>
        chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve(result)
      )
    );

  const setStorageData = data =>
    new Promise((resolve, reject) =>
      chrome.storage.sync.set(data, () =>
        chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve()
      )
    );

  const path = commonUtil.getUsernameWithReponameFromGithubURL();
  repo_id = `${path.user}/${path.repo}`;
  repo = path.repo;
  user = path.user;
  var tsrcPRstatus = await postGetPullRequest(user, repo, issue_id, contributor_id, side);
  var gitHubPRstatus = await getGitHubPullRequest(user, repo, issue_id)

  //Set Github Repo and User from browser window for chrome extension
  chrome.storage.local.set({ owner: user });
  chrome.storage.local.set({ repo: repo });

  //Check if repo is tokenized
  const resIsRepoTurboSrcToken = await getRepoStatus(repo_id);
  const isRepoTurboSrcToken = resIsRepoTurboSrcToken.exists;
  console.log('isRepoTurboSrcToken: ' + isRepoTurboSrcToken)
  //Function to get items from chrome storage set from Extension
  let getFromStorage = keys =>
    new Promise((resolve, reject) => chrome.storage.local.get([keys], result => resolve(result[keys])));
  //Values are set in Extension App, Components/Home.js on render
  contributor_name = await getFromStorage('contributor_name');
  contributor_id = await getFromStorage('contributor_id');
  //Check if current contributor is authorized for this repo
  const githubUser = await getFromStorage('githubUser').then(res=>JSON.parse(res))

  const isAuthorizedContributor = await get_authorized_contributor(contributor_id, repo_id);
  console.log('isAuthorizedContributor: ' + isAuthorizedContributor);

  const readyStateCheckInterval = setInterval(async function() {
    if ((document.readyState === 'complete') & (isRepoTurboSrcToken === true) & (isAuthorizedContributor === true)) {
      // When the user clicks the button, open the modal
      const ce = React.createElement;
      var sideText;
      var modalDisplay = 'hide'

      
      

      const containerItems = document.querySelectorAll('.js-issue-row');

      let actualDataIndex = 0;
      let startIndex = 0;

      const repoPath = commonUtil.getUsernameWithReponameFromGithubURL();

      if (window.location.pathname !== `/${repoPath.user}/${repoPath.repo}/pulls`) {
        return;
      }

      var html;
      for (var i = startIndex; i < containerItems.length; i++) {
        issue_id = containerItems[i].getAttribute('id');
        side = 'NA';
        var btnHtml = createButtonHtml(i, issue_id, contributor_id, side);
        var modalHtml = createModal();
        if (i < 1) {
          //console.log(i)
          html = btnHtml + modalHtml;
        } else {
          html = btnHtml;
        }
        containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforeEnd', html);

        (async () => {
          // not needed but keeping for an example.
          await setStorageData({
            'turbo-btn-data': {
              issue_id: `${issue_id}`,
              side: `${side}`,
              contributor: `${contributor_id}`
            }
          });
        })();
        //containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforeend', voteYesHtml + voteNoHtml);
        //containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforebegin', voteNoHtml);
      }

      clearInterval(readyStateCheckInterval);
      // Get the modal
      modal = document.getElementById('myModal');

      // Get the button that opens the modal
      var btn = document.getElementById('myBtn');

      // Get the <span> element that closes the modal
      //var span = document.getElementsByClassName("close")[0];
      var domContainerTurboSrcButton;
      var status;
      //var displayOpenStatus;
      for (var i = startIndex; i < containerItems.length; i++) {
        issue_id = containerItems[i].getAttribute('id');
        //if (i < 2) {
        status = await postGetPullRequest(user, repo, issue_id, contributor_id, side);
	// Update so knows what the state is inside.
	tsrcPRstatus = status
        gitHubPRstatus = await getGitHubPullRequest(user, repo, issue_id)

        //console.log('status: ' + status)
        //displayOpenStatus = status.status === 200 &&  status.state === 'new' || status.status === 200 && status.state === 'open';
        domContainerTurboSrcButton = document.querySelector(`#turbo-src-btn-${issue_id}`);
        //if (displayOpenStatus) {
        render(ce(TurboSrcButtonOpen, {user: user, repo: repo, issueID: issue_id, contributorName: contributor_name, contributorID: contributor_id, tsrcPRstatus: tsrcPRstatus, side: side }), domContainerTurboSrcButton); //} else {
        // render(ce(TurboSrcButtonClosed), domContainerTurboSrcButton);
        //}
      }

      document.addEventListener(
        'click',
        async function(event) {
          //console.log('new event')
          //console.log(event.target.parentElement.id)
          const divHTML = event.target.parentElement;
          var idName = divHTML.id;
          const idBtnSplit = idName.split('turbo-src-btn');
          //console.log(idBtnSplit)
          if (idBtnSplit.length > 1) {
            //console.log('turbo-src button click')
            const idNameSplit = idName.split('-');
            issue_id = idNameSplit[3];
            //console.log(issue_id)
            //console.log(contributor_id)
            const domContainerVoteTotalMain = document.querySelector('#vote-total-main');
            const domContainerVoteButton = document.querySelector('#yes_vote_button');
            const domContainerVoteButton1 = document.querySelector('#no_vote_button');

	    //if (modalDisplay === 'show') {
               modal.style.display = 'block';
	    //} else {
            //   modal.style.display = 'none';
	    //}

            voteTotals = await postGetPRvoteTotals(user, repo, issue_id, contributor_id, side);

            sideText = 'yes';
            render(ce(VoteTotalMain, {user: user, repo: repo, issueID: issue_id, contributorID: contributor_id, contributorName: contributor_name}), domContainerVoteTotalMain);
            render(ce(VoteButton, {user: user, repo: repo, issueID: issue_id, contributorID: contributor_id, contributorName: contributor_name, side: sideText, githubUser: githubUser }), domContainerVoteButton);
            sideText = 'no';
            render(ce(VoteButton, {user: user, repo: repo, issueID: issue_id, contributorID: contributor_id, contributorName: contributor_name, side: sideText, githubUser: githubUser }), domContainerVoteButton1);
          } else if (idName === '') {
            modal.style.display = 'none';
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

function createModal() {
  return `<!-- The Modal -->
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
        height: 100%;
        width: 33%;
        text-align: center;
      }
      .btn-group-vote {
        display: flex;
        width: 100%;
        justify-content: center;
        flex-direction: row; /* Display buttons horizontally in flexbox */
      }
      .btn-group-vote button {
        background-color: #04AA6D; /* Green background */
        border: 1px solid green; /* Green border */
        color: white; /* White text */
        padding: 10px 24px; /* Some padding */
        cursor: pointer; /* Pointer/hand icon */
        float: left; /* Float the buttons side by side - Still needed ? */
        margin: 1rem;
      }
      /* Clear floats (clearfix hack) */
      .btn-group-vote:after {
        content: "";
        clear: both;
        display: table;
      }

      .btn-group-vote button:not(:last-child) {
        border-right: none; /* Prevent double borders */
      }
    </style>
    <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <style>
        </style>
          <div id="vote-total-main"></div>
        <div class="btn-group-vote">
          <div id="yes_vote_button"></div>
          <div id="no_vote_button"></div>
        </div>
          <p></p>
      </div>
    </div>
    `;
}

function createButtonHtml(index, issue_id, contributor_id) {
  return `
      <div id='turbo-src-btn-${issue_id}'></div>
    `;
}
//#yes_vote_button, #no_vote_button {
//  display: inline-block;
//  padding: 20px;
//}

//.modal-center {
//  margin: 0;
//  position: absolute;
//  top: 15%;
//  left: 50%;
//  -ms-transform: translate(-50%, -50%);
//  transform: translate(-50%, -50%);
//}

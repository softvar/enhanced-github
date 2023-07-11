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
const createModal = require('./Components/Modal/createModal');
const createButtonHtml = require('./Components/DOM/createButtonHtml');
import VoteStatusButton from './Components/DOM/VoteStatusButton';
import RefreshButton from './Components/DOM/RefreshButton';
import ModalVote from './Components/Modal/ModalVote';
const {socket} = require('./socketConfig')

const { postSetVote,
        postGetPullRequest, // updated
        postGetPRvoteTotals,
        getGitHubPullRequest,
        postGetVotes  
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
const clickedState = {
  clicked: false
}

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

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
      return json.data.getAuthorizedContributor;
}
(async function() {
  window.enhancedGithub = {
    config: {}
  };
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
  //Function to get items from chrome storage set from Extension
  let getFromStorage = keys =>
    new Promise((resolve, reject) => chrome.storage.local.get([keys], result => resolve(result[keys])));
  //Values are set in Extension App, Components/Home.js on render
  contributor_name = await getFromStorage('contributor_name');
  contributor_id = await getFromStorage('contributor_id');
  //Check if current contributor is authorized for this repo
  const githubUser = await getFromStorage('githubUser').then(res=>JSON.parse(res))

  const isAuthorizedContributor = await get_authorized_contributor(contributor_id, repo_id);
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
        var btnHtml = createButtonHtml(i, issue_id, contributor_id, side); //these function args are not being used 
        var modalHtml = createModal();
        if (i < 1) {
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
      let getVotesRes;
      let getVotes = async () => await postGetVotes(repo_id, issue_id, contributor_id);
      //var displayOpenStatus;
      let socketEvents = 0

      const toggleModal = async (event) => {
       if(event.target.id === 'myModal' || event.target.id === 'closeModal') {
          modal.style.display = 'none';
          unmountComponentAtNode(document.getElementById('myModal'))
          }
        const divHTML = event.target.parentElement;
        var idName = divHTML.id;
        const idBtnSplit = idName.split('turbo-src-btn');
        if (idBtnSplit.length > 1) {
          const idNameSplit = idName.split('-');
          issue_id = idNameSplit[3];
          modal.style.display = 'block';
          const domContainerModal = document.getElementById('myModal');
          console.log(issue_id);
          voteTotals = await postGetPRvoteTotals(user, repo, issue_id, contributor_id, side);
          getVotesRes = await getVotes();
          render(ce(ModalVote, {user: user, repo: repo, issueID: issue_id, contributorID: contributor_id, contributorName: contributor_name, voteTotals: voteTotals, githubUser: githubUser, voteRes: getVotesRes, getVotes: getVotes, toggleModal: toggleModal, socketEvents: socketEvents}), domContainerModal);
          }

      }

      document.addEventListener('click', function (event) {toggleModal(event)})

      const renderVoteButtons = async () => {
        
          for (var i = startIndex; i < containerItems.length; i++) {
            issue_id = containerItems[i].getAttribute('id');
            //if (i < 2) {
            status = await postGetPullRequest(user, repo, issue_id, contributor_id, side);
      // Update so knows what the state is inside.
      let testVoteTotals = await postGetPRvoteTotals(user, repo, issue_id, contributor_id, side);
      tsrcPRstatus = status;
              gitHubPRstatus = await getGitHubPullRequest(user, repo, issue_id);
            //displayOpenStatus = status.status === 200 &&  status.state === 'new' || status.status === 200 && status.state === 'open';
            domContainerTurboSrcButton = document.querySelector(`#turbo-src-btn-${issue_id}`);
            //if (displayOpenStatus) {
            render(ce(VoteStatusButton, {socketEvents: socketEvents, user: user, repo: repo, issueID: issue_id, contributorName: contributor_name, contributorID: contributor_id, tsrcPRstatus: tsrcPRstatus, side: side, clicked: clickedState.clicked, toggleModal: toggleModal }), domContainerTurboSrcButton); //} else {
            // render(ce(TurboSrcButtonClosed), domContainerTurboSrcButton);
            //}
          }
          
      } 

      renderVoteButtons();
      const handleRefresh = () => {
        clickedState.clicked = !clickedState.clicked;
        renderVoteButtons();
      }

      const updateVoteStatusButton = async (issueID) => {
          issue_id = issueID
          domContainerTurboSrcButton = document.querySelector(`#turbo-src-btn-${issue_id}`);
          render(ce(VoteStatusButton, {user: user, repo: repo, issueID: issue_id, contributorName: contributor_name, contributorID: contributor_id, tsrcPRstatus: tsrcPRstatus, side: side, clicked: clickedState.clicked, toggleModal: toggleModal, socketEvents: socketEvents }), domContainerTurboSrcButton);
        } 

      const updateModalVotesTable = async (issueID) => {
          if(issueID === issue_id && modal.style.display === 'block') {
            const domContainerModal = document.getElementById('myModal');
            render(ce(ModalVote, {user: user, repo: repo, issueID: issue_id, contributorID: contributor_id, contributorName: contributor_name, voteTotals: voteTotals, githubUser: githubUser, voteRes: getVotesRes, getVotes: getVotes, toggleModal: toggleModal, socketEvents: socketEvents}), domContainerModal);
          }
        } 

      socket.on('vote received', function(ownerFromServer, repoFromServer, issueIDFromServer) {
        if(user === ownerFromServer && repo === repoFromServer) {
          /* To update the correct VoteStatusButton & VotesTable we need to both update the socketEvents variable 
          and call the React render function for them. */
          socketEvents+=1
          updateVoteStatusButton(issueIDFromServer)
          updateModalVotesTable(issueIDFromServer)
        }
      });

      !socket.id && render(React.createElement(RefreshButton, {refresh: handleRefresh}), document.getElementById('js-flash-container'));
      


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




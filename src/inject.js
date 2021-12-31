/*!
 * enhanced-github
 * https://github.com/softvar/enhanced-github
 *
 * Licensed MIT (c) Varun Malhotra
 */
const React = require("react");
const {useState} = require("react");
const { unmountComponentAtNode, render } =require("react-dom");
const { useDispatch } = require('react-redux')
const { createClient } = require('graphql-ws');
import './index.css';
import App from './App';
import { Parser } from 'graphql/language/parser';
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

var user;
var repo;
// This is the github convention of $owner/$repo.
var repo_id
var issue_id;
var side
var contributor_id;

let rootcontainer = document.querySelectorAll('#rootcontainer');
if (rootcontainer.length) {

const e = React.createElement;
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
    const getStorageData = key =>
      new Promise((resolve, reject) =>
        chrome.storage.sync.get(key, result =>
          chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve(result)
        )
      )

    const setStorageData = data =>
      new Promise((resolve, reject) =>
        chrome.storage.sync.set(data, () =>
          chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve()
        )
      )

    const path = commonUtil.getUsernameWithReponameFromGithubURL();
    repo_id = `${path.user}/${path.repo}`;
    repo = path.repo;
    user = path.user;

    const res_get_repo_status = await get_repo_status(repo_id);
    const isRepoTurboSrcToken = res_get_repo_status['body']['data']['getRepoStatus'];
    contributor_id =  authContributor.getAuthContributor();
    const res_get_authorized_contributor =  await get_authorized_contributor(contributor_id, repo_id);
    const isAuthorizedContributor = res_get_authorized_contributor['body']['data']['getAuthorizedContributor'];

    console.log('isAuthorizedContributor: ' + isAuthorizedContributor);

    const readyStateCheckInterval = setInterval(function() {

      if (document.readyState === 'complete'  & isRepoTurboSrcToken === true & isAuthorizedContributor === true) {
        // When the user clicks the button, open the modal
        const ce = React.createElement;
        class LikeButton extends React.Component {
          constructor(props) {
            super(props);
            this.state = { liked: false };
          }

          render() {
            if (this.state.liked) {
              //const voteData = votes.closest("[data-index]")
              //console.log(JSON.parse(voteJSON).issue_id)

              //return turboBtnData['turbo-btn-data']['issue_id']
              return `
              user: ${user}
              repo: ${repo}
              issue_id: ${issue_id}
              contributor: ${contributor_id}
              side: ${side}
              `
            }

            return ce(
              'button',
              { onClick: () => {
                this.setState({ liked: true })
                post(user, repo, issue_id, contributor_id, side);
              }
              },
              'Like'
            );
          }
        }

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
        contributor_id =  authContributor.getAuthContributor();
        var index = 0;
        for (var i = startIndex; i < containerItems.length; i++) {
              issue_id = containerItems[i].getAttribute('id');
              side = "yes"
              var html = createButtonHtml(index++, issue_id, contributor_id, side)
              containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforeEnd', html);

              (async () => {
                // not needed but keeping for an example.
                await setStorageData(
                  {
                    'turbo-btn-data': {
                      'issue_id': `${issue_id}`,
                      'side': `${side}`,
                      'contributor': `${contributor_id}`
                     }
                  }
                )
              })()
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
            console.log('new event')
            console.log(event.target)

          //var turboBtnData = await getStorageData('turbo-btn-data')
          //console.log(turboBtnData['turbo-btn-data']['issue_id'])

            // graphql poste vote.
            // maybe gets vote side from chrome.storage that onPathContentFetched saved.
            // const vote = chrome.storage("vote")
            // if status is good, continue.
            //if (e.target === "button#myBtn") {
              if (event.target.id === "myBtn") {

                //Using current modal below
                //modal.style.display = "block";
                const voteString = event.target.attributes.value.textContent//.outerHTML)
                const debug = event.target.attributes.value.textContent.outerHTML
                console.log('here')
                //console.log(event.path[3].outHTML)
                const html = event.path[1]
                const htmlString = event.path[3].outerHTML
                console.log(typeof htmlString)
                const parser = new DOMParser;
                const outerBtnHtml = parser.parseFromString(htmlString, 'text/html')

                const currentModal = outerBtnHtml.getElementById('myModal')
                console.log(currentModal)
                console.log(modal)

                const currentLikeButton = outerBtnHtml.getElementById('myModal')

                const voteJSON = JSON.parse(voteString)
                console.log(voteJSON)
                console.log(user)
                console.log(repo)
                issue_id = voteJSON.issue_id
                contributor_id = voteJSON.contributor_id
                side = voteJSON.side


                const domContainerLikeButton = document.querySelector('#like_button_container');

                modal.style.display = "block";

                render(ce(LikeButton), domContainerLikeButton);

              } else if(event.path[1].id === "like_button_container") {
                 console.log("like button container")
              }else {
                modal.style.display = "none";
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

function createButtonHtml(index, issue_id, contributor_id, side) {
  var voteWay = ''
  if (side === "yes") {
    voteWay = 'voteYes'
  } else (
    voteWay = 'voteNo'
  )

  return  `
    <!-- Trigger/Open The Modal -->

    <button id="myBtn" style="height: 20px; width: 16px; padding: 0px;" data value='{"index": "${index}", "issue_id": "${issue_id}", "side": "${side}", "contributor_id": "${contributor_id}"}'
    >T</button>
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

      <!-- Modal content -->
      <div class="modal-content">
        <div id="like_button_container" data value='{"index": "${index}", "issue_id": "${issue_id}", "side": "${side}", "contributor_id": "${contributor_id}"}'>

        </div>
        <p>Some text in the Modal..</p>
      </div>

    </div>
    `
}
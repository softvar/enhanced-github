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
const {Button } = require("react-bootstrap")
import "bootstrap/dist/css/bootstrap.min.css"
import './turboSrcButton.css'
import './index.css'
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

var modal;

var user;
var repo;
// This is the github convention of $owner/$repo.
var repo_id
var issue_id;
var side
var contributor_id;
var voteTotals

let rootcontainer = document.querySelectorAll('#rootcontainer');
if (rootcontainer.length) {

const e = React.createElement;
var issueId = 'waiting...';

const domContainer = document.querySelector('#rootcontainer');
//const domContainerVoteButton = document.querySelector('#yes_vote_button');
render(e(App), domContainer);
//render(e(VoteButton), domContainerVoteButton);
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

  async function postPullFork(owner, repo, issue_id, contributor_id) {
    return await superagent
      .post('http://localhost:4001/graphql')
      .send(
        { query: `{ getPRfork(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }` }
      ) // sends a JSON post body
      .set('accept', 'json')
  }

  async function postGetPRforkStatus(owner, repo, issue_id, contributor_id) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        { query: `{ getPRforkStatus(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }` }
      ) // sends a JSON post body
      .set('accept', 'json')
    //const resJSON = JSON.parseFromString(res.text)
    //console.log(resJSON)
    //return resJSON.data.getPRforkStatus
    const json = JSON.parse(res.text)
    return json.data.getPRforkStatus
  }

  async function postGetPRvoteStatus(owner, repo, issue_id, contributor_id, side) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        { query: `{ getPRvoteStatus(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }` }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json')
      //.end((err, res) => {
        // Calling the end function will send the request
      //});
    const json = JSON.parse(res.text)
    console.log(json)
    return json.data.getPRvoteStatus
  }

  async function postGetPRvoteTotals(owner, repo, issue_id, contributor_id, side) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        { query: `{ getPRvoteTotals(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }` }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json')
      //.end((err, res) => {
        // Calling the end function will send the request
      //});
    const json = JSON.parse(res.text)
    console.log(json)
    return json.data.getPRvoteTotals
  }

  async function postSetVote(owner, repo, issue_id, contributor_id, side) {
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

    const readyStateCheckInterval = setInterval(async function() {

      if (document.readyState === 'complete'  & isRepoTurboSrcToken === true & isAuthorizedContributor === true) {
        // When the user clicks the button, open the modal
        const ce = React.createElement;
        var sideText;

        class TurboSrcButtonOpen extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              user: user,
              repo: repo,
              issueID: issue_id,
              contributorID: contributor_id,
              background: "white",
              dynamicBool: true,
              status: "none"
            }
          }

          componentDidMount() {
            setTimeout(() => {
              (async () => {
                const statusReact = await postGetPRvoteStatus(
                  this.state.user,
                  this.state.repo,
                  this.state.issueID,
                  this.state.contributorID,
                  this.state.side
                );
                //console.log('status CDM: ' + statusReact)
                this.setState({status: statusReact})
                if (statusReact === 'open') {
                 this.setState({background: "white"})
                } else if (statusReact === "merge") {
                 this.setState({background: "green"})
                } else if (statusReact === "closed") {
                 this.setState({background: "red"})
                } else {
                 this.setState({background: "blue"})
                }
                //console.log("dBool: " + this.state.dynamicBool)
                //if (this.state.dynamicBool) {
                //  this.setState({dynamicBool: false})
                //  console.log("dBool: " + this.state.dynamicBool)
                //} else {
                //  this.setState({dynamicBool: true})
                //  console.log("dBool: " + this.state.dynamicBool)
                //}
              })()
                //this.setState({background: "yellow"})
            }, 1000)
          }

          componentDidUpdate() {
            setTimeout(() => {
              (async () => {
                const statusReact = await postGetPRvoteStatus(
                  this.state.user,
                  this.state.repo,
                  this.state.issueID,
                  this.state.contributorID,
                  this.state.side
                );
                //console.log('status CDU: ' + statusReact)
                this.setState({status: statusReact})
                if (statusReact === 'open') {
                 this.setState({background: "white"})
                } else if (statusReact === "merge") {
                 this.setState({background: "green"})
                } else if (statusReact === "closed") {
                 this.setState({background: "red"})
                } else {
                 this.setState({background: "blue"})
                }
              })()
            }, 1000)

          }
          render() {
            const handleClick=(e)=>{
              console.log('handleClick')
              //modal.style.display = "none";
            }
            return (
                <Button
                 // variant="open" className="textColor bgColor"
                  style={{ color: "black", background: this.state.background }}
                  onClick={handleClick}
                >{this.state.status}</Button>
            );
          }

        }

        class VoteButton extends React.Component {
          constructor(props) {
            super(props);
            this.state = { voted: "", lastIssueId: "", side: sideText };
          }

          render() {
            if (this.state.voted === 'pull' && issue_id === this.state.lastIssueId) {
              return "Verifying. This may take a few a couple minutes..."
            }
            if (this.state.voted === 'problem' && issue_id === this.state.lastIssueId) {
              return "Something went wrong"
            }
            if (this.state.voted === 'notOnGithub' && issue_id === this.state.lastIssueId) {
              return "Pull request isn't valid on github (path to fork doesn't exist)."
            }
            if (this.state.voted === 'done' && issue_id === this.state.lastIssueId) {
              //const voteData = votes.closest("[data-index]")
              //console.log(JSON.parse(voteJSON).issue_id)

              //return turboBtnData['turbo-btn-data']['issue_id']
              return `
              user: ${user}
              repo: ${repo}
              issue_id: ${issue_id}
              contributor: ${contributor_id}
              side: ${this.state.side}
              `
            }

            return ce(
              'button',
              { onClick: () => {
                (async () => {
                  var forkStatus = await postGetPRforkStatus(user, repo, issue_id, contributor_id);
                  console.log('fork status')
                  console.log(forkStatus)
                  if (forkStatus === 'notOnGithub') {
                    console.log('notOnGithub')
                    this.setState({ voted: 'notOnGithub', lastIssueId: issue_id, side: this.state.side })
                  } else if (forkStatus === 'valid') {
                    console.log('valid')
                    await postSetVote(user, repo, issue_id, contributor_id, this.state.side);
                    this.setState({ voted: 'done', lastIssueId: issue_id, side: this.state.side })
                  } else if (forkStatus === 'pull') {
                    console.log('i 201')
                    this.setState({ voted: 'pull', lastIssueId: issue_id, side: this.state.side })
                    console.log('i 203')
                    console.log(user)
                    console.log(repo)
                    console.log(issue_id)
                    console.log(contributor_id)
                    console.log(this.state.side)
                    console.log('i 209')
                    await postPullFork(user, repo, issue_id, contributor_id, this.state.side);
                    console.log('i 211')
                    forkStatus = await postGetPRforkStatus(user, repo, issue_id, contributor_id, this.state.side);
                    console.log('i 213')
                    if (forkStatus === 'valid') {
                      this.setState({ voted: 'valid', lastIssueId: issue_id, side: this.state.side })
                      await postSetVote(user, repo, issue_id, contributor_id, this.state.side);
                      this.setState({ voted: 'done', lastIssueId: issue_id, side: this.state.side })
                    } else {
                      this.setState({ voted: 'problem', lastIssueId: issue_id, side: this.state.side })
                    }
                  } else {
                    this.setState({ voted: 'problem', lastIssueId: issue_id, side: this.state.side })
                  }
                })();
              }
              },
              sideText
            );
          }
        }

        class VoteTotalMain extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              user: user,
              repo: repo,
              issueID: issue_id,
              contributorID: contributor_id,
              voteTotals: "0.0"
            }
          }

          componentDidMount() {
            setTimeout(() => {
              (async () => {
                var voteTotalsReact = await postGetPRvoteTotals(
                  this.state.user,
                  this.state.repo,
                  this.state.issueID,
                  this.state.contributorID,
                  this.state.side
                );
                voteTotalsReact = (Number(voteTotalsReact)*100).toFixed(1).toString()
                if (voteTotalsReact) {
                   this.setState({voteTotals: voteTotalsReact})
                } else {
                   this.setState({voteTotals: "0.0"})
                }
                console.log('status CDMV: ' + voteTotalsReact)
              })()
                //this.setState({background: "yellow"})
            }, 1000)
          }

          componentDidUpdate() {
            setTimeout(() => {
              (async () => {
                var voteTotalsReact = await postGetPRvoteTotals(
                  this.state.user,
                  this.state.repo,
                  this.state.issueID,
                  this.state.contributorID,
                  this.state.side
                );
                voteTotalsReact = (Number(voteTotalsReact)*100).toFixed(1).toString()
                if (voteTotalsReact) {
                   this.setState({voteTotals: voteTotalsReact})
                } else {
                   this.setState({voteTotals: "0.0"})
                }
                console.log('status CDUV: ' + voteTotalsReact)
              })()
            }, 1000)

          }
          render() {
            const handleClick=(e)=>{
              console.log('handleClick')
              //modal.style.display = "none";
            }
            return (
                <Button
                 // variant="open" className="textColor bgColor"
                  style={{ color: "white", background: this.state.background }}
                  onClick={handleClick}
                >{this.state.voteTotals}%</Button>
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
        var html
        for (var i = startIndex; i < containerItems.length; i++) {
              issue_id = containerItems[i].getAttribute('id');
              side = "NA"
              var btnHtml = createButtonHtml(i, issue_id, contributor_id, side)
              var modalHtml = createModal()
              if (i < 1) {
                console.log(i)
                html = btnHtml + modalHtml
              } else {
                html = btnHtml
              }
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
        modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        //var span = document.getElementsByClassName("close")[0];
        var domContainerTurboSrcButton
        var status
        var displayOpenStatus
        for (var i = startIndex; i < containerItems.length; i++) {
          issue_id = containerItems[i].getAttribute('id');
          //if (i < 2) {
          status = await postGetPRvoteStatus(user, repo, issue_id, contributor_id, side);

          console.log('status: ' + status)
          displayOpenStatus = (status === 'none' || status === 'open')
          domContainerTurboSrcButton = document.querySelector(`#turbo-src-btn-${issue_id}-${contributor_id}`);
          //if (displayOpenStatus) {
           render(ce(TurboSrcButtonOpen), domContainerTurboSrcButton); //} else {
          // render(ce(TurboSrcButtonClosed), domContainerTurboSrcButton);
          //}
        }

        document.addEventListener(
          'click',
          async function(event) {
            console.log('new event')
            console.log(event.target.parentElement.id)
            const divHTML = event.target.parentElement
            var idName = divHTML.id
            const idBtnSplit = idName.split('turbo-src-btn')
            console.log(idBtnSplit)
            if (idBtnSplit.length > 1) {
              console.log('turbo-src button click')
              const idNameSplit = idName.split('-')
              issue_id = idNameSplit[3]
              contributor_id = idNameSplit[4]
              console.log(issue_id)
              console.log(contributor_id)
              const domContainerVoteTotalMain = document.querySelector('#vote-total-main');
              const domContainerVoteButton = document.querySelector('#yes_vote_button');
              const domContainerVoteButton1 = document.querySelector('#no_vote_button');

              modal.style.display = "block";

              voteTotals = await postGetPRvoteTotals(user, repo, issue_id, contributor_id, side);

              sideText = "yes"
              render(ce(VoteTotalMain), domContainerVoteTotalMain);
              render(ce(VoteButton), domContainerVoteButton);
              sideText = "no"
              render(ce(VoteButton), domContainerVoteButton1);
            } else if (idName === "") {
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
        text-align: center
      }
      .btn-group-vote button {
        background-color: #04AA6D; /* Green background */
        border: 1px solid green; /* Green border */
        color: white; /* White text */
        padding: 10px 24px; /* Some padding */
        cursor: pointer; /* Pointer/hand icon */
        float: left; /* Float the buttons side by side */
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
          <p>Some text in the Modal..</p>
      </div>
    </div>
    `
}

function createButtonHtml(index, issue_id, contributor_id) {
  return `
      <div id='turbo-src-btn-${issue_id}-${contributor_id}'></div>
    `
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
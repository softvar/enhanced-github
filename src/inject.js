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
  class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        vote: 'waiting...' };
    }

    componentDidMount() {
      client.on('message',(data) => {
        console.log('mount')
        this.setState({vote: issueId})
      })
    }

    componentDidUpdate() {
      if (votes.length !== 0) {
        issueId = votes.pop();
        this.setState({vote: issueId});
      } else {
        //this.setState({vote: issueId})
      }
    }

    render() {
      //if (this.state.vote) {
      //  return "none"
      //}
      return e(
        'output',
        null,
        this.state.vote
      );
    }
  }

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

        const html =
        `
        <!-- Trigger/Open The Modal -->

        <button id="myBtn">T</button>
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
            <p>Some text in the Modal..</p>
          </div>

        </div>
        `
        document.body.innerHTML += html;

        clearInterval(readyStateCheckInterval);
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        //var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal

        document.addEventListener(
          'click',
          async function(e) {

            // graphql poste vote.
            // maybe gets vote side from chrome.storage that onPathContentFetched saved.
            // const vote = chrome.storage("vote")
            // if status is good, continue.

            //console.log(e.target)
            //if (e.target === "button#myBtn") {
              if (e.target.id === "myBtn") {
                console.log('modal')
                modal.style.display = "block";
              } else {
                console.log('not modal')
                modal.style.display = "none";
              }
              //console.log(e.isTrusted)
              //console.log(e.altKey)
              //console.log(e.target)
              //console.log(e)
            //} else {
            //  console.log('not clicked')
            //}
                //btn.onclick = function() {
                  //modal.style.display = "block";
                //}

                // When the user clicks on <span> (x), close the modal
                //span.onclick = function() {
                //  modal.style.display = "none";
                //}

                //// When the user clicks anywhere outside of the modal, close it
                //window.onclick = function(event) {
                //  if (event.target == modal) {
                //    modal.style.display = "none";
                //  }
                //}
            //var side = "undefined";
            //if (domUtil.hasId(e.target, 'voteYes')) {
            //  side = "yes";
            //} else if (domUtil.hasId(e.target, 'voteNo')) {
            //  side = "no";
            //}
            //if (side !== "undefined" ) {
            //  const issue_id = domUtil.getId(e.target, 'issue_id');
            //  const contributor_id = domUtil.getId(e.target, 'contributor_id');

            //  const path = commonUtil.getUsernameWithReponameFromGithubURL();
            //  post(path.user, path.repo, issue_id, contributor_id, side);
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
                //domUtil.addRepoData();

              }
            );
        //}
      }
    }, 10);
  })();
}
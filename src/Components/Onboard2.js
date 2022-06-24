import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loadergif from '../loader.gif';
import Loader from './Loader';
import Fail from './Fail';
import Success from './Success';
import superagent from 'superagent';
import storageUtil from '../utils/storageUtil';
export default function Onboard2() {
  let user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  //For testing
  let [repo, setRepo] = useState('');
  let [owner, setOwner] = useState('');
  let currency = repo;

  chrome.storage.local.get(['repo'], data => setRepo(data.repo));
  chrome.storage.local.get(['owner'], data => setOwner(data.owner));

  let [failed, setFailed] = useState(false);
  let [apiKey, setApiKey] = useState('');
  let [loader, setLoader] = useState(false);
  let [checking, setChecking] = useState(false);
  let [verified, setVerified] = useState(false);
  let [successful, setSuccessful] = useState(false);
  let [length, setLength] = useState(false);

  const changeHandler = e => {
    e.preventDefault();
    setApiKey(e.target.value);
    if (e.target.value.length) {
      setLength(true);
      setChecking(true);
      setTimeout(() => {
        setChecking(false);
        if (e.target.value === 'ghp_123') {
          setVerified(true);
        } else {
          setVerified(false);
        }
      }, 1000);
    } else {
      setLength(false);
      setVerified(false);
      setChecking(false);
    }
  };

  async function postCreateRepo(owner, repo, issue_id, contributor_id, side) {
    superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ createRepo(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json')
      .end((err, res) => {
        // Calling the end function will send the request
      });
  }

  const createRepo = async () => {
    if (verified) {
      setLoader(true);
      await postCreateRepo(user.login, repo, '', user.ethereumAddress, '').then(() => setLoader(false));
    }
  };

  useEffect(() => {
    if (user.ethereumAddress === 'none' || user.ethereumKey === 'none') {
      navigate('/ethereum');
    }
  });

  if (loader) {
    return <Loader />;
  }
  if (failed) {
    return <Fail setFailed={setFailed} repo={repo} />;
  }
  if (successful) {
    return <Success currency={currency} repo={repo} />;
  }

  return (
    <div className="content">
      <div className="onboard">
        <span className="">
          <h1>Tokenize This Repository</h1>
        </span>
        <span>Tokenizing {repo} will automatically create 1000000 tokens.</span>

        <form name="create">
          <div className="apiKey">
            <span className="">Enter your Personal Access Token for {repo}</span>
            <span className="">
              <input
                type="text"
                name="apikey"
                placeholder="ghp_123"
                value={apiKey}
                onChange={e => changeHandler(e)}
                required
              ></input>
              {checking ? (
                <img src={loadergif}></img>
              ) : verified ? (
                <img src="../../icons/success.png"></img>
              ) : length ? (
                <img src="../../icons/incorrect.png"></img>
              ) : (
                <img src="../../icons/warning.png"></img>
              )}
            </span>
          </div>
          <span className="items-center">
            <button type="button" className="startButton" onClick={() => createRepo()}>
              Review and Submit
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

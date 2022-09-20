import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loadergif from '../loader.gif';
import Loader from './Loader';
import Fail from './Fail';
import Success from './Success';
import storageUtil from '../utils/storageUtil';
import { postCreateRepo } from '../requests';
const {Octokit, App} = require("octokit");
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
  let [errorText, setErrorText] = useState('');
  let [scope, setScope] = useState(false)
  let [permissions,setPermissions] = useState(false)

  const createRepo = async () => {
      setLoader(true);
      await postCreateRepo(owner, repo, '', user.ethereumAddress, '').then(res => {
        setLoader(false);
        if (res === '201') {
          navigate('/home');
        } else {
          setErrorText('There was an error tokenizing this repository.');
        }
      });
  };

  const checkScope = async(token) => {
    if(!repo || !owner){
      return
    }
  const octokit = new Octokit({ auth: token });
  const res = await octokit.request(`GET /users/${user.login}`)

  Promise.resolve(res).then((object) => {
    if(object.headers['x-oauth-scopes'].split(',').includes('public_repo')) {
      setScope(true)
    } else {
      setScope(false)
    }
  })
}

const checkPermissions = async(token) => {
  if(!repo || !owner){
    return
  }
const octokit = new Octokit({ auth: token });
const res = await octokit.request(`GET /repos/${owner}/${repo}`)

Promise.resolve(res).then((object) => {
  if(object.data.permissions.push) {
    setPermissions(true)
  } else {
    setPermissions(false)
  }
})
}

  const changeHandler = e => {
    e.preventDefault();
    setApiKey(e.target.value);
    if (e.target.value.length) {
      setLength(true);
      setChecking(true);
      checkPermissions(e.target.value)
      setTimeout(() => {
        setChecking(false);
      }, 2000);
    } else {
      setLength(false);
      setVerified(false);
      setChecking(false);
    }
  };

  useEffect(() => {
    if (user.ethereumAddress === 'none' || user.ethereumKey === 'none') {
      navigate('/ethereum');
    }
  });

  useEffect(()=>{
      checkScope(user.token)
      checkPermissions(user.token)
  }, [owner,repo])


  if (loader) {
    return <Loader />;
  }

  if (!scope) {
    return <div className="content">
    <div className="onboard">
      <span className="">
        <h1>Tokenize This Repository</h1>
      </span>
      <span>Tokenizing {repo} will automatically create 1000000 tokens.</span>

      <form name="create">
        <div className="apiKey">
          <span className=""><img src="../icons/warning.png" />Additional permissions are required to tokenize this repository</span>
          <span className="">
        <a href={`https://github.com/login/oauth/authorize?scope=user:email%20public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`} target="_blank"><button type="button">Update Permissions</button></a>
          </span>
        </div>
        <span>{errorText}</span>
        <span className="items-center">
          <button type="button" className="disabledButton">
            Submit
          </button>
        </span>
      </form>
    </div>
  </div>
  } else if(!permissions){
  return( <div className="content">
    <div className="onboard">
      <span className="">
        <h1>Tokenize This Repository</h1>
      </span>
      <span>Tokenizing {repo} will automatically create 1000000 tokens.</span>
      <form name="create">
        <div className="apiKey">
        <span className="">You do not have permissions to make changes to this repository. Enter a valid Access Token for {repo}</span>
            <span className="">
              <input
                type="text"
                name="apikey"
                placeholder=""
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
        <span>{errorText}</span>
        <span className="items-center">
        <button type="button" className="disabledButton">
              Submit
            </button>
        </span>
      </form>
    </div>
  </div> )
  } else {
  return (
    <div className="content">
      <div className="onboard">
        <span className="">
          <h1>Tokenize This Repository</h1>
        </span>
        <span>Tokenizing {repo} will automatically create 1000000 tokens.</span>

        <form name="create">
          <span>{errorText}</span>
          <span className="items-center">
            <button type="button" className="startButton" onClick={() => createRepo()}>
              Submit
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}}

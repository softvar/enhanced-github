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



  const createRepo = async () => {
    if (verified) {
      setLoader(true);
      await postCreateRepo(user.login, repo, '', user.ethereumAddress, '').then(res => {
        setLoader(false);
        if (res === '201') {
          navigate('/home');
        } else {
          setErrorText('There was an error tokenizing this repository.');
        }
      });
    }
  };

  useEffect(() => {
    if (user.ethereumAddress === 'none' || user.ethereumKey === 'none') {
      navigate('/ethereum');
    }
  });

  useEffect(()=>{
    const checkScope = async() => {
      if(!repo || !owner){
        return
      }
    const octokit = new Octokit({ auth: user.token });
    const res = await octokit.request(`GET /repos/${owner}/${repo}`)
    
    Promise.resolve(res).then((object) => {
      if(object.headers['x-oauth-scopes'].split(',').includes('public_repo')) {
        setVerified(true)
      } else {
        setVerified(false)
      }})}

      checkScope()
  }, [owner,repo])


  if (loader) {
    return <Loader />;
  }

  if (!verified) {
    return <div className="content">
    <div className="onboard">
      <span className="">
        <h1>Tokenize This Repository</h1>
      </span>
      <span>Tokenizing {repo} will automatically create 1000000 tokens.</span>

      <form name="create">
        <div className="apiKey">
          <span className="">Additional permissions are required to tokenize this repository</span>
          <span className="">
        <a href={`https://github.com/login/oauth/authorize?scope=user:email%20public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`} target="_blank"><button type="button">Update Permissions</button></a>
          </span>
        </div>
        <span>{errorText}</span>
        <span className="items-center">
          <button type="button" className="startButton">
            Submit
          </button>
        </span>
      </form>
    </div>
  </div>
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

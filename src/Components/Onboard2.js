import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loadergif from '../loader.gif';
import Loader from './Loader';
import Fail from './Fail';
import Success from './Success';
import storageUtil from '../utils/storageUtil';
import { postCreateRepo } from '../requests';

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

  const createRepo = async () => {
    if (verified) {
      setLoader(true);
      await postCreateRepo(owner, repo, '', user.ethereumAddress, '').then(res => {
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
          <span>{errorText}</span>
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

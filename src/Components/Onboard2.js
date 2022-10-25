import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loadergif from '../loader.gif';
import Loader from './Loader';
import Fail from './Fail';
import Success from './Success';
import storageUtil from '../utils/storageUtil';
import { postCreateRepo } from '../requests';
import Home from './Home';
const { Octokit, App } = require('octokit');
const jwt = require('jsonwebtoken');
export default function Onboard2() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name);
  const owner = useSelector(state => state.repo.owner.login);
  const navigate = useNavigate();

  const currency = repo;

  const [failed, setFailed] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [loader, setLoader] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [length, setLength] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [scope, setScope] = useState(false);
  const [permissions, setPermissions] = useState(false);

  const checkScope = async token => {
    if (!repo || !owner) {
      return;
    }

    let octokit;
    // If token is longer, it must be a hashed token. For testing, it might not be hashed - temporary solution:
    if (token.length > 45) {
      const tokenRes = jwt.verify(token, process.env.JWT);
      octokit = new Octokit({ auth: tokenRes.githubToken });
    } else {
      octokit = new Octokit({ auth: token });
    }

    const res = await octokit.request(`GET /users/${user.login}`);

    Promise.resolve(res).then(object => {
      if (object.headers['x-oauth-scopes'].split(',').includes('public_repo')) {
        setScope(true);
      } else {
        setScope(false);
      }
    });
  };

  const checkPermissions = async token => {
    if (!repo || !owner) {
      return;
    }
    let octokit;
    // If token is longer, it must be a hashed token. For testing, it might not be hashed - temporary solution:
    if (token.length > 45) {
      const tokenRes = jwt.verify(token, process.env.JWT);
      octokit = new Octokit({ auth: tokenRes.githubToken });
    } else {
      octokit = new Octokit({ auth: token });
    }

    const res = await octokit.request(`GET /repos/${owner}/${repo}`);

    Promise.resolve(res).then(object => {
      if (object.data.permissions.push) {
        setPermissions(true);
      } else {
        setPermissions(false);
      }
    });
  };

  const changeHandler = e => {
    e.preventDefault();
    setApiKey(e.target.value);
    if (e.target.value.length) {
      setLength(true);
      setChecking(true);
      checkPermissions(e.target.value);
      setTimeout(() => {
        setChecking(false);
      }, 2000);
    } else {
      setLength(false);
      setVerified(false);
      setChecking(false);
    }
  };

  const createRepo = async () => {
    setLoader(true);
    await postCreateRepo(owner, repo, '', user.ethereumAddress, '', user.token).then(res => {
      setLoader(false);
      if (res === '201') {
        navigate('/home');
      } else {
        setErrorText('There was an error tokenizing this repository.');
      }
    });
  };

  useEffect(() => {
    if (user.ethereumAddress === 'none' || user.ethereumKey === 'none') {
      navigate('/ethereum');
    }
  });

  useEffect(() => {
    checkScope(user.token);
    checkPermissions(user.token);
  }, [owner, repo]);

  if (owner === 'none' && repo === 'none') {
    return <Home />;
  }

  if (loader) {
    return <Loader />;
  }

  if (!scope) {
    return (
      <div className="content">
        <div className="onboard">
          <form name="create">
            <div className="apiKey">
              <span className="">
                <img src="../icons/warning.png" />
                Additional permissions are required to tokenize this repository
              </span>
              <span className="">
                <a
                  href={`https://github.com/login/oauth/authorize?scope=user:email%20public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`}
                  target="_blank"
                >
                  <button type="button">Update Permissions</button>
                </a>
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
    );
  } else if (!permissions) {
    return (
      <div className="content">
        <div className="onboard">
          <span className="">
            <h1>Tokenize This Repository</h1>
          </span>
          <span>Tokenizing {repo} will automatically create 1000000 tokens.</span>
          <form name="create">
            <div className="apiKey">
              <span className="">
                You do not have permissions to make changes to this repository. Enter a valid Access Token for {repo}
              </span>
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
                Not permitted
              </button>
            </span>
          </form>
        </div>
      </div>
    );
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
  }
}

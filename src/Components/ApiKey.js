import React from 'react';
import '../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fail from './Fail';
export default function ApiKey() {
  let repo = 'nixpckgs';
  const navigate = useNavigate();
  //For testing
  let [failed, setFailed] = useState(false);
  let [apiKey, setApiKey] = useState('');

  const submitHandler = () => {
    if (apiKey !== 'ghp_123') {
      setFailed(true);
    } else {
      navigate('/success');
    }
  };

  const changeHandler = e => {
    e.preventDefault();
    setApiKey(e.target.value);
  };

  if (failed) {
    return <Fail apiKey={apiKey} setApiKey={setApiKey} setFailed={setFailed} repo={repo} />;
  }
  return (
    <div className="section content">
      <span className="bigText items-center">Enter your Personal Access Token (PAT) for Nixpkgs</span>
      <form name="apikey" onSubmit={() => submitHandler()}>
        <span className="items-center">
          <input
            type="text"
            name="apikey"
            placeholder="ghp_123"
            value={apiKey}
            onChange={e => changeHandler(e)}
            required
          ></input>
        </span>
        <span className="items-center">
          <button type="submit" className="startButton">
            Submit
          </button>
        </span>
      </form>
      <span className="small italic">
        Not sure about Personal Access Tokens? See:{' '}
        <a
          href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
          target="_blank"
        >
          https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
        </a>
      </span>
    </div>
  );
}

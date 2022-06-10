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
    return <Fail apikey={apiKey} setApiKey={setApiKey} setFailed={setFailed} repo={repo} />;
  }
  return (
    <div className="create">
      <span className="bigText">Enter ApiKey for Nixpkgs</span>
      <form name="apikey" onSubmit={() => submitHandler()}>
        <input type="text" name="apikey" placeholder="ghp_123" onChange={e => changeHandler(e)}></input>

        <button type="submit" className="startButton">
          Submit
        </button>
      </form>
    </div>
  );
}

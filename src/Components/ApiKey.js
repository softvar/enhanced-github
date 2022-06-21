import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fail from './Fail';
import Success from './Success';
import Loader from './Loader';
export default function ApiKey(props) {
  let { repo, amount, currency } = props;

  const navigate = useNavigate();
  //For testing
  let [failed, setFailed] = useState(false);
  let [apiKey, setApiKey] = useState('');
  let [loader, setLoader] = useState(false);
  let [successful, setSuccessful] = useState(false);

  const submitHandler = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      if (apiKey !== 'ghp_123') {
        setFailed(true);
      } else {
        setSuccessful(true);
      }
    }, 2000);
  };

  const changeHandler = e => {
    e.preventDefault();
    setApiKey(e.target.value);
  };
  if (loader) {
    return <Loader />;
  }
  if (failed) {
    return <Fail apiKey={apiKey} setApiKey={setApiKey} setFailed={setFailed} repo={repo} />;
  }
  if (successful) {
    return <Success amount={amount} currency={currency} repo={repo} />;
  }
  return (
    <div className="content  items-center">
      <div className="section">
        <span className="bigText items-center">Enter your Personal Access Token (PAT) for {repo}</span>
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
    </div>
  );
}

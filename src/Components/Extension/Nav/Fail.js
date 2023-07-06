import React from 'react';
import { Link } from 'react-router-dom';
export default function Fail(props) {
  let { repo, setFailed, setApiKey, apiKey } = props;
  console.log(props);
  const clickHandler = e => {
    setFailed(false);
    setApiKey('');
  };

  return (
    <div className="content  items-center">
      <div className="section">
        <p className="items-center">The Personal Access Token you entered:</p>
        <p className="italic secondary items-center">{apiKey}</p>
        <span classNam="items-center">is not a valid Personal Access Token for {repo}.</span>

        <span className="items-center">
          <button type="button" className="startButton" onClick={e => clickHandler(e)}>
            Click here to try again
          </button>
        </span>
      </div>
    </div>
  );
}

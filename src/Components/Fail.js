import React from 'react';
import { Link } from 'react-router-dom';
export default function Fail(props) {
  let { repo, setFailed, setApiKey } = props;

  const clickHandler = e => {
    setFailed(false);
    setApiKey('');
  };

  return (
    <div className="section content">
      <div className="bigText">
        <p>Your Api Key:</p>
        <p></p>
        <p>is invalid for {repo}</p>
      </div>

      <div className="" onClick={e => clickHandler(e)}>
        Click here to try again
      </div>
    </div>
  );
}

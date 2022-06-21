import React, { useState } from 'react';
import '../index.css';
import Home from './Home';
export default function Success(props) {
  let { amount, currency, repo } = props;
  let [complete, setComplete] = useState(false);

  if (complete) {
    return <Home repo={repo} currency={currency} />;
  }
  return (
    <div className="content  items-center">
      <div className="section">
        <span className="bigText items-center">{`${amount} ${currency}`}</span>
        <span className="items-center">
          <img src="../../icons/success.png" className="success" />
        </span>
        <span className="items-center">{repo} Successfully Tokenized!</span>
        <span className="items-center">
          <button className="startButton" onClick={() => setComplete(true)}>
            Continue
          </button>
        </span>
      </div>
    </div>
  );
}

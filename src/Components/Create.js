import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiKey from './ApiKey';

export default function Create(props) {
  let [complete, setComplete] = useState(false);

  let { repo } = props;
  let [amount, setAmount] = useState(0);
  let currency = repo && repo.slice(0, 3).toLowerCase();

  const changeHandler = e => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const submitHandler = () => {
    setComplete(true);
  };

  if (complete) {
    return <ApiKey repo={repo} amount={amount} currency={currency} />;
  }

  return (
    <div className="content items-center">
      <div className="section">
        <form name="tokens" onSubmit={() => submitHandler()}>
          <span className="bigText">Create Tokens for {repo}</span>

          <span className="items-center">
            <label htmlFor="amount" className="items-center">
              How many tokens would you like to create?
            </label>
            <input type="number" name="amount" value={amount} onChange={e => changeHandler(e)} required />
            {currency}
          </span>

          <span className="items-center">
            <button type="submit" className="startButton">
              Go
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

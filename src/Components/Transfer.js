import React, { useState } from 'react';
import '../index.css';
import Review from './Review';
export default function Transfer(props) {
  let { repo, currency } = props;
  let [transfer, setTransfer] = useState({ recipient: '', tokens: currency ? currency : '', amount: 0 });
  let [review, setReview] = useState(false);

  const changeHandler = e => {
    e.preventDefault();
    setTransfer({ ...transfer, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    setReview(true);
  };

  if (review) {
    return (
      <Review recipient={transfer.recipient} tokens={transfer.tokens} amount={transfer.amount} setReview={setReview} />
    );
  }
  return (
    <div className="content items-center">
      <div className="section items-center">
        <label htmlFor="transfer">Transfer Tokens</label>
        <form name="transfer" className="transfer" onSubmit={submitHandler}>
          <span>
            <label htmlFor="recipient">Who would you like to transfer tokens to?</label>
            <input type="text" name="recipient" value={transfer.recipient} onChange={e => changeHandler(e)} required />
          </span>

          <span>
            <label htmlFor="recipient">Select Tokens:</label>
            <select name="tokens" value={transfer.tokens} onChange={e => changeHandler(e)} required>
              {currency ? <option value={currency}>{currency}</option> : null}
              <option value="nix">Nix</option>
              <option value="nix">Rei</option>
            </select>
          </span>

          <span>
            <label htmlFor="amount">How many tokens would you like to send?</label>
            <input type="number" name="amount" value={transfer.amount} onChange={e => changeHandler(e)} required />
          </span>

          <span>
            <button type="submit" className="startButton">
              Review and Send
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

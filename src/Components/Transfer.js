import React, { useState } from 'react';
import '../index.css';
import Review from './Review';
export default function Transfer() {
  let [transfer, setTransfer] = useState({ recipient: '', tokens: '', amount: 0 });
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
      <div className="section">
        <label htmlFor="transfer">Transfer Tokens</label>

        <form name="transfer" className="transfer" onSubmit={submitHandler}>
          <label htmlFor="recipient">Who would you like to transfer tokens to?</label>
          <input type="text" name="recipient" value={transfer.recipient} onChange={e => changeHandler(e)} required />

          <label htmlFor="recipient">Which tokens would you like to send</label>
          <select name="tokens" value={transfer.tokens} onChange={e => changeHandler(e)} required>
            <option value="nix">Nix</option>
            <option value="nix">Sel</option>
            <option value="nix">Rei</option>
          </select>

          <label htmlFor="amount">How many tokens would you like to send?</label>
          <input type="number" name="amount" value={transfer.amount} onChange={e => changeHandler(e)} required />

          <button type="submit">Review and Send</button>
        </form>
      </div>
    </div>
  );
}

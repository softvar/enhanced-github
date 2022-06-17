import React, { useState, useEffect } from 'react';
import '../index.css';
import Review from './Review';
export default function Transfer(props) {
  let { repo, currency } = props;
  let [transfer, setTransfer] = useState({ recipient: '', tokens: '', amount: 0 });
  let [review, setReview] = useState(false);

  useEffect(() => {
    setReview(false);
  }, []);

  const changeHandler = e => {
    e.preventDefault();
    setTransfer({ ...transfer, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    setReview(true);
  };

  if (review) {
    return (
      <Review
        recipient={transfer.recipient}
        tokens={transfer.tokens}
        amount={transfer.amount}
        setTransfer={setTransfer}
        setReview={setReview}
        repo={repo}
      />
    );
  }
  return (
    <div className="content items-center">
      <div className="section items-center">
        <form name="transfer" className="transfer" onSubmit={submitHandler}>
          <span>
            <label htmlFor="transfer" className="">
              Who would you like to transfer tokens to?
            </label>
            <input type="text" name="recipient" value={transfer.recipient} onChange={e => changeHandler(e)} required />
          </span>

          <span>
            <label htmlFor="recipient">Which tokens would you like to send?</label>
            <select name="tokens" value={transfer.tokens} onChange={e => changeHandler(e)} required>
              <option value="sel">sel - SelectedWork</option>
              <option value="nix">nix - Nixpckgs</option>
              <option value="rei">rei - Reibase</option>
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

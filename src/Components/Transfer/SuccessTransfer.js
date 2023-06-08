import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessTransfer(props) {
  const navigate = useNavigate();
  let { amount, repo, recipientName, setReview, setTransfer, setSuccess, tokenAmount } = props;
  let balance = Number(tokenAmount) - Number(amount);
  console.log(typeof tokenAmount, typeof amount);
  const clickHandler = e => {
    e.preventDefault();
    setSuccess(false);
    setReview(false);
    setTransfer({ recipient: '', tokens: '', amount: 0 });
  };

  return (
    <div className="content  items-center">
      <div className="section">
        <span className="bigText items-center">Transfer Successful!</span>
        <span className="items-center">
          <img src="../../icons/success.png" className="success" />
        </span>
        <span className="items-center">
          You have sent {amount} {repo} VotePower to {recipientName}
        </span>
        <span className="items-center">Your remaining balance is {balance} VotePower.</span>
        <span className="items-center">
          <button type="button" className="startButton" onClick={e => clickHandler(e)}>
            Make another transfer
          </button>
        </span>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';

export default function SuccessTransfer(props) {
  const navigate = useNavigate();
  let { amount, tokens, recipient, setReview, setTransfer, setSuccess } = props;

  // if (window.location.pathname !== '/success') {
  //   setSuccess(false);
  //   setReview(false);
  //   setTransfer({ recipient: '', tokens: '', amount: 0 });
  // }

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
          You have sent {amount} {tokens} to {recipient}
        </span>
        <span className="items-center">
          <button type="button" className="startButton" onClick={e => clickHandler(e)}>
            Make another transfer
          </button>
        </span>
      </div>
    </div>
  );
}

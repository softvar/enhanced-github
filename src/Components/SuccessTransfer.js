import React from 'react';
import '../index.css';
export default function SuccessTransfer(props) {
  let { amount, tokens, recipient } = props;

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
      </div>
    </div>
  );
}

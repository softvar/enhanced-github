import React, { useState } from 'react';
import SuccessTransfer from './SuccessTransfer';
import Loader from './Loader';
export default function Review(props) {
  let { recipient, tokens, amount, setReview, setTransfer } = props;
  let [success, setSuccess] = useState(false);
  let [loader, setLoader] = useState(false);
  const clickHandler = e => {
    setLoader(true);
    //Make Api Call here... then:
    setTimeout(() => {
      setLoader(false);
      setSuccess(true);
    }, 2000);
  };

  if (loader) {
    return <Loader />;
  }

  if (success) {
    return (
      <SuccessTransfer
        recipient={recipient}
        tokens={tokens}
        amount={amount}
        setReview={setReview}
        setTransfer={setTransfer}
        setSuccess={setSuccess}
      />
    );
  }

  return (
    <div className="content items-center">
      <div className="section items-center">
        <span className="bigText">Transfer Summary:</span>
        <ul className="transferSummary">
          <li>
            <span className="secondary">Recipient:</span> <span>{recipient}</span>
          </li>
          <li>
            <span className="secondary">Tokens:</span> <span>{tokens}</span>
          </li>
          <li>
            <span className="secondary">Amount:</span> <span>{amount}</span>
          </li>
        </ul>
        <span className="items-center">
          <button type="button" className="button" onClick={() => setReview(false)}>
            Make a change
          </button>
        </span>

        <span className="items-center">
          <button type="button" className="startButton" onClick={e => clickHandler(e)}>
            Proceed With Transfer
          </button>
        </span>
      </div>
    </div>
  );
}

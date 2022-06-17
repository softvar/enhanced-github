import React, { useState } from 'react';
import SuccessTransfer from './SuccessTransfer';
import Loader from './Loader';
export default function Review(props) {
  let { recipient, tokens, amount, setReview } = props;
  let [success, setSuccess] = useState(false);
  let [loader, setLoader] = useState(false);
  const clickHandler = e => {
    //Make Api Call then...
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setSuccess(true);
    }, 2000);
  };

  if (loader) {
    return <Loader />;
  }

  if (success) {
    return <SuccessTransfer recipient={recipient} tokens={tokens} amount={amount} />;
  }

  return (
    <div className="content items-center">
      <div className="section items-center">
        <span>Transfer Summary:</span>
        <span>Recipient: {recipient}</span>
        <span>Tokens: {tokens}</span>
        <span>Amount: {amount}</span>

        <span>
          <button type="button" className="button" onClick={() => setReview(false)}>
            Make a change
          </button>
        </span>
        <span>
          <button type="button" className="startButton items-center" onClick={e => clickHandler(e)}>
            Proceed With Transfer
          </button>
        </span>
      </div>
    </div>
  );
}

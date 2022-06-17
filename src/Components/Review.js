import React from 'react';

export default function Review(props) {
  let { recipient, tokens, amount, setReview } = props;

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
          <button type="button" className="startButton items-center">
            Proceed With Transfer
          </button>
        </span>
      </div>
    </div>
  );
}

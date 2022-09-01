import React, { useState } from 'react';
import SuccessTransfer from './SuccessTransfer';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { postTransferTokens } from '../requests';
export default function Review(props) {
  const user = useSelector(state => state.auth.user);
  let { recipientId, recipientName, tokens, amount, setReview, setTransfer, repo, tokenAmount } = props;
  let [success, setSuccess] = useState(false);
  let [loader, setLoader] = useState(false);

  const clickHandler = async e => {
    setLoader(true);

    await postTransferTokens(user.login, repo, user.ethereumAddress, recipientId, amount)
      .catch(error => setLoader(false))
      .then(() => setSuccess(true))
      .then(() => setLoader(false));
  };

  if (loader) {
    return <Loader />;
  }

  if (success) {
    return (
      <SuccessTransfer
        recipientId={recipientId}
        recipientName={recipientName}
        tokens={tokens}
        amount={amount}
        setReview={setReview}
        setTransfer={setTransfer}
        setSuccess={setSuccess}
        tokenAmount={tokenAmount}
        repo={repo}
      />
    );
  }

  return (
    <div className="content ">
      <span className="bigText">Transfer Summary:</span>
      <div className="transferSummary">
        <span>
          <ul>
            <li>
              <span className="secondary">Recipient Name:</span> <span>{recipientName}</span>
            </li>
            <li>
              <span className="secondary">Recipient Id:</span> <span>{recipientId}</span>
            </li>
            <li>
              <span className="secondary">Repo:</span> <span>{repo}</span>
            </li>
            <li>
              <span className="secondary">Amount:</span>
              <span>
                {amount} {tokens}
              </span>
            </li>
          </ul>
        </span>
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

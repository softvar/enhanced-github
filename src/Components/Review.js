import React, { useState } from 'react';
import SuccessTransfer from './SuccessTransfer';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import superagent from 'superagent';
export default function Review(props) {
  const user = useSelector(state => state.auth.user);
  let { recipientId, recipientName, tokens, amount, setReview, setTransfer, repo, tokenAmount } = props;
  let [success, setSuccess] = useState(false);
  let [loader, setLoader] = useState(false);

  async function postTransferTokens(owner, repository, from, to, amount) {
    superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ transferTokens(owner: "${owner}", repo: "${repo}", from: "${from}", to: "${to}", amount: "${amount}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json')
      .end((err, res) => {
        // Calling the end function will send the request
      });
  }

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

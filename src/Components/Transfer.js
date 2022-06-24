import React, { useState, useEffect } from 'react';
import Review from './Review';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import superagent from 'superagent';
import loadergif from '../loader.gif';
export default function Transfer(props) {
  let user = useSelector(state => state.auth.user);
  let [repo, setRepo] = useState('');
  let [owner, setOwner] = useState('');
  const navigate = useNavigate();
  let [errorText, setErrorText] = useState(' ');

  async function postGetContributorID(owner, repo, issue_id, contributor_name) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ getContributorID(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_name: "${contributor_name}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json');
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    console.log(json);
    return json.data.getContributorID;
  }
  async function postGetContributorTokenAmount(owner, repo, issue_id, contributor_id, side) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ getContributorTokenAmount(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json');
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    console.log(json);
    return json.data.getContributorTokenAmount;
  }

  let [checking, setChecking] = useState(false);
  let [verified, setVerified] = useState(false);
  let [length, setLength] = useState(false);

  let [tokenAmount, setTokenAmount] = useState('');

  let [invalidText, setInvalidText] = useState('');

  let [transfer, setTransfer] = useState({
    from: user.ethereumAddress,
    recipientId: 'none',
    recipientName: '',
    amount: ''
  });

  useEffect(() => {
    chrome.storage.local.get(['repo'], data => setRepo(data.repo));
    chrome.storage.local.get(['owner'], data => setOwner(data.owner));
  }, []);

  let [review, setReview] = useState(false);

  useEffect(() => {
    setReview(false);
  }, []);

  useEffect(() => {
    const getTokenAmount = async () => {
      await postGetContributorTokenAmount(owner, repo, '', user.ethereumAddress, '').then(res => setTokenAmount(res));
    };
    getTokenAmount();
  }, [repo, owner]);

  useEffect(() => {
    if (!transfer.recipientName.length) {
      setErrorText(' ');
      setChecking(false);
      setVerified(false);
      setLength(false);
    }
    if (transfer.recipientName.length > 1 && transfer.recipientId === 'none') {
      setErrorText('Turbo-Src user not found');
      setChecking(false);
      setVerified(false);
      setLength(true);
    }
    if (transfer.recipientId !== 'none') {
      setErrorText(`User Id: ${transfer.recipientId}`);
      setChecking(false);
      setVerified(true);
      setLength(true);
    }
  }, [transfer]);

  const changeHandler = e => {
    e.preventDefault();
    setTransfer({ ...transfer, [e.target.name]: e.target.value });
  };

  const getId = async e => {
    e.preventDefault();
    changeHandler(e);

    if (e.target.value.length > 1) {
      setChecking(true);
      await postGetContributorID('', '', '', e.target.value)
        .then(res => setTransfer({ ...transfer, recipientName: e.target.value, recipientId: res }))
        .catch(error => console.log('error', error));
    }
  };

  const reviewHandler = () => {
    if (Number(transfer.amount) < 1) {
      setInvalidText(`Please enter a number between 1 and ${tokenAmount}`);
    }
    if (Number(transfer.amount) > Number(tokenAmount)) {
      setInvalidText('Amount exceeds current balance.');
    }
    if (
      Number(transfer.amount) <= Number(tokenAmount) &&
      Number(transfer.amount) >= 1 &&
      transfer.recipientId &&
      transfer.recipientId !== 'none'
    ) {
      setReview(true);
    }
  };

  useEffect(() => {
    if (user.ethereumAddress === 'none' || user.ethereumKey === 'none') {
      navigate('/ethereum');
    }
  });

  if (review) {
    return (
      <Review
        from={transfer.from}
        recipientName={transfer.recipientName}
        recipientId={transfer.recipientId}
        tokens={transfer.tokens}
        amount={transfer.amount}
        setTransfer={setTransfer}
        setReview={setReview}
        repo={repo}
        owner={owner}
        tokenAmount={tokenAmount}
      />
    );
  }
  return (
    <div className="content items-center">
      <div className="transferContent">
        <header>
          <h2>Transfer {repo} Tokens</h2>
          <span className="balance">
            You currently have <text>{` ${tokenAmount || 0} ${repo}`}</text> tokens
          </span>
        </header>

        <form name="transfer" className="transfer">
          <span>
            <label htmlFor="transfer" className="">
              Who would you like to transfer tokens to?
            </label>
            <div>
              <input
                type="text"
                name="recipientName"
                value={transfer.recipientName}
                onChange={e => getId(e)}
                placeholder="Username"
                required
              />
              {checking ? (
                <img src={loadergif}></img>
              ) : verified ? (
                <img src="../../icons/success.png"></img>
              ) : length ? (
                <img src="../../icons/incorrect.png"></img>
              ) : (
                <img src="../../icons/warning.png"></img>
              )}
            </div>
            <p className="errorText">{errorText}</p>
          </span>

          <span>
            <label htmlFor="amount">How many tokens would you like to send?</label>
            <input type="number" name="amount" value={transfer.amount} onChange={e => changeHandler(e)} required />
            <p className="errorText">{invalidText}</p>
          </span>

          <span>
            <button type="submit" className="startButton" onClick={() => reviewHandler()}>
              Review and Send
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

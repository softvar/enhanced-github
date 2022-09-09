import React, { useState, useEffect } from 'react';
import Review from './Review';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import superagent from 'superagent';
import loadergif from '../loader.gif';
import { postGetContributorID, postGetContributorTokenAmount } from '../requests';
import useCommas from '../hooks/useCommas';
export default function Transfer(props) {
  let user = useSelector(state => state.auth.user);
  let [repo, setRepo] = useState('');
  let [owner, setOwner] = useState('');
  const navigate = useNavigate();
  let [errorText, setErrorText] = useState(' ');
  let [checking, setChecking] = useState(false);
  let [verified, setVerified] = useState(false);
  let [length, setLength] = useState(false);

  let [tokenAmount, setTokenAmount] = useState('');
  let [tokenString, setTokenString] = useState('');
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
      await postGetContributorTokenAmount(owner, repo, '', user.ethereumAddress, '').then(res =>
        setTokenAmount(res.amount)
      );
    };
    getTokenAmount();
  });

  useEffect(() => {
    const string = useCommas(tokenAmount);
    setTokenString(string);
  }, [tokenAmount]);

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
      setInvalidText(`Please enter a number between 1 and ${tokenString}`);
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
            You currently have <text>{` ${tokenString || 0} ${repo}`}</text> tokens
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
            <button type="button" className="startButton" onClick={() => reviewHandler()}>
              Review and Send
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

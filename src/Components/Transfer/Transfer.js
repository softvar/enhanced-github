import React, { useState } from 'react';
import Review from './Review';
import { useSelector } from 'react-redux';
import SuccessTransfer from './SuccessTransfer';
import Loader from '../Loader';
import NewTransfer from './NewTransfer';

export default function Transfer() {
  let user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name);
  const owner = useSelector(state => state.repo.owner.login);

  let [transfer, setTransfer] = useState({
    repo: '',
    from: user.ethereumAddress,
    recipientId: 'none',
    recipientName: '',
    amount: 0,
    network: '',
    id: '',
    createdAt: ''
  });

  let [step, setStep] = useState('NewTransfer');

  const changeHandler = e => {
    e.preventDefault();
    setTransfer({ ...transfer, [e.target.name]: e.target.value });
  };

  switch (step) {
    case 'NewTransfer':
      return (
        <NewTransfer
          user={user}
          from={transfer.from}
          recipientName={transfer.recipientName}
          recipientId={transfer.recipientId}
          tokens={transfer.tokens}
          amount={transfer.amount}
          transfer={transfer}
          changeHandler={changeHandler}
          setTransfer={setTransfer}
          setStep={setStep}
          repo={repo}
          owner={owner}
        />
      );
    case 'Review':
      return (
        <Review
          from={transfer.from}
          recipientName={transfer.recipientName}
          recipientId={transfer.recipientId}
          tokens={transfer.tokens}
          amount={transfer.amount}
          setTransfer={setTransfer}
          transfer={transfer}
          setStep={setStep}
          repo={repo}
          owner={owner}
        />
      );
    case 'Loading':
      return <Loader />;
    case 'SuccessTransfer':
      return (
        <SuccessTransfer
          recipientId={transfer.recipientId}
          recipientName={transfer.recipientName}
          amount={transfer.amount}
          setStep={setStep}
          setTransfer={setTransfer}
          repo={repo}
          id={transfer.id}
          network={transfer.network}
          createdAt={transfer.createdAt}
          transfer={transfer}
        />
      );
    default:
      return <Transfer />;
  }
}

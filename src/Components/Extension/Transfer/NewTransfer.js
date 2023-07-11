import React, { useState, useEffect } from 'react';
import loadergif from '../../../loader.gif';
import styled from 'styled-components';
import { postGetContributorID, postGetVotePowerAmount } from '../../../requests';

const Content = styled.div`
  height: 27rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 22px;
    font-weight: 400;
  }

  h3 {
    font-size: 12px;
    font-weight: 300;
    color: #313131;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 12px;
    font-weight: 300;
  }

  input {
    outline: none;
    border: 0.5px solid #313131;
    padding: 0.3rem;
  }
`;

const Repository = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;

  div:nth-child(1) {
    width: 10%;
  }

  div:nth-child(2) {
    width: 80%;
  }

  .highlight {
    background-color: #e7f0ff;
    padding: 0.3rem;
    color: #5200ff;
    font-weight: 300;
    font-family: 'Roboto Mono', monospace;
  }
`;

const Recipient = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div:nth-child(1) {
    margin-top: 5px;
    width: 10%;
  }

  div:nth-child(2) {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;

    span:nth-child(1) {
      flex-grow: 1;

      input {
        width: 100%;
      }
    }
  }

  img {
    margin-left: 0.5rem;
    height: 16px;
    width: 16px;
  }
`;
const ErrorText = styled.div`
  font-size: 10px;
  font-style: italic;
  color: var(--secondary);
  display: flex;
  justify-content: right;
  width: 100%;
  height: 24px;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;

  div {
    width: 80%;
  }
`;

const Amount = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;

  div:nth-child(1) {
    height: 20px;
    width: 10%;
  }

  div:nth-child(2) {
    width: 80%;
  }
`;

const Continue = styled.section`
  width: 100%;
  text-align: center;
`;

const ContinueButton = styled.button`
  width: 220px;
  height: 45px;
  color: #fff;
  font-weight: 300;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #313131;
  margin-top: 2rem;
  font-size: 16px;

  :disabled {
    background-color: #b7b7b7;
    color: #6a6868;
    cursor: auto;
  }
`;

export default function StartTransfer({
  user,
  owner,
  repo,
  recipientName,
  recipientId,
  amount,
  setTransfer,
  transfer,
  changeHandler,
  setStep
}) {
  let [errorText, setErrorText] = useState(' ');
  let [checking, setChecking] = useState(false);
  let [verified, setVerified] = useState(false);
  let [length, setLength] = useState(false);
  let [error, setError] = useState(true);
  let [tokenAmount, setTokenAmount] = useState('');

  let [tokenString, setTokenString] = useState('');
  let [invalidText, setInvalidText] = useState('');

  const getTokenAmount = async () => {
    await postGetVotePowerAmount(owner, repo, '', user.ethereumAddress, '', user.token).then(res =>
      setTokenAmount(res.amount)
    );
  };

  useEffect(() => {
    setTimeout(() => {
      getTokenAmount();
    }, 1000);
  }, []);

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
    if (Number(amount) < 1) {
      setInvalidText(`Please enter a number between 1 and ${tokenString}`);
    }
    if (Number(amount) > Number(tokenAmount)) {
      setInvalidText('Amount exceeds current balance.');
    }
    if (Number(amount) <= Number(tokenAmount) && Number(amount) >= 1 && recipientId && recipientId !== 'none') {
      setStep('Review');
    }
  };

  useEffect(() => {
    if (!recipientName.length) {
      setErrorText(' ');
      setChecking(false);
      setVerified(false);
      setLength(false);
      setError(true);
    }
    if (recipientName.length > 1 && recipientId === 'none') {
      setErrorText('User not found');
      setChecking(false);
      setVerified(false);
      setLength(true);
      setError(true);
    }
    if (recipientId !== 'none') {
      setErrorText(`${recipientId}`);
      setChecking(false);
      setVerified(true);
      setLength(true);
      if (amount >= 1) {
        setError(false);
      }
    }
  }, [transfer]);

  return (
    <Content>
      <Header>
        <h1>Transfer VotePower</h1>
        <h3>Powered by Turbosrc</h3>
      </Header>

      <Form name="transfer">
        <Repository>
          <div>
            <label htmlFor="repo" />
            Repository
          </div>
          <div>
            <span className="highlight">
              {owner}/{repo}
            </span>
          </div>
        </Repository>

        <Recipient>
          <div>
            <label htmlFor="recipientName">Recipient</label>
          </div>

          <div>
            <span>
              <input
                type="text"
                name="recipientName"
                value={transfer.recipientName}
                onChange={e => getId(e)}
                placeholder="Username"
                required
              />
            </span>
            <span>
              {checking ? (
                <img src={loadergif}></img>
              ) : verified ? (
                <img src="../../icons/success.png"></img>
              ) : length ? (
                <img src="../../icons/incorrect.png"></img>
              ) : (
                <img src="../../icons/warning.png"></img>
              )}
            </span>
          </div>
        </Recipient>
        <ErrorText>
          <div>{errorText}</div>
        </ErrorText>

        <Amount>
          <div>
            <label htmlFor="amount">Amount:</label>
          </div>
          <div>
            <input type="number" name="amount" value={transfer.amount} onChange={e => changeHandler(e)} required />
          </div>
        </Amount>
        <ErrorText>
          <div>{invalidText}</div>
        </ErrorText>

        <Continue>
          <ContinueButton type="button" disabled={error} onClick={() => reviewHandler()}>
            Continue
          </ContinueButton>
        </Continue>
      </Form>
    </Content>
  );
}

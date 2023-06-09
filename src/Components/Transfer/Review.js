import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { postTransferTokens } from '../../requests';
import styled from 'styled-components';

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

const TransferSummary = styled.div`
  width: 100%;
  height: auto;
`;

const Table = styled.div`
width: 100%;

ul li {
  list-style: none;
  padding: none;
  margin; none;
}

li {
  width: 100%;
  padding: .3rem 1rem .3rem 1rem;
  min-height: 18px;
  display: flex; 
  justify-content: space-between;
}

li:nth-child(odd) {
  background-color: #E7F0FF;
}
`;

const Continue = styled.section`
  width: 100%;
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {
    position: absolute;
    left: 5%;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 16px;

    img {
      margin: 0.2rem 0.2rem 0rem 0rem;
      width: 14px;
      height: 14px;
    }
  }
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
  font-size: 16px;

  :disabled {
    background-color: #b7b7b7;
    color: #6a6868;
    cursor: auto;
  }
`;

const ErrorText = styled.div`
  width: 100%;
  display: block;
  font-size: 12px;
  font-weight: 300;
  color: red;
  text-align: center;
  margin: 1rem;
`;
export default function Review({
  recipientId,
  recipientName,
  tokens,
  amount,
  setStep,
  setTransfer,
  transfer,
  owner,
  repo
}) {
  const user = useSelector(state => state.auth.user);
  let [errorText, setErrorText] = useState(' ');

  const clickHandler = async e => {
    setStep('Loading');
    await postTransferTokens(owner, repo, user.ethereumAddress, recipientId, amount, user.token).then(res => {
      if (res.status === 201) {
        setTransfer({ ...transfer, amount: res.amount, createdAt: res.createdAt, id: res.id, network: res.network });
        setTimeout(() => {
          setStep('SuccessTransfer');
        }, 1500);
      } else {
        setErrorText('There was an error processing transfer. Please review details and try again.');
      }
    });
  };

  return (
    <Content>
      <Header>
        <h1>Transfer Summary</h1>
        <h3>Please review before submitting.</h3>
      </Header>
      <TransferSummary>
        <Table>
          <ul>
            <li>
              <span>Repository</span>{' '}
              <span>
                {owner}/{repo}
              </span>
            </li>
            <li>
              <span>From</span> <span>{user.login}</span>
            </li>
            <li>
              <span>To</span> <span>{recipientName}</span>
            </li>
            {/* <li>
              <span>Recipient Id:</span> <span>{recipientId}</span>
            </li> */}
            <li>
              <span>Amount</span>
              <span>
                {amount} {tokens}
              </span>
            </li>
            <li>
              <span>Network</span>
              <span>Turbosrc</span>
            </li>
          </ul>
        </Table>
        <ErrorText>{errorText}</ErrorText>
      </TransferSummary>
      <Continue>
        <div onClick={() => setStep('Transfer')}>
          <span>
            <img src="../../../icons/leftarrow.png" />
          </span>
          <span>Back</span>
        </div>
        <ContinueButton type="button" onClick={e => clickHandler(e)}>
          Submit
        </ContinueButton>
      </Continue>
    </Content>
  );
}

import React, { useState } from 'react';
import SuccessTransfer from './SuccessTransfer';
import Loader from '../Loader';
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
`

const TransferSummary = styled.div`
width: 100%;
height: auto;
`

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
`

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
    margin: .2rem .2rem 0rem 0rem;
    width: 14px;
    height: 14px;
  }
}
`

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
  background-color: #B7B7B7;
  color: #6A6868;
  cursor: auto;
}
`
export default function Review(props) {
  const user = useSelector(state => state.auth.user);
  let { recipientId, recipientName, tokens, amount, setReview, setTransfer, owner, repo, tokenAmount } = props;
  let [success, setSuccess] = useState(false);
  let [loader, setLoader] = useState(false);

  const clickHandler = async e => {
    setLoader(true);

    await postTransferTokens(owner, repo, user.ethereumAddress, recipientId, amount, user.token)
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
    <Content>
      <Header>
        <h1>
          Transfer Summary
        </h1>
        <h3>
          Please review before submitting.
        </h3>
      </Header>
      <TransferSummary>
        <Table>
          <ul>
          <li>
            <span>Repository</span> <span>{owner}/{repo}</span>
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
              <span >Amount</span>
              <span>
                {amount} {tokens}
              </span>
            </li>
            <li>
              <span >Network</span>
              <span>
               Turbosrc
              </span>
            </li>
          </ul>
        </Table>
      </TransferSummary>
      <Continue>
          <div onClick={() => setReview(false)}>
            <span>
              <img src="../../../icons/leftarrow.png" />
            </span>
            <span>
              Back
           </span>
          </div>
          <ContinueButton type="button" onClick={e => clickHandler(e)}>
            Submit
          </ContinueButton>
          </Continue>
    </Content>
  );
}

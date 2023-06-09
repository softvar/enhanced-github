import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  text-align: center;

  h1 {
    font-size: 22px;
    font-weight: 300;
  }

  h3 {
    font-size: 12px;
    font-weight: 300;
    color: #313131;
  }

  img {
    height: 35px;
    width: 35px;
    margin-bottom: 1rem;
  }
`;
const Receipt = styled.section`
  width: 100%;
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  line-height: 24px;
  font-weight: 200;
  color: #6a6868;
  padding: 1rem 1rem 2rem 1rem;

  .purple {
    color: #4a00ba;
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

li:nth-child(even) {
  background-color: #E7F0FF;
}
`;
const BottomWrapper = styled.section`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
`;

const TransferButton = styled.button`
  width: 220px;
  height: 45px;
  color: #313131;
  font-weight: 300;
  outline: none;
  border: 0.5px solid #313131;
  background-color: #fff;
  cursor: pointer;
  margin: 0.5rem;
  font-size: 16px;
`;

const HomeButton = styled(TransferButton)`
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #313131;
`;

export default function SuccessTransfer({ amount, repo, recipientName, setStep, setTransfer, createdAt, id, network }) {
  const navigate = useNavigate();
  function timeConverter(unix) {
    const a = new Date(Number(unix));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }
  const date = timeConverter(createdAt);

  const clickHandler = e => {
    e.preventDefault();
    setTransfer({ from: '', recipientId: 'none', recipientName: '', amount: 0, createdAt: '', id: '' });
    if (e.target.value === 'Home') {
      navigate('/home');
    }
    setStep('Transfer');
  };

  return (
    <Content>
      <Header>
        <div>
          <img src="../../icons/success.png" className="success" />
        </div>
        <div>
          <h1>Transfer Completed Successfully!</h1>
        </div>
      </Header>
      <Receipt>
        You sent{' '}
        <span className="purple">
          {amount} {repo}
        </span>{' '}
        VotePower to <span className="purple">{recipientName}</span> on {date}
      </Receipt>
      <TransferSummary>
        <Table>
          <ul>
            <li>
              <span>Transaction ID:</span>
              <span>{id}</span>
            </li>
            <li>
              <span>Network</span>
              <span>{network}</span>
            </li>
          </ul>
        </Table>
      </TransferSummary>
      <BottomWrapper>
        <HomeButton value="Home" onClick={e => clickHandler(e)}>
          Home
        </HomeButton>
        <TransferButton onClick={e => clickHandler(e)}>Make another transfer</TransferButton>
      </BottomWrapper>
    </Content>
  );
}

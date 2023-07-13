import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postGetVotePowerAmount } from '../../../requests';
import useCommas from '../../../hooks/useCommas';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Account() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name);
  const owner = useSelector(state => state.repo.owner.login);

  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;
  let [tokenAmount, setTokenAmount] = useState('');
  let avatar = user?.avatar_url || null;

  const notify = () => toast("Copied to clipboard!");

  const copyAddress = () => {
    const textToCopy = navigator.clipboard.writeText(user?.ethereumAddress)
      .then(() => {
        console.log('Text copied to clipboard:', textToCopy);
        notify();
        // Perform any additional actions on successful copy
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
        // Handle any errors that occur during copying
      });
  };  

  const copySignature = () => {
    const textToCopy = navigator.clipboard.writeText(user?.ethereumKey)
      .then(() => {
        console.log('Text copied to clipboard:', textToCopy);
        notify();
        // Perform any additional actions on successful copy
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
        // Handle any errors that occur during copying
      });
  };  
  
  

  const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `;

    const Username = styled.span`
      color: #6A6868;
      font-size: 15px;
      font-weight: 600;
    `;

    const ProfilePicture = styled.img`
      height: 4rem;
      width: 4rem;
      display: block;
      object-fit: cover;
      border-radius: 50%;
      margin: 5px;
      background-color: var(--lightbg);
    `;

    const AccountContent = styled.div`
    width: 24rem;
    height: 27rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.5rem;
    `;

    const AccountHeader = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `;

    const AccountAddress = styled.div`
      width: 285px;
    `;

    const Address = styled.div`
      display: flex;
      flex-direction: column;
      `;

      const AddressHeading = styled.span`
        color: #6A6868;
        font-size: 12px;
        font-weight: 600;
      `;

      const EthAddress = styled.span`
        color: black;
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 10px;
      `;
      const Signature = styled(EthAddress)`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      `;

  useEffect(() => {
    const getTokenAmount = async () => {
      await postGetVotePowerAmount(owner, repo, '', user.ethereumAddress, '', user.token)
        .then(res => useCommas(res.amount))
        .then(tokens => setTokenAmount(tokens));
    };
    getTokenAmount();
    console.log(user, 'user', repo, 'repo', owner, 'owner', name, 'name', username, 'username');
  });

  return (
    <AccountContent>
      <AccountHeader>
        <Profile>
          <ProfilePicture src={avatar}/>
          <Username>
            <a href={user?.html_url} target="_blank">
              {username}
            </a>
          </Username>
        </Profile>
        <AccountAddress>
          <Address >
            <AddressHeading >Address</AddressHeading>
            <EthAddress onClick={copyAddress} >{user?.ethereumAddress}</EthAddress>
          </Address>
          <Address >
            <AddressHeading >Signature</AddressHeading>
            <Signature onClick={copySignature} >{user?.ethereumKey}</Signature>
          </Address>
        </AccountAddress>
      </AccountHeader>

      <Settings />
    </AccountContent>
  );
}

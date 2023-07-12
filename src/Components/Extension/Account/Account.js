import React, { useState, useEffect, useRef } from 'react';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postGetVotePowerAmount } from '../../../requests';
import useCommas from '../../../hooks/useCommas';
import styled from 'styled-components';

export default function Account() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name);
  const owner = useSelector(state => state.repo.owner.login);

  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;
  let [tokenAmount, setTokenAmount] = useState('');
  let avatar = user?.avatar_url || null;

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
      height: 5rem;
      width: 5rem;
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
      width: 260px;
    `;

    const Address = styled.div`
      display: flex;
      flex-direction: column;
      `;

      const AddressHeading = styled.span`
        color: #6A6868;
        font-size: 11px;
        font-weight: 600;
      `;

      const EthAddress = styled.span`
        color: black;
        font-size: 10px;
        font-weight: 600;
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
          <Address>
            <AddressHeading>Address</AddressHeading>
            <EthAddress>{user?.ethereumAddress}</EthAddress>
          </Address>
          <ul>
            <li className="bold">{name}</li>
            <li className="secondary githubLine">
              <a href={user?.html_url} target="_blank">
                {username}
                <img src="../../icons/github.png" />
              </a>
            </li>
            <li className="secondary tokensLine">
              <span>{` ${tokenAmount || 0} ${repo}`}</span> VotePower
            </li>
          </ul>
        </AccountAddress>
      </AccountHeader>

      <Settings />
    </AccountContent>
  );
}

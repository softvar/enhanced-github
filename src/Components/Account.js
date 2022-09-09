import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postGetContributorTokenAmount } from '../requests';
import useCommas from '../hooks/useCommas';
export default function Account() {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;
  let [tokenAmount, setTokenAmount] = useState('');
  let avatar = user?.avatar_url || null;
  let [repo, setRepo] = useState('');
  let [owner, setOwner] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['repo'], data => setRepo(data.repo));
    chrome.storage.local.get(['owner'], data => setOwner(data.owner));
  }, []);

  useEffect(() => {
    const getTokenAmount = async () => {
      await postGetContributorTokenAmount(owner, repo, '', user.ethereumAddress, '')
        .then(res => useCommas(res.amount))
        .then(tokens => setTokenAmount(tokens));
    };
    getTokenAmount();
  });

  return (
    <div className="content flex-col">
      <span className="bigText">Account</span>
      <div className="profile items-center">
        <img src={avatar} className="profilePicture" />
        <span>
          <ul>
            <li className="bold">{name}</li>
            <li className="secondary githubLine">
              <a href={user?.html_url} target="_blank">
                {username}
                <img src="../../icons/github.png" />
              </a>
            </li>
            <li className="secondary tokensLine">
              <span>{` ${tokenAmount || 0} ${repo}`}</span> tokens
            </li>
          </ul>
        </span>
      </div>

      <Settings />
    </div>
  );
}

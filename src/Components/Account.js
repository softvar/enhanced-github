import React from 'react';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;
  let tokens = user?.tokens || `No tokens.`;
  let avatar = user?.avatar_url || null;
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
              {tokens} {user?.tokens ? null : <span onClick={() => navigate('/onboard')}>Click to create some.</span>}
            </li>
          </ul>
        </span>
      </div>

      <Settings />
    </div>
  );
}

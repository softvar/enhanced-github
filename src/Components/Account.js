import React from 'react';
import Settings from './Settings';
export default function Account() {
  let name = 'Louis';
  let email = 'louis@gmail.com';
  let tokens = '100,000 nix';

  return (
    <div className="content flex-col">
      <span className="bigText">Account</span>
      <div className="profile">
        <span src="" className="profilePicture"></span>
        <span>
          <ul>
            <li className="bold">{name}</li>
            <li className="secondary">{email}</li>
            <li>{tokens}</li>
          </ul>
        </span>
      </div>
      <div className="data">Live Data on Current Repo</div>
      <Settings />
    </div>
  );
}

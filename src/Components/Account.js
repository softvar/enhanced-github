import React from 'react';
import Settings from './Settings';
export default function Account() {
  let name = 'Louis';
  let email = 'louis@gmail.com';
  let tokens = '100,000 nix';

  return (
    <div className="content">
      <span className="bigText">Account</span>
      <div className="profile">
        <span src="" className="profilePicture"></span>
        <span>
          <ul>
            <li>{name}</li>
            <li>{email}</li>
            <li>{tokens}</li>
          </ul>
        </span>
      </div>
      <Settings />
    </div>
  );
}

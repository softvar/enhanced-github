import React from 'react';
import Settings from './Settings';
export default function Account() {
  let name = 'Louis';
  let email = 'louis@gmail.com';
  let tokens = '100,000 nix';

  return (
    <div className="content flex-col">
      <span className="bigText">Account</span>
      <div className="profile items-center">
        <span src="" className="profilePicture"></span>
        <span>
          <ul>
            <li className="bold">{name}</li>
            <li className="secondary">{email}</li>
            <li>{tokens}</li>
          </ul>
        </span>
      </div>

      <div className="data">
        <span>Live Data on Current Repo</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,32L84.7,192L169.4,160L254.1,224L338.8,96L423.5,160L508.2,192L592.9,256L677.6,0L762.4,96L847.1,288L931.8,64L1016.5,224L1101.2,288L1185.9,192L1270.6,32L1355.3,128L1440,0L1440,320L1355.3,320L1270.6,320L1185.9,320L1101.2,320L1016.5,320L931.8,320L847.1,320L762.4,320L677.6,320L592.9,320L508.2,320L423.5,320L338.8,320L254.1,320L169.4,320L84.7,320L0,320Z"
          ></path>
        </svg>
      </div>
      <Settings />
    </div>
  );
}

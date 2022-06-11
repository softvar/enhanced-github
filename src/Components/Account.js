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
            fill="#a2d9ff"
            fill-opacity="1"
            d="M0,192L90,0L180,288L270,160L360,224L450,160L540,224L630,96L720,128L810,96L900,32L990,32L1080,160L1170,96L1260,224L1350,192L1440,64L1440,320L1350,320L1260,320L1170,320L1080,320L990,320L900,320L810,320L720,320L630,320L540,320L450,320L360,320L270,320L180,320L90,320L0,320Z"
          ></path>
        </svg>
      </div>
      <Settings />
    </div>
  );
}

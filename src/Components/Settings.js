import React from 'react';
import '../index.css';
export default function Settings() {
  return (
    <div>
      <div className="settings">
        <span className="bold">Account Settings</span>
        <ul>
          <li className="settingsCard">
            <div>
              <span>Personal Information</span>
              <p>Change your account information</p>
            </div>
            <div>
              <img src="../../icons/rightarrow.png" />
            </div>
          </li>
          <li className="settingsCard">
            <div>
              <span>Privacy</span>
              <p>Manage your privacy settings</p>
            </div>
            <div>
              <img src="../../icons/rightarrow.png" />
            </div>
          </li>
          <li className="settingsCard">
            <div>
              <span>Log Out</span>
            </div>
            <div>
              <img src="../../icons/rightarrow.png" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

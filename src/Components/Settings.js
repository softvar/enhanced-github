import React from 'react';
import { Navigate } from 'react-router-dom';
import { logoutUser } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = e => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/popup.html');
  };
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
          <li className="settingsCard" onClick={e => logoutHandler(e)}>
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

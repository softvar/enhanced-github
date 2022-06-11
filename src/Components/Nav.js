import React from 'react';
import '../index.css';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Nav() {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <span className="navIcon">
        <span>
          <img src="../icons/search.png" />
        </span>
        <span>Search</span>
      </span>
      <span className="navIcon">
        <span>
          <img src="../icons/community.png" />
        </span>
        <span>Community</span>
      </span>
      <span className="navIcon">
        <span>
          <img src="../icons/transfer.png" />
        </span>
        <span>Transfer</span>
      </span>

      <span className="navIcon" onClick={() => navigate('/account')}>
        <span>
          <img src="../icons/account.png" />
        </span>
        Account
      </span>
    </div>
  );
}

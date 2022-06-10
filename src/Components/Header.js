import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img src="../../icons/turbo-src48.png" onClick={e => navigate('popup.html')} className="headerIcon" />
      <span className="support">
        <img src="../icons/help.png" /> Get Help
      </span>
    </div>
  );
}

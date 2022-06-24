import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Header() {
  const user = useSelector(state => state.auth.user);
  let avatar = user?.avatar_url || null;
  const navigate = useNavigate();
  return (
    <div className="header">
      <img src="../../icons/turbo-src48.png" onClick={e => navigate('home')} className="headerIcon" />
      {/* <span className="support">
        <img src="../icons/help.png" /> Get Help
      </span> */}
      <img src={avatar} className="profilePictureSmall" onClick={() => navigate('/account')}></img>
    </div>
  );
}

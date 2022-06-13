import React from 'react';
import LoginGithub from 'react-login-github';
import '../index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);
export default function Auth(props) {
  const navigate = useNavigate();
  const clickHandler = e => {
    e.preventDefault();
    navigate('/onboard');
  };
  return (
    <div className="content items-center">
      <div className="auth">
        <form>
          <span onClick={e => clickHandler(e)} className="login items-center">
            <img src="../icons/github.png" />
            Continue with Github
          </span>

          <span className="items-center bold light">
            <div className="line"></div>
            or
            <div className="line"></div>
          </span>
          <span className="items-center">
            <label htmlFor="name">Continue with just your name instead:</label>
          </span>

          <input type="text" name="name"></input>
          <span className="items-center">
            <Link to="/onboard">
              <button type="button" className="startButton">
                Start
              </button>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

import React from 'react';
import LoginGithub from 'react-login-github';
import '../index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);
export default function Auth() {
  const navigate = useNavigate();
  const clickHandler = e => {
    e.preventDefault();
    navigate('/create');
  };
  return (
    <div className="auth content">
      <form>
        <span onClick={e => clickHandler(e)} className="login">
          Login with Github
          <img src="../icons/github.png" />
        </span>

        <span className="items-center bold">or</span>
        <span className="items-center">
          <label htmlFor="name">Continue with just your name instead:</label>
        </span>
        <span>
          <input type="text" name="name"></input>
          <Link to="/create">
            <button type="button" className="startButton">
              Start
            </button>
          </Link>
        </span>
      </form>
    </div>
  );
}

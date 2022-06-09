import React from 'react';
import LoginGithub from 'react-login-github';
import '../index.css';
import { Link } from 'react-router-dom';
const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);
export default function Auth() {
  return (
    <div className="auth">
      <div>
        <Link to="/create">
          <button type="button" className="login">
            Login with Github
          </button>
        </Link>
      </div>
      <div>
        <form>
          <label htmlFor="name">Continue with just your name instead:</label>
          <input type="text" name="name"></input>
          <Link to="/create">
            <button type="button" className="startButton">
              Start
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

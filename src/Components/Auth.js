import React from 'react';
import LoginGithub from 'react-login-github';
import '../index.css';
const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);
export default function Auth() {
  return (
    <div className="auth">
      <LoginGithub clientId="ac56fad434a3a3c1561e" onSuccess={onSuccess} onFailure={onFailure} className="login">
        <img src="../../icons/turbo-src16.png" />
      </LoginGithub>
    </div>
  );
}

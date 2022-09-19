import React from 'react';

export default function Login() {
  return (
    <div className="">
      <a
        href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GITHUB_CLIENT_ID}`}
        className=""
        target="_blank"
      >
        <span className="login items-center">
          <img src="../icons/github.png" />
          Continue with Github
        </span>
      </a>
    </div>
  );
}

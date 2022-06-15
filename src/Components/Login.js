import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Login() {
  let user = useSelector(state => state.user);

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

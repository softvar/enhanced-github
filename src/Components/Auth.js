import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/auth';
import { useEffect, useState } from 'react';
import Login from './Login';
import { setAuth } from '../store/auth';
export default function Auth(props) {
  let auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="content items-center">
      <div className="auth">
        <form>
          <Login />
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

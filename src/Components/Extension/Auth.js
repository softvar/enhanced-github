import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

export default function Auth() {
  return (
    <div className="content items-center">
      <div className="auth">
        <form>
          <Login />
        </form>
      </div>
    </div>
  );
}

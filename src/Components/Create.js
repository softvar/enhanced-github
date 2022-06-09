import React from 'react';
import { Link } from 'react-router-dom';

export default function Create() {
  return (
    <div className="create">
      <span className="bigText">Create Tokens for Nixpkgs</span>
      <form name="tokens">
        <label htmlFor="amount">How many tokens would you like to create?</label>
        <input type="text" name="amount" placeholder="nix"></input>
        <Link to="/apikey">
          <button type="submit" className="startButton">
            Go
          </button>
        </Link>
      </form>
    </div>
  );
}

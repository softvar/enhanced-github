import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Create() {
  const navigate = useNavigate();
  const submitHandler = () => {
    navigate('/apikey');
  };
  return (
    <div className="section content">
      <span className="bigText">Create Tokens for Nixpkgs</span>
      <form name="tokens" onSubmit={() => submitHandler()}>
        <label htmlFor="amount">How many tokens would you like to create?</label>
        <span className="tokensInput">
          <input type="text" name="amount" placeholder="" required></input>
          <label htmlFor="amount">nix</label>
        </span>
        <button type="submit" className="startButton">
          Go
        </button>
      </form>
    </div>
  );
}

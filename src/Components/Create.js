import React from 'react';

export default function Create() {
  return (
    <div className="create">
      <span className="bigText">Create Tokens for Nixpkgs</span>
      <form name="tokens">
        <label htmlFor="amount">How many tokens would you like to create?</label>
        <input type="text" name="amount" placeholder="nix"></input>
      </form>
    </div>
  );
}

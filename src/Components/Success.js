import React from 'react';
import '../index.css';
export default function Success() {
  let props = { amount: 100000, currency: 'nix', repo: 'Nixpkgs' };
  let { amount, currency, repo } = props;

  return (
    <div className="content section">
      <span className="bigText items-center">{`${amount} ${currency}`}</span>

      <span className="items-center">
        <img src="../../icons/success.png" className="success" />
      </span>
      <span className="items-center">{repo} Successfully Tokenized!</span>
    </div>
  );
}

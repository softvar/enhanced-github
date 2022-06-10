import React from 'react';
import '../index.css';
export default function Success() {
  let props = { amount: 100000, currency: 'nix', repo: 'Nixpkgs' };
  let { amount, currency, repo } = props;

  return (
    <div className="section content">
      <span className="bigText">{`${amount} ${currency}`}</span>
      <span>
        <img src="../../icons/success.png" className="success" />
      </span>
      <span className="">{repo} Successfully Tokenized!</span>
    </div>
  );
}

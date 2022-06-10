import React from 'react';
import '../index.css';
export default function Success() {
  let props = { amount: 100000, currency: 'nix', repo: 'Nixpkgs' };
  let { amount, currency, repo } = props;

  return (
    <div className="create">
      <div className="bigText">{`${amount} ${currency}`}</div>
      <div>
        <img src="../../icons/success.png" />
      </div>
      <div className="">{repo} Successfully Tokenized!</div>
    </div>
  );
}

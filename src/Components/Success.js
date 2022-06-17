import React from 'react';
import '../index.css';
export default function Success(props) {
  let { amount, currency, repo } = props;

  return (
    <div className="content  items-center">
      <div className="section">
        <span className="bigText items-center">{`${amount} ${currency}`}</span>
        <span className="items-center">
          <img src="../../icons/success.png" className="success" />
        </span>
        <span className="items-center">{repo} Successfully Tokenized!</span>
      </div>
    </div>
  );
}

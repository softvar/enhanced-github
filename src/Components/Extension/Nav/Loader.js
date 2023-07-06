import React from 'react';
import loaderGif from '../../../loader.gif';
export default function Loader() {
  return (
    <div className="content items-center">
      <div className="section items-center">
        <span className="bigText items-center">Verifying...</span>
        <span className="items-center">
          <img src={loaderGif} className="loader" alt="loading..." />
        </span>
        <span className="items-center">This will just take a second</span>
      </div>
    </div>
  );
}

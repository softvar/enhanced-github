import React from 'react';
import '../index.css';
export default function Loader() {
  return (
    <div className="content items-center">
      <div className="section items-center">
        <span className="bigText items-center">Verifying...</span>
        <img src="../../icons/loader.png" alt="loading..." />
      </div>
    </div>
  );
}

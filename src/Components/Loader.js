import React from 'react';
import '../index.css';
export default function Loader() {
  return (
    <div className="content section items-center">
      <span className="bigText items-center">Verifying...</span>
      <img src="../../icons/loader.png" alt="loading..." />
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  console.log('home render');
  return (
    <div>
      HOME
      <Link to="/auth">Auth</Link>
    </div>
  );
}

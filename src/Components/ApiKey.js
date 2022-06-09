import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
export default function ApiKey() {
  return (
    <div className="create">
      <span className="bigText">Enter ApiKey for Nixpkgs</span>
      <form name="apikey" onSubmit={e => submitHandler(e)}>
        <input type="text" name="apikey" placeholder="ghp_...."></input>
        <Link to="/success">
          <button type="submit" className="startButton">
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
}

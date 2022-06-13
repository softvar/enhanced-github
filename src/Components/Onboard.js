import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../index.css';

export default function Onboard() {
  let name = 'Louis';
  const navigate = useNavigate();
  let [repo, setRepo] = useState('');
  const changeHandler = e => {
    e.preventDefault();
    setRepo(e.target.value);
  };
  const submitHandler = () => {
    navigate('/create');
  };
  return (
    <div className="content items-center">
      <div className="section items-center">
        <span className="bigText items-center">Hello, {name}.</span>

        <form name="repo" onSubmit={() => submitHandler()}>
          <label htmlFor="repo" className="secondary">
            What is the name of the repository you would like to tokenize?
          </label>
          <span className="items-center">
            <input
              type="text"
              name="name"
              placeholder="Repo name"
              onChange={e => changeHandler(e)}
              value={repo}
              required
            ></input>
          </span>
          <span className="items-center">
            <button type="submit" className="startButton items-center">
              Go
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

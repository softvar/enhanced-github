import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../index.css';

export default function Onboard(props = { name: 'Louis' }) {
  let { name } = props;
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
      <div className="section">
        <span className="bigText">Hello, {name}. What is the name of the repository you would like to tokenize?</span>
        <form onSubmit={() => submitHandler()}>
          <input
            className="items-center"
            type="text"
            name="name"
            placeholder="Repo name"
            onChange={e => changeHandler(e)}
            value={repo}
          ></input>
          <button type="submit" className="startButton">
            Go
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import '../index.css';
import { useSelector } from 'react-redux';
import Create from './Create';

export default function Onboard() {
  let user = useSelector(state => state.auth.user);

  let [complete, setComplete] = useState(false);

  let [repo, setRepo] = useState('');

  let firstName = user?.name.split(' ')[0] || null;

  const changeHandler = e => {
    e.preventDefault();
    setRepo(e.target.value);
  };

  const submitHandler = () => {
    setComplete(true);
  };

  if (complete) {
    return <Create repo={repo} />;
  }

  return (
    <div className="content items-center">
      <div className="section items-center">
        <span className="bigText items-center">Hello, {firstName}.</span>

        <form name="repo" onSubmit={() => submitHandler()}>
          <label htmlFor="repo" className="secondary">
            What is the name of the repository you would like to tokenize?
          </label>
          <span className="items-center">
            <input
              type="text"
              name="repo"
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

import React, { useState, useEffect } from 'react';
import '../index.css';
import { useSelector } from 'react-redux';
import Create from './Create';

export default function Onboard() {
  let user = useSelector(state => state.auth.user);

  let [complete, setComplete] = useState(false);

  let [repo, setRepo] = useState('');
  let [disableSelect, setDisableSelect] = useState(false);
  let [disable, setDisable] = useState(false);

  let firstName = user?.name.split(' ')[0] || null;

  const changeHandler = e => {
    e.preventDefault();
    setRepo(e.target.value);
  };

  const selectHandler = e => {
    e.preventDefault();
    setRepo(e.target.value);
    e.target.value ? setDisable(true) : setDisable(false);
  };

  const submitHandler = () => {
    setComplete(true);
  };

  let [data, setData] = useState({ repos: undefined });
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(user?.repos_url)
        .then(res => res.json())
        .then(userData => setData({ repos: userData }))
        .then(() => setLoading(false));
    };

    fetchData();
  }, []);
  console.log(data);
  if (complete) {
    return <Create repo={repo} />;
  }

  return (
    <div className="content items-center">
      <div className="section">
        <span className="bigText items-center">Hello, {firstName}.</span>

        <form name="repo" onSubmit={() => submitHandler()}>
          <label htmlFor="repo" className="secondary">
            Which repository would you like to tokenize?
          </label>
          <span>
            {loading || !data.repos ? (
              <select>
                <option value="">Loading</option>
              </select>
            ) : (
              <select onChange={e => selectHandler(e)}>
                <option value="" selected>
                  Choose from your repositories
                </option>
                {data.repos.map(repo => (
                  <option key={repo.id} value={repo.name}>
                    {repo.name}
                  </option>
                ))}
              </select>
            )}
          </span>

          <span className="">
            <label htmlFor="otherRepo">Or enter the name of the repository instead:</label>
            {disable ? (
              <input type="text" placeholder="Repo name" value="" disabled></input>
            ) : (
              <input
                type="text"
                name="repo"
                placeholder="Repo name"
                onChange={e => changeHandler(e)}
                value={repo}
                required
              ></input>
            )}
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

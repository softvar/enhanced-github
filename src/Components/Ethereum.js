import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { setAuth } from '../store/auth';
import superagent from 'superagent';
export default function Ethereum() {
  let user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [ethereumAddress, setEthereumAddress] = useState('');
  let [ethereumKey, setEthereumKey] = useState('');
  let [loader, setLoader] = useState(false);
  let [errorText, setErrorText] = useState('');

  async function postCreateUser(owner, repo, contributor_id, contributor_name, contributor_signature) {
    superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createUser(owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}") }`,
      })
      .set("accept", "json")
      .end((err, res) => {
        //Calling the end function will send the request
        const json = JSON.parse(res.text);
        return json.data.createUser;
      });
  }

  async function submitHandler(e) {
    e.preventDefault();
    console.log('input', ethereumAddress, user.login, ethereumKey);

    try {
      await postCreateUser('', '', ethereumAddress, user.login, ethereumKey);

      chrome.storage.local.set({ contributor_name: user.login });
      chrome.storage.local.set({ contributor_id: ethereumAddress });
    } catch (error) {
      console.log(error);
    }

    dispatch(setAuth({ ...user, ethereumAddress: ethereumAddress, ethereumKey: ethereumKey }));
    navigate('/onboard');
  }

  const ethereumAddressHandler = e => {
    e.preventDefault();
    setEthereumAddress(e.target.value);
  };
  const ethereumKeyHandler = e => {
    e.preventDefault();
    setEthereumKey(e.target.value);
  };

  return (
    <div className="content items-center">
      <div className="">
        <form name="ethereum" className="ethereum" onSubmit={e => submitHandler(e)}>
          <span className="bigText items-center">Please Enter your Ethereum Address and Key</span>
          <span>{errorText}</span>
          <span className="">
            <label htmlFor="address">Ethereum Address:</label>
            <input
              type="text"
              name="address"
              value={ethereumAddress}
              onChange={e => ethereumAddressHandler(e)}
              required
            ></input>
          </span>

          <span>
            <label htmlFor="key">Ethereum Key:</label>
            <input type="text" name="key" value={ethereumKey} onChange={e => ethereumKeyHandler(e)} required></input>
          </span>

          <span className="items-center">
            <button type="submit" className="startButton">
              Submit
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

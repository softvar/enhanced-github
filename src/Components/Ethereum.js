import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { setAuth } from '../store/auth';
import { postCreateUser } from '../requests';

const port = "http://localhost:4000";

export default function Ethereum() {
  let user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [ethereumAddress, setEthereumAddress] = useState('');
  let [ethereumKey, setEthereumKey] = useState('');
  let [loader, setLoader] = useState(false);
  let [errorText, setErrorText] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    console.log('input', ethereumAddress, user.login, ethereumKey);

    try {
      await postCreateUser('', '', ethereumAddress, user.login, ethereumKey, user.token);

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

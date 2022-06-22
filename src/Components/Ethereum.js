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
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ createUser(owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json')
      .end((err, res) => {
        // Calling the end function will send the request
      });
  }

  async function submitHandler(e) {
    e.preventDefault();
    console.log('input', ethereumAddress, user.login, ethereumKey);
    let data = await postCreateUser('', '', ethereumAddress, user.login, ethereumKey);
    if (!data) {
      setErrorText('There was an Error. Please check your Ethereum information.');
    } else {
      dispatch(setAuth({ ...user, ethereumAddress: ethereumAddress, ethereumKey: ethereumKey }));
      navigate('/onboard');
    }
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

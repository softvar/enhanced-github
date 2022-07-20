import React from 'react';
import { Routes as Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header';
import Auth from './Components/Auth';
import Create from './Components/Create';
import ApiKey from './Components/ApiKey';
import Transfer from './Components/Transfer';
import Success from './Components/Success';
import Nav from './Components/Nav';
import Account from './Components/Account';
import Onboard from './Components/Onboard2';
import Ethereum from './Components/Ethereum';
import Home from './Components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './store/auth';
import { useEffect, useState } from 'react';
import superagent from 'superagent';

export default function Routes() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  //Same values:
  //ethereumAddress === contributor_id
  //ethereumKey === contributor_signature
  async function postGetContributorID(owner, repo, issue_id, contributor_name) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ getContributorID(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_name: "${contributor_name}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json');
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorID;
  }

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

  async function postGetContributorSignature(owner, repo, issue_id, contributor_id) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ getContributorSignature(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json');
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    console.log(json);
    return json.data.getContributorSignature;
  }

  let [user, setUser] = useState('');

  useEffect(() => {
    if (auth.isLoggedIn) {
      return;
    }
    chrome.storage.local.get(['githubUser'], data => setUser(data.githubUser));
  });

  useEffect(() => {
    const getContributorId = async function(githubUsername) {
      return await postGetContributorID('', '', '', githubUsername).then(res => res);
    };

    const getContributorSignature = async function(contributorId) {
      return await postGetContributorSignature('', '', '', contributorId).then(res => res);
    };

    if (auth.isLoggedIn === true && auth.user.ethereumAddress !== 'none' && auth.user.ethereumKey !== 'none') {
      return;
    } else if (user) {
      let githubUser = JSON.parse(user);
      //If turbo-src service server is running use following:
      getContributorId(githubUser.login)
        .then(res => (githubUser.ethereumAddress = res || 'none'))
        .then(() =>
          getContributorSignature(githubUser.ethereumAddress).then(key => (githubUser.ethereumKey = key || 'none'))
        );
      dispatch(setAuth(githubUser));
    }
  }, [user]);
  console.log('user', auth.user.login, auth.user.ethereumAddress, auth.user.ethereumKey);
  return auth.isLoggedIn ? (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/popup.html" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/ethereum" element={<Ethereum />} />
          <Route exact path="/settings" element={<Account />} />
          <Route exact path="/onboard" element={<Onboard />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/apikey" element={<ApiKey />} />
          <Route exact path="/transfer" element={<Transfer />} />
          <Route exact path="/success" element={<Success />} />
        </Switch>
        <Nav />
      </div>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/popup.html" element={<Auth />} />
          <Route exact path="/home" element={<Auth />} />
          <Route exact path="/onboard" element={<Onboard />} />
          <Route exact path="/account" element={<Auth />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/apikey" element={<ApiKey />} />
          <Route exact path="/transfer" element={<Transfer />} />
          <Route exact path="/success" element={<Success />} />
        </Switch>
        <Nav />
      </div>
    </BrowserRouter>
  );
}

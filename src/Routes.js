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
import Onboard from './Components/Onboard';
import Home from './Components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './store/auth';
import { useEffect } from 'react';
import superagent from 'superagent';
export default function Routes() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  async function postGetContributorName(owner, repo, issue_id, contributor_id, side) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ getContributorName(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json');
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    console.log('gqlr 123');
    console.log(text);
    const json = JSON.parse(res.text);
    console.log(json);
    return json.data.getContributorName;
  }

  useEffect(() => {
    const contributorName = async function(name) {
      //Need contributor_id => blockchain address
      let user = await postGetContributorName('', '', '', name, '');
      if (user === 'none') {
        //Need contributor_id => blockchain address
        user = await postCreateUser('', '', githubUser.login, githubUser.login, '');
      }
      console.log('=>', user);
      return user;
    };

    if (auth.isLoggedIn === true) {
      return;
    } else if (localStorage.getItem('user')) {
      let githubUser = JSON.parse(localStorage.getItem('user'));
      //Needs to be contributor_id
      // contributorName(githubUser.login);

      dispatch(setAuth(githubUser));
    }
  }, []);

  return auth.isLoggedIn ? (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/popup.html" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
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

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import superagent from 'superagent';
export default function Home(props) {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;

  let [tokens, setTokens] = useState('');
  let avatar = user?.avatar_url || null;

  let [repo, setRepo] = useState('');
  let [owner, setOwner] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['repo'], data => setRepo(data.repo));
    chrome.storage.local.get(['owner'], data => setOwner(data.owner));
  });

  async function get_repo_status(repo_id) {
    return await superagent
      .post('http://localhost:4000/graphql')
      .send({ query: `{ getRepoStatus(repo_id: "${repo_id}") }` })
      .set('accept', 'json');
    //.end((err, res) => {
    //  //console.log(repo_id)
    //  //console.log('hey')
    //  //console.log('res: ' + res['body']['data']['getRepoStatus'])
    //  //const text= res['text'];
    //  //console.log(text);
    //  //isRepoTurboSrcToken = res;
    //  // Calling the end function will send the request
    //  return res
    //})
  }
  async function postGetContributorTokenAmount(owner, repo, issue_id, contributor_id, side) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ getContributorTokenAmount(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json');
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    console.log(json);
    return json.data.getContributorTokenAmount;
  }

  let [tokenized, setTokenized] = useState(false);

  useEffect(() => {
    const getRepoStatus = async id => {
      await get_repo_status(id).then(res => setTokenized(res?.body.data.getRepoStatus));
    };

    getRepoStatus(`${owner}/${repo}`);
  });
  console.log('tokenized', tokenized);
  useEffect(() => {
    const getTokenAmount = async () => {
      await postGetContributorTokenAmount(owner, repo, '', user.ethereumAddress, '').then(res => setTokens(res));
    };
    getTokenAmount();
  }, [repo, owner]);

  return (
    <div className="content">
      <div className="home">
        <section>
          <div className="repo">
            <span>
              <img src="../icons/repository.png" />{' '}
            </span>
            <span className="repoOwner">
              <a href={`https://github.com/JeffreyLWood/${owner}`} target="_blank">
                {owner}
              </a>
            </span>
            <span>{' / '}</span>
            <span className="repoName">
              <a href={`https://github.com/${owner}/${repo}`} target="_blank">
                {repo}
              </a>
            </span>
          </div>
          <span className="repoTokens">
            <span>
              <img src="../icons/tokens.png" />
            </span>
            {tokens} tokens
          </span>

          <div className="data">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#a2d9ff"
                fill-opacity="1"
                d="M0,192L90,0L180,288L270,160L360,224L450,160L540,224L630,96L720,128L810,96L900,32L990,32L1080,160L1170,96L1260,224L1350,192L1440,64L1440,320L1350,320L1260,320L1170,320L1080,320L990,320L900,320L810,320L720,320L630,320L540,320L450,320L360,320L270,320L180,320L90,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div>
            <span className="items-center">
              <button type="button" className="homeButton">
                Trade
              </button>
              <button type="button" className="homeButton">
                Transfer
              </button>
            </span>
          </div>
        </section>
        {tokenized ? null : (
          <div>
            <button type="button" className="createButton" onClick={() => navigate('/onboard')}>
              <img src="../../icons/turbo-src48.png" />
              Tokenize {repo}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

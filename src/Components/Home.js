import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import superagent from 'superagent';
import { postGetContributorTokenAmount, getRepoStatus } from '../requests';
import useCommas from '../hooks/useCommas';
const port = process.env.PORT || 'http://localhost:4000';

export default function Home(props) {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;

  let [tokenAmount, setTokenAmount] = useState('');

  let avatar = user?.avatar_url || null;

  let [repo, setRepo] = useState('');
  let [owner, setOwner] = useState('');

  useEffect(() => {
    //Get repo/owner from current browser window
    chrome.storage.local.get(['repo'], data => setRepo(data.repo));
    chrome.storage.local.get(['owner'], data => setOwner(data.owner));

    //Set current logged in contributor/id to chrome storage for inject to verify user for voting
    chrome.storage.local.set({ contributor_name: user.login });
    chrome.storage.local.set({ contributor_id: user.ethereumAddress });
  });

  let [tokenized, setTokenized] = useState(false);

  useEffect(() => {
    const useGetRepoStatus = async id => {
      await getRepoStatus(id).then(res => setTokenized(res.exists));
    };

    useGetRepoStatus(`${owner}/${repo}`);
  }, [owner, repo, tokenized]);

  useEffect(() => {
    const getTokenAmount = async () => {
      await postGetContributorTokenAmount(owner, repo, '', user.ethereumAddress, '')
        .then(res => useCommas(res.amount))
        .then(tokens => setTokenAmount(tokens));
    };
    getTokenAmount();
  });

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
          {tokenized ? (
            <span className="repoTokens">
              <span>
                <img src="../icons/tokens.png" />
              </span>
              {tokenAmount || 0} tokens
            </span>
          ) : null}

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

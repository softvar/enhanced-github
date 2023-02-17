import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import superagent from 'superagent';
import { postGetContributorTokenAmount, getRepoStatus } from '../requests';
import useCommas from '../hooks/useCommas';
const port = process.env.PORT || 'http://localhost:4000';

export default function Home() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name)
  const owner = useSelector(state => state.repo.owner.login)
  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;

  let [tokenAmount, setTokenAmount] = useState('');

  let avatar = user?.avatar_url || null;

  useEffect(() => {
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
      await postGetContributorTokenAmount(owner, repo, '', user.ethereumAddress, '', user.token)
        .then(res => useCommas(res.amount))
        .then(tokens => setTokenAmount(tokens));
    };
    setTimeout(()=>{
      getTokenAmount()
    }, 500)
  });

  if(owner === 'none' && repo === 'none') {
    return (
      <div className="content">
      <div className="home">
        <section>
          <div className="votePower">
            Please visit a Github repo page in your browser to use Turbosrc.           
          </div>
        </section>
      </div>
    </div>
    )
  }

  return (
    <div className="content">
      <div className="home">
        <section>
          <div className="repo">
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
          {tokenized ? 
            <span className="votePower">
            {tokenAmount === 0 ?
              'You do not have votepower in this project.'
              : `${tokenAmount} votepower`}
            </span>
            : null}
          <div className="votePower">
            {tokenized ? `` : `${owner}/${repo} is not on turbosrc.`}
          </div>
        </section>
        <div className="data"></div>
        {tokenized ? null : (
          <div className="centeredWrapper">
            <button type="button" className="createButton" onClick={() => navigate('/onboard')}>
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

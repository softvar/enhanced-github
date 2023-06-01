import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import superagent from 'superagent';
import { postGetContributorTokenAmount, getRepoStatus, postGetRepoData } from '../requests';
import useCommas from '../hooks/useCommas';
import styled from 'styled-components';
import PullRequestRow from './PullRequestRow.js';

const VoteText = styled.span`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
color: black;
`;

const VotePower = styled(VoteText)`
font-weight: 500; 
font-size: 14px;
margin-bottom: 0px;
color: #4A00BA;
background: #E7F0FF;
padding: 5px 8px;
letter-spacing: .2px;
`;

const BoldText = styled(VoteText)`
font-weight: 700;
font-size: 26px;
margin-bottom: 0px;
`;

const TopBar = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;


const OwnerRepo = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 10px;
`;

const OwnerText = styled(VoteText)`
font-weight: 500;
font-size: 26px;
margin-bottom: 0px;
`;

const Data = styled.div`
width: 100%;
height: 100%;
overflow-y: auto;
`;

const Content = styled.div`
height: 27rem;
display: flex;
flex-direction: column;
justify-content: center;
overflow-y: auto;
overflow-x: hidden;
padding: 0.5rem;
`;

const DataHeading = styled.div`
display: grid;
grid-template-columns: 20% 60% 10% 10%;
`;

const PullRequestHeading = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
font-weight: 600;
color: black;

`;

const port = process.env.PORT || 'http://localhost:4000';

export default function Home() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name)
  const owner = useSelector(state => state.repo.owner.login)
  const [pullRequests, setPullRequests] = useState([]);
  const [res, setRes] = useState({});
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

  const getRepoDataHandler = async () => {
    try {
      const response = await postGetRepoData(`${owner}/${repo}`, user.ethereumAddress).then(res => {
        setPullRequests(res.pullRequests);
        setRes(res);
        console.log('resHandler:', res);
      });
      console.log('getRepoData response:', response);
    } catch (error) {
      console.error('Error fetching repo data:', error);
    }
  };
  

useEffect(() => {
  setTimeout(()=>{getRepoDataHandler()}, 500)
  console.log('trying to see if this works:', pullRequests);
}, [owner, repo]);
console.log('pullRequests:', pullRequests);
console.log('res:', res);

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
    <Content>
      <div className="home">
        <section>
          <TopBar>
            <OwnerRepo>
                <OwnerText>
                  <a href={`https://github.com/JeffreyLWood/${owner}`} target="_blank">
                    {owner}
                  </a> /
                  </OwnerText>
                  <BoldText> <a href={`https://github.com/${owner}/${repo}`} target="_blank">
                {repo}
              </a></BoldText>
            </OwnerRepo>
            {tokenized ? 
            <VotePower>
            {tokenAmount === 0 ?
              'You do not have votepower in this project.'
              : `${tokenAmount} votepower`}
            </VotePower>
            : null}
          </TopBar>
          
          
          {!tokenized && (
            <div className="votePower">
              {`${owner}/${repo} is not on turbosrc.`}
            </div>
          )}
        </section>
        <DataHeading>
          <PullRequestHeading>Status</PullRequestHeading>
          <PullRequestHeading>Pull Request</PullRequestHeading>
          <PullRequestHeading>Yes</PullRequestHeading>
          <PullRequestHeading>No</PullRequestHeading>
        </DataHeading>
        {tokenized && (
          <Data>
            {pullRequests.map((pr, index) => (
                <PullRequestRow 
                state={pr.state} 
                yes={Math.floor(pr.voteData.voteTotals.yesPercent*100)}
                no={Math.floor(pr.voteData.voteTotals.noPercent*100)} 
                forkBranch={pr.forkBranch}
                key={pr.forkBranch}
                index={index}
                />
            ))}
          </Data>
          )}
        {tokenized ? null : (
          <div className="centeredWrapper">
            <button type="button" className="createButton" onClick={() => navigate('/onboard')}>
              Create
            </button>
          </div>
        )}
      </div>
    </Content>
  );
}

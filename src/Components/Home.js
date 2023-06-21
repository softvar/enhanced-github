import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import superagent from 'superagent';
import { postGetRepoData } from '../requests';
import useCommas from '../hooks/useCommas';
import styled from 'styled-components';
import PullRequestRow from './PullRequestRow.js';
import ArrowRight from '../../icons/arrowright.png';
import BackArrow from '../../icons/back.png';
import SkeletonHome from './SkeletonHome.js';
import SkeletonExt from './SkeletonExt';
import ExtensionModalVote from './ExtensionModalVote';
import { set } from '../utils/storageUtil';
const { 
  postGetVotes  
} = require('../requests');

const VoteText = styled.span`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
color: black;
`;

const ArrowPic = styled.img`
width: 13px;
height: 13px;
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

const NotOwnRepo = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap');
  font-family: 'Roboto Mono', monospace;
  font-weight: 300;
  font-size: 14px;
  letter-spacing: .2px;
  text-align:center;
  position: relative;
  top: 150px;
`;
const CenteredWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 30px auto;
  gap: 50px;
  flex-direction: column;
`;

const CreateRepo = styled.span`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap');
font-family: 'Roboto Mono', monospace;
font-weight: 300;
font-size: 14px;
color: #001AFF;
background-color:#e5eefd;
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

const RepoButton = styled.button`
  background-color: #313131;
  color: white;
  width: 200px;
  height: 50px;
  border: none;
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  display:flex;
  justify-content: center;
  align-items: center;
  gap:5px;
  `;

  const GithubLink = styled.a`
  color: black;
  `;

  const CreateNotice = styled.span`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
font-weight: 400;
font-size:14px;
color: black;
text-align: center;
margin: 1rem auto;
line-height: 1.8;
`;

  const BtnSpan = styled.span`
text-align: center;
`;

const Back = styled(PullRequestHeading)`
  font-weight:500;
  
`;

const BackButton = styled.span`
position: relative;
top: 65px;
left: 30px;
margin-top: -20px;
display: flex;
align-items: center;
gap: 3px;
cursor: pointer;
`

const port = process.env.PORT || 'http://localhost:4000';

export default function Home() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name)
  const owner = useSelector(state => state.repo.owner.login)
  const [pullRequests, setPullRequests] = useState([]);
  const [response, setResponse] = useState({});
  const [tokenized, setTokenized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contributorID, setContributorID] = useState('');
  const [seeModal, setSeeModal] = useState(false);
  const [pullRequestsLoaded, setPullRequestsLoaded] = useState(false);
  const [selectedPullRequest, setSelectedPullRequest] = useState(null);
  const [selectedPullRequestID, setSelectedPullRequestID] = useState('');
  const [selectedPullRequestVotesArray, setSelectedPullRequestVotesArray] = useState([]);
  const [selectedPullRequestState, setSelectedPullRequestState] = useState('');
  const [selectedPullRequestYes, setSelectedPullRequestYes] = useState(0);
  const [selectedPullRequestNo, setSelectedPullRequestNo] = useState(0);
  const [selectedPullRequestBaseBranch, setSelectedPullRequestBaseBranch] = useState('');
  const [selectedPullRequestForkBranch, setSelectedPullRequestForkBranch] = useState('');
  const [selectedPullRequestNoVotes, setSelectedPullRequestNoVotes] = useState(0);
  const [selectedPullRequestYesVotes, setSelectedPullRequestYesVotes] = useState(0);
  const [selectedPullRequestCreatedAt, setSelectedPullRequestCreatedAt] = useState('');
  const [selectedPullRequestVotePower, setSelectedPullRequestVotePower] = useState(0);
  const [selectedPullRequestVoted, setSelectedPullRequestVoted] = useState(false);


  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;

  let [tokenAmount, setTokenAmount] = useState('');

  let avatar = user?.avatar_url || null;

  useEffect(() => {
    //Set current logged in contributor/id to chrome storage for inject to verify user for voting
    chrome.storage.local.set({ contributor_name: user.login });
    chrome.storage.local.set({ contributor_id: user.ethereumAddress });
    setTimeout(() => setLoading(false), 1500);
    setContributorID(user.ethereumAddress);
    let contributor_id = user.ethereumAddress;
    console.log(contributor_id);
    //setLoading(true);
  });

  const handlePullRequestClick = (pullRequest) => {
    console.log("yes hello this is working");
    setSelectedPullRequest(pullRequest);
    setSelectedPullRequestID(pullRequest.repo_id);
    setSelectedPullRequestVotesArray(pullRequest.voteData.votes);
    setSelectedPullRequestState(pullRequest.state);
    setSelectedPullRequestBaseBranch(pullRequest.baseBranch);
    setSelectedPullRequestForkBranch(pullRequest.forkBranch);
    setSelectedPullRequestYes(Math.floor(pullRequest.voteData.voteTotals.yesPercent * 100));
    setSelectedPullRequestNo(Math.floor(pullRequest.voteData.voteTotals.noPercent * 100));
    setSelectedPullRequestYesVotes(pullRequest.voteData.voteTotals.yes);
    setSelectedPullRequestNoVotes(pullRequest.voteData.voteTotals.no);
    setSelectedPullRequestCreatedAt(pullRequest.voteData.contributor.createdAt);
    setSelectedPullRequestVotePower(pullRequest.voteData.contributor.votePower);
    setSelectedPullRequestVoted(pullRequest.voteData.voted);

    setSeeModal(true);
  };
  

  const getRepoDataHandler = async () => {
    try {
      const response = await postGetRepoData(`${owner}/${repo}`, user.ethereumAddress).then(res => {
        if (res != null || res != undefined){
          setTokenized(true);
        }
        setPullRequests(res.pullRequests);
        setResponse(res);
        
        let tokens = useCommas(res.contributor.votePower);
        setTokenAmount(tokens);
      });
      console.log('getRepoData response:', response);
    } catch (error) {
      console.error('Error fetching repo data:', error);
    }
  };
/*
  const modalView = (repo_id, issue_id, contributor_id) => {
    let getVotes = async () => await postGetVotes(repo_id, issue_id, contributor_id);
    
  } */

useEffect(() => {
  setTimeout(()=>{getRepoDataHandler()}, 500)
  console.log("is this on?");
  setPullRequestsLoaded(true);
  console.log(pullRequestsLoaded + "aoiegoienargpiuenrga");
  console.log('pullRequests:', pullRequests);
}, [owner, repo]);

let getVotes = async () => await postGetVotes(repo_id, issue_id, contributor_id);
if(owner === 'none' && repo === 'none') {
    return (
      <div className="content">
      <div className="home">
        <section>
          <NotOwnRepo>
            Please visit a Github repo page in your browser to use Turbosrc.           
          </NotOwnRepo>
        </section>
      </div>
    </div>
    )
  }
  switch (seeModal) {
    case true:
      return pullRequestsLoaded ? (
        <>
          <BackButton onClick={() => setSeeModal(false)}>
            <img src={BackArrow} alt="back arrow" />
            <Back>Back to all</Back>
          </BackButton>
          <ExtensionModalVote pullRequests={selectedPullRequest} 
            repo_id={selectedPullRequestID}
            votesArray={selectedPullRequestVotesArray}
            state={selectedPullRequestState}
            baseBranch={selectedPullRequestBaseBranch}
            forkBranch={selectedPullRequestForkBranch}
            yes={selectedPullRequestYes}
            no={selectedPullRequestNo}
            yesVotes={selectedPullRequestYesVotes}
            noVotes={selectedPullRequestNoVotes}
            createdAt={selectedPullRequestCreatedAt}
            votePower={selectedPullRequestVotePower}
            voted={selectedPullRequestVoted}

          />
        </>
      ) : <SkeletonExt/>;
    case false:
      return (
        <Content>
          <div className="home">
            <section>
              <TopBar>
                <OwnerRepo>
                  <OwnerText>
                    <GithubLink href={`https://github.com/JeffreyLWood/${owner}`} target="_blank">
                      {owner}
                    </GithubLink> /
                  </OwnerText>
                  <BoldText> 
                    <GithubLink href={`https://github.com/${owner}/${repo}`} target="_blank">
                      {repo}
                    </GithubLink>
                  </BoldText>
                </OwnerRepo>
                {tokenized ? 
                  <VotePower>
                    {tokenAmount === 0 ?
                      'You do not have votepower in this project.'
                      : `${tokenAmount} votepower`}
                  </VotePower>
                  : null}
              </TopBar>
            </section>
            {tokenized && (
              <DataHeading>
                <PullRequestHeading>Status</PullRequestHeading>
                <PullRequestHeading>Pull Request</PullRequestHeading>
                <PullRequestHeading>Yes</PullRequestHeading>
                <PullRequestHeading>No</PullRequestHeading>
              </DataHeading>
            )}
            {tokenized && (
              <Data>
                {pullRequests.map((pr, index) => (
                  <div onClick={() => handlePullRequestClick(pr)}> 
                    <PullRequestRow 
                      state={pr.state} 
                      yes={Math.floor(pr.voteData.voteTotals.yesPercent * 100)}
                      no={Math.floor(pr.voteData.voteTotals.noPercent * 100)} 
                      forkBranch={pr.forkBranch}
                      key={pr.forkBranch}
                      index={index}
                      role="button" // Add role="button" to make it clickable
                      tabIndex={0}
                    />
                  </div>
                ))}
              </Data>
            )}
            {tokenized ? null : (
              loading ? (<SkeletonHome />) : (
                <CenteredWrapper>
                  <CreateNotice>
                    If you are the maintainer of <CreateRepo>{owner}/{repo}</CreateRepo> you can add it to Turbosrc
                  </CreateNotice>
                  <RepoButton type="button" onClick={() => navigate('/onboard')}>
                    <p>Continue</p> <ArrowPic src={ArrowRight} />
                  </RepoButton>
                </CenteredWrapper>
              )
            )}
          </div>
        </Content>
      );
    default:
      return null;
  }
  
}

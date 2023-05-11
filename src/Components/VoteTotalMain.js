import React, { useState, useEffect } from 'react';
import { postSetVote, postGetPullRequest, postGetPRvoteYesTotals, postGetPRvoteNoTotals, postGetPRvoteTotals, postCreateRepo, postNewPullRequest, postGetContributorID, postGetContributorName, getGitHubPullRequest } from '../requests';
import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';


const VoteText = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
/* Regular = 400, Medium = 500, SemiBold = 600, Bold = 700 */
font-family: 'Inter', sans-serif;
color: black;
`;

const OwnerText = styled(VoteText)`
font-weight: 500;
font-size: 27px;
margin-bottom: 0px;
`

const PullRequestTitle = styled(VoteText)`
font-weight: 600;
color: #656565;
font-size: 12px;
text-align: left;
margin-bottom: 0px;
`;

const MediumText = styled(VoteText)`
font-weight: 500;
font-size: 14px;
margin-bottom: 0px;

`;

const BoldText = styled(VoteText)`
font-weight: 700;
font-size: 27px;
margin-bottom: 0px;

`;

const VoteTopicText = styled(VoteText)`
font-weight: 400;
font-size: 12px;
color: #6A6868;
text-align:left;
margin-bottom: 0px;

`;

const Slash = styled(VoteTopicText)`
  font-size: 27px;
`;

const TopModalTitle = styled.div`
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

function VoteTotalMain(props) {
  const { user, repo, issueID, contributorID, contributorName, side, title, baseBranch, forkBranch, votePower } = props;


  const handleClick = (e) => {
  };
  return (
    <div>
      <div className='name'>
        <TopModalTitle>
          <OwnerRepo>
            <OwnerText>{user}</OwnerText><Slash>/</Slash><BoldText> {repo}</BoldText>
            
          </OwnerRepo>
          <MediumText>{votePower} VotePower</MediumText>
        </TopModalTitle>
        <PullRequestTitle>{title}</PullRequestTitle>
        <VoteTopicText>{forkBranch} into {baseBranch}</VoteTopicText>
      </div>
      
      
    </div>
  );
}
// progress bar code
// uninstall npm pckgs


export default VoteTotalMain;

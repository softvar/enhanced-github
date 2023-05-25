import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tsrclogo from './tsrclogo.png';


const Logo = styled.div`
  background-image: url(${tsrclogo});
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;


const VoteText = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
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
font-size: 14px;
text-align: left;
margin-bottom: 0px;
`;

const MediumText = styled(VoteText)`
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
font-size: 27px;
margin-bottom: 0px;
`;

const VoteTopicText = styled(VoteText)`
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&display=swap');
font-family: 'Fira Code', monospace;
font-weight: 300;
font-size: 12px;
text-align:left;
margin-bottom: 0px;
color: #0500FF;
display: flex;
flex-direction: row;
gap:5px;
letter-spacing: .5px;
`;

const VoteTopicNormalText = styled.span`
color: #6A6868;
`;

const Slash = styled(VoteTopicText)`
  font-size: 27px;
  color:black;
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

const VotedStatus = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin: 0 auto;
`

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
        <VoteTopicText>{forkBranch} <VoteTopicNormalText>into</VoteTopicNormalText> {baseBranch}</VoteTopicText>

      </div>
      
      
    </div>
  );
}


export default VoteTotalMain;

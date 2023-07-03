import React from 'react';
import styled from 'styled-components';

const Heading = styled.div`
height: 80px;
display: flex;
flex-direction: column;
`
const VoteText = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
color: black;
`;

const OwnerText = styled(VoteText)`
font-weight: 500;
font-size: 26px;
margin-bottom: 0px;
`;

const PullRequestTitle = styled(VoteText)`
font-weight: 600;
letter-spacing: .1px;
color: #656565;
font-size: 12px;
text-align: left;
margin-bottom: 0px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: 380px;
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

const VoteTopicText = styled(VoteText)`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap');
font-family: 'Roboto Mono', monospace;
font-weight: 300;
font-size: 12px;
line-height: 20px;
text-align:left;
color: #0500FF;
display: flex;
flex-direction: row;
gap:5px;
letter-spacing: .2px;
`;

const VoteTopicNormalText = styled.span`
color: #6A6868;
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

function addCommas(num) {

  if (num === 0) {
    return "0";
  }

  // convert the number to a string
  let numStr = num.toString();

  // split the string into an array of characters
  let numArr = numStr.split("");

  // determine the position of the first comma
  let firstCommaPos = numArr.length > 3 ? numArr.length % 3 || 3 : 0;

  // add commas after every third digit starting from the first comma position
  for (let i = firstCommaPos; i < numArr.length; i += 4) {
    numArr.splice(i, 0, ",");
  }

  // join the array of characters back into a string
  return numArr.join("");
} 

function VoteTotal(props) {
  const {repo, title, baseBranch, forkBranch, votePower} = props;

  return (
    <Heading>
        <TopModalTitle>
          <OwnerRepo>
          <OwnerText>{repo} </OwnerText>
          </OwnerRepo>
          <MediumText>{addCommas(votePower)} VotePower</MediumText>
        </TopModalTitle>
        <PullRequestTitle>{title}</PullRequestTitle>
        <VoteTopicText>{forkBranch} <VoteTopicNormalText>into</VoteTopicNormalText> {baseBranch}</VoteTopicText>
    </Heading>
  );
}

export default VoteTotal;

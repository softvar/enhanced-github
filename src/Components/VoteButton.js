import React, { useState } from 'react';
import { postSetVote } from '../requests';
import styled from 'styled-components';

const Vote = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 

    background-color: ${props => props.$option ? "#038800" : "#D33131"};
    border: 0px solid green;
    color: white; 
    padding: 10px 34px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side - Still needed ? */
    margin: 1rem;
    font-family: 'Inter', sans-serif;
    font-size:24px;
    border-radius: 5px;
    `;

function VoteButton(props) {
  const [voted, setVoted] = useState('');
  const [lastIssueId, setLastIssueId] = useState('');
  const [side, setSide] = useState(props.side);

  if (voted === 'pull' && props.issueID === lastIssueId) {
    return 'Verifying. This may take a few a couple minutes...';
  }
  if (voted === 'problem' && props.issueID === lastIssueId) {
    return 'Something went wrong';
  }
  if (voted === 'notOnGithub' && props.issueID === lastIssueId) {
    return "Pull request isn't valid on github (path to fork doesn't exist).";
  }
  if (voted === 'done' && props.issueID === lastIssueId) {
    return (
      <div>
        user: {props.user} <br />
        repo: {props.repo} <br />
        issue_id: {props.issueID} <br />
        contributor: {props.contributorName} <br />
        side: {props.side} <br />
      </div>
    );
  }

  return (
    <Vote $option={props.side === 'YES'}
      onClick={async () => {
        setVoted('valid');
        setLastIssueId(props.issueID);
        setSide(side);
        await postSetVote(props.user, props.repo, props.issueID, props.issueID, false, props.contributorID, side, props.githubUser.token);
        
        setVoted('done');
        setLastIssueId(props.issueID);
        setSide(side);
      }}>
      {props.side}
    </Vote>
  );
}

export default VoteButton;

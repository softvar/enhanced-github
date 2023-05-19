import React from 'react';
import styled from 'styled-components';
import VoteButton from './VoteButton';

const BtnGroupVote = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row; /* Display buttons horizontally in flexbox */

  &:after {
    content: '';
    clear: both;
    display: table;
  }
  &:not(:last-child) {
    border-right: none; /* Prevent double borders */
  }
`;

export default function VoteButtonGroup({disabled, voted, chosenSide, user, repo, issueID, contributorID, contributorName, voteTotals, githubUser}) {
  //if disabled: disabled buttons:
  //if voted: chosen side === side > checkmark else gray
  //if !disabled: enabled buttons
  return (
    <BtnGroupVote>
      <VoteButton
        disabled={disabled}
        voted={voted}
        side={'yes'}
        chosenSide={chosenSide}
        user={user}
        repo={repo}
        issueID={issueID}
        contributorID={contributorID}
        contributerName={contributorName}
        githubUser={githubUser}
      ></VoteButton>
      <VoteButton
        disabled={disabled}
        voted={voted}
        side={'no'}
        chosenSide={chosenSide}
        user={user}
        repo={repo}
        issueID={issueID}
        contributorID={contributorID}
        contributerName={contributorName}
        githubUser={githubUser}
      ></VoteButton>
    </BtnGroupVote>
  );
}

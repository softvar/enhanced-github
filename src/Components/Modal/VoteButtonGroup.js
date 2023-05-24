import React from 'react';
import styled from 'styled-components';
import VoteButton from './VoteButton';

const BtnGroupVote = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row; 

  &:after {
    content: '';
    clear: both;
    display: table;
  }
  &:not(:last-child) {
    border-right: none; 
  }
`;

export default function VoteButtonGroup({disabled, setDisabled, setVoted, voted, setChosenSide, chosenSide, user, repo, issueID, contributorID, contributorName, voteTotals, githubUser}) {
  return (
    <BtnGroupVote>
      <VoteButton
        disabled={disabled}
        setDisabled={setDisabled}
        voted={voted}
        setVoted={setVoted}
        side={'yes'}
        chosenSide={chosenSide}
        setChosenSide={setChosenSide}
        user={user}
        repo={repo}
        issueID={issueID}
        contributorID={contributorID}
        contributerName={contributorName}
        githubUser={githubUser}
      ></VoteButton>
      <VoteButton
        disabled={disabled}
        setDisabled={setDisabled}
        voted={voted}
        setVoted={setVoted}
        side={'no'}
        chosenSide={chosenSide}
        setChosenSide={setChosenSide}
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

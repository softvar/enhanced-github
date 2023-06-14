import React from 'react';
import styled from 'styled-components';
import VoteButton from './VoteButton';

const BtnGroupVote = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
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

export default function ExtensionVoteButtonGroup({disabled, setDisabled, clickVoteHandler, setClickVoteHandler, setVoted, voted, setChosenSide, chosenSide, user, repo, issueID, contributorID, contributorName, voteTotals, githubUser}) {
  return (
    <BtnGroupVote>
      <VoteButton
        disabled={disabled}
        setDisabled={setDisabled}
        voted={voted}
        setVoted={setVoted}
        clickVoteHandler={clickVoteHandler}
        setClickVoteHandler={setClickVoteHandler}
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
        clickVoteHandler={clickVoteHandler}
        setClickVoteHandler={setClickVoteHandler}
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

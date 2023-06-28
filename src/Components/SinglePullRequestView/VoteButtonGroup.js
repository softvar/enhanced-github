import React from 'react';
import styled from 'styled-components';
import VoteButton from './VoteButton';

const BtnGroupVote = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row; 
  margin-left: 10px;

  &:after {
    content: '';
    clear: both;
    display: table;
  }
  &:not(:last-child) {
    border-right: none; 
  }
`;

export default function VoteButtonGroup({disabled, setDisabled, clickVoteHandler, setClickVoteHandler, setVoted, voted, chosenSide, user, repo, issueID, contributorID, contributorName, voteTotals, githubToken, defaultHash, childDefaultHash, owner}) {
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
        user={user}
        repo={repo}
        issueID={issueID}
        contributorID={contributorID}
        contributerName={contributorName}
        githubToken={githubToken}
        defaultHash={defaultHash}
        childDefaultHash={childDefaultHash}
        owner={owner}
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
        user={user}
        repo={repo}
        issueID={issueID}
        contributorID={contributorID}
        contributerName={contributorName}
        githubToken={githubToken}
        defaultHash={defaultHash}
        childDefaultHash={childDefaultHash}
        owner={owner}
      ></VoteButton>
    </BtnGroupVote>
  );
}

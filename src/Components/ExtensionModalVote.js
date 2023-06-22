import React, { useState, useEffect } from 'react';
import ExtensionVoteTotalMain from './ExtensionVoteTotalMain';
import styled from 'styled-components';
import ExtensionVotesTable from './ExtensionVotesTable';
import ExtensionVoteTotalResults from './ExtensionVoteTotalResults';
import ExtensionVoteButtonGroup from './ExtensionVoteButtonGroup';
import ExtensionVoteText from './ExtensionVoteText';
import SkeletonModal from './Modal/SkeletonModal';
const ModalContent = styled.div`
background-color: #fff;
margin: auto;
padding: 0 20px 20px 20px;
height: 420px;
width: 400px;
text-align: center;
`;

const ExtensionModalVote = ({ pullRequests, repo_id, votesArray, state, baseBranch, forkBranch, yes, no, yesVotes, noVotes, createdAt, votePower, alreadyVoted }) => {
  let issue_id = ""
  let contributor_id = ""
  let contributor_name = ""
  let vote_totals = ""
  let githubUser = "";

  const quorum = 0.5;
  let toggleModal = "";
  const [disabled, setDisabled] = useState(false);
  const [voted, setVoted] = useState(voted);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");
  const [chosenSide, setChosenSide] = useState(''); //we need this in the res under contributor
  const [totalPercent, setTotalPercent] = useState(0); 
  const voteableStates = new Set(['vote', 'pre-open', 'open']);
  const notVoteableStates = new Set(['conflict', 'merge', 'close']);
  const [clickVoteHandler, setClickVoteHandler] = useState(false);
  /* this block of useState calls are waiting for the rest of the response to be given. eventually we will be able to vote from the extension. */

  
  return (
    <ModalContent>

      <ExtensionVoteTotalMain
        user={user}
        repo={repo_id}
        issueID={issue_id}
        contributorID={contributor_id}
        contributorName={contributor_name}
        voteTotals={vote_totals}
        
        title={title}
        forkBranch={forkBranch}
        yesVotes={yesVotes}
        noVotes={noVotes}
        votePower={votePower}
        baseBranch={baseBranch}
        toggleModal={toggleModal}
        id="vote-total-main"
      >
        <h2>Vote Total</h2>
      </ExtensionVoteTotalMain>

      <ExtensionVoteText disabled={disabled} voted={voted} chosenSide={chosenSide} userVotedAt={createdAt} />

      <ExtensionVoteButtonGroup
        disabled={disabled}
        setDisabled={setDisabled}
        voted={voted}
        setVoted={setVoted}
        clickVoteHandler={clickVoteHandler}
        setClickVoteHandler={setClickVoteHandler}
        chosenSide={chosenSide}
        setChosenSide={setChosenSide}
        user={user}
        repo={repo_id}
        issueID={issue_id}
        contributorID={contributor_id}
        contributorName={contributor_name}
        voteTotals={vote_totals}
        githubUser={githubUser}
      />
      <ExtensionVoteTotalResults
        totalPercent={totalPercent}
        yesPercent={yes}
        noPercent={no}
        yesVotes={yesVotes}
        noVotes={noVotes}
        totalVotes={yesVotes + noVotes}
        quorum={quorum}
        id="vote-total-results"
      />
      <ExtensionVotesTable allVotes={votesArray} />
  </ModalContent>
  );
};

export default ExtensionModalVote;
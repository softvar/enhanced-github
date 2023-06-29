import React, { useState } from 'react';
import VoteTotal from './VoteTotal';
import styled from 'styled-components';
import VotesTable from './VotesTable';
import VoteTotalResults from './VoteTotalResult';
import VoteButtonGroup from './VoteButtonGroup';
import VoteText from './VoteText';
const ModalContent = styled.div`
background-color: #fff;
margin: auto;
padding: 0 9px 20px 9px;
height: 420px;
width: 400px;
text-align: center;
`;

const SinglePullRequestView = ({ pullRequests, repo_id, title, votesArray, state, baseBranch, forkBranch, yes, no, yesVotes, noVotes, createdAt, votePower, alreadyVoted, chosenSide, user, repo, githubToken, defaultHash, childDefaultHash, contributorID, owner, issueID, totalVotes }) => {
  const quorum = 0.5;
  const [disabled, setDisabled] = useState(false);
  const [totalPercent, setTotalPercent] = useState(0); // need this from the res
  /* this block of useState calls are waiting for the rest of the response to be given. eventually we will be able to vote from the extension. */


  return (
    <ModalContent>

      <VoteTotal
        repo={repo_id}
        title={title}
        forkBranch={forkBranch}
        votePower={votePower}
        baseBranch={baseBranch}
        id="vote-total-main"
      >
        <h2>Vote Total</h2>
      </VoteTotal>

      <VoteText disabled={disabled} voted={alreadyVoted} chosenSide={chosenSide} userVotedAt={createdAt} />

      <VoteButtonGroup
        disabled={disabled}
        voted={alreadyVoted}
        chosenSide={chosenSide}
        user={user}
        repo={repo}
        issueID={issueID}
        contributorID={contributorID}
        githubToken={githubToken}
        defaultHash={defaultHash}
        childDefaultHash={childDefaultHash}
        owner={owner}
      />
      <VoteTotalResults
        totalPercent={totalPercent}
        yesPercent={yes}
        noPercent={no}
        yesVotes={yesVotes}
        noVotes={noVotes}
        quorum={quorum}
        totalVotes={totalVotes}
        id="vote-total-results"
      />
      <VotesTable allVotes={votesArray} />
  </ModalContent>
  );
};

export default SinglePullRequestView;
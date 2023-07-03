import React, { useEffect, useState } from 'react';
import VoteTotal from './VoteTotal';
import styled from 'styled-components';
import VotesTable from './VotesTable';
import VoteButtonGroup from './VoteButtonGroup';
import VoteText from './VoteText';
import ProgressBar from './ProgressBar';

const Content = styled.div`
background-color: #fff;
margin: auto;
padding: 0 9px 20px 9px;
height: 420px;
width: 400px;
text-align: center;
`;

const Results = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 60px;
  `;

const SinglePullRequestView = ({ pullRequests, repo_id, title, votesArray, state, baseBranch, forkBranch, yesPercent, noPercent, createdAt, votePower, alreadyVoted, chosenSide, user, repo, githubToken, defaultHash, childDefaultHash, contributorID, owner, issueID, totalVotes }) => {
  const quorum = 0.5;
  const voteableStates = new Set(['vote', 'pre-open', 'open']);
  const notVoteableStates = new Set(['conflict', 'merge', 'close']);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (voteableStates.has(state)) {
      setDisabled(false);
    } else if (notVoteableStates.has(state)) {
      setDisabled(true);
    }
  }, [state]);

  return (
    <Content>

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
      <Results>
      <ProgressBar
        yesPercent={yesPercent}
        noPercent={noPercent}
        quorum={quorum}
      />
    </Results>
      <VotesTable allVotes={votesArray} />
  </Content>
  );
};

export default SinglePullRequestView;
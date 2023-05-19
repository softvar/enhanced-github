import React, { useState, useEffect } from 'react';
import VoteTotalMain from './VoteTotalMain';
import styled from 'styled-components';
import VotesTable from './VotesTable';
import VoteTotalResults from './VoteTotalResults';
import VoteButtonGroup from './VoteButtonGroup';

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  height: 95%;
  width: 700px;
  text-align: center;
  overflow-y: auto;
`;

const ModalVote = props => {
  let user = props.user;
  let repo = props.repo;
  let issue_id = props.issueID;
  let contributor_id = props.contributorID;
  let contributor_name = props.contributorName;
  let vote_totals = props.voteTotals;
  let githubUser = props.githubUser;
  const [disabled, setDisabled] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [voted, setVoted] = useState(false);
  const [forkBranch, setForkBranch] = useState('');
  const [title, setTitle] = useState('');
  const [baseBranch, setBaseBranch] = useState('');
  const [votePower, setVotePower] = useState(0);
  const [totalYesVotes, setTotalYesVotes] = useState(0);
  const [totalNoVotes, setTotalNoVotes] = useState(0);
  const [res, setRes] = useState({}); //[yesVotes, noVotes]
  const [allVotes, setAllVotes] = useState([]); //[yesVotes, noVotes
  const [chosenSide, setChosenSide] = useState(''); //yes or no
  const [yesPercent, setYesPercent] = useState(0);
  const [noPercent, setNoPercent] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const [quorum, setQuorum] = useState(0.5);
  const voteableStates = new Set(['vote', 'pre-open', 'open']);
  const notVoteableStates = new Set(['conflict', 'merge', 'close']);

  useEffect(() => {
    setForkBranch(props.voteRes.forkBranch);
    setBaseBranch(props.voteRes.baseBranch);
    setTitle(props.voteRes.title);
    if (props.voteRes.voteData) {
      setVoted(props.voteRes.voteData.contributor.voted);
      setVotePower(props.voteRes.voteData.contributor.votePower);
      setTotalYesVotes(props.voteRes.voteData.voteTotals.totalYesVotes);
      setTotalNoVotes(props.voteRes.voteData.voteTotals.totalNoVotes);
      setChosenSide(props.voteRes.voteData.contributor.side);
      setYesPercent(props.voteRes.voteData.voteTotals.yesPercent);
      setAllVotes(props.voteRes.voteData.votes);
      setNoPercent(props.voteRes.voteData.voteTotals.noPercent);
      setTotalPercent(props.voteRes.voteData.voteTotals.totalVotePercent);
      setQuorum(props.voteRes.voteData.voteTotals.quorum);
    }
    if (voteableStates.has(props.voteRes.state)) {
      setDisabled(false);
    } else if (notVoteableStates.has(props.voteRes.state)) {
      setDisabled(true);
    }

    setRes(props.voteRes);
  }, [props.voteRes]);

  return (
    <ModalContent>
      <VoteTotalMain
        user={user}
        repo={repo}
        issueID={issue_id}
        contributorID={contributor_id}
        contributorName={contributor_name}
        voteTotals={vote_totals}
        githubUser={githubUser}
        title={title}
        forkBranch={forkBranch}
        yesVotes={totalYesVotes}
        noVotes={totalNoVotes}
        votePower={votePower}
        baseBranch={baseBranch}
        id="vote-total-main"
      >
        <h2>Vote Total</h2>
      </VoteTotalMain>
      <VoteButtonGroup
        disabled={disabled}
        setDisabled={setDisabled}
        voted={voted}
        setVoted={setVoted}
        chosenSide={chosenSide}
        setChosenSide={setChosenSide}
        user={user}
        repo={repo}
        issueID={issue_id}
        contributorID={contributor_id}
        contributorName={contributor_name}
        voteTotals={vote_totals}
        githubUser={githubUser}
      />
      <VoteTotalResults
        totalPercent={totalPercent}
        yesPercent={yesPercent}
        noPercent={noPercent}
        yesVotes={totalYesVotes}
        noVotes={totalNoVotes}
        totalVotes={totalYesVotes + totalNoVotes}
        quorum={quorum}
        id="vote-total-results"
      />

      <VotesTable allVotes={allVotes} />
    </ModalContent>
  );
};

export default ModalVote;

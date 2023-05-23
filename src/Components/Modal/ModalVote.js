import React, { useState, useEffect } from 'react';
import VoteTotalMain from './VoteTotalMain';
import styled from 'styled-components';
import VotesTable from './VotesTable';
import VoteTotalResults from './VoteTotalResults';
import VoteButtonGroup from './VoteButtonGroup';
import VoteText from './VoteText';

const ModalContent = styled.div`
  background-color: #fff;
  margin: auto;
  padding: 20px;
  height: 720px;
  width: 700px;
  text-align: center;
  box-shadow: 0px 12px 20px -1px rgba(0, 0, 0, 0.18);
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
  const [userVotedAt, setUserVotedAt] = useState(''); //date
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
      setUserVotedAt(props.voteRes.voteData.contributor.createdAt);
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
  //userVotedAt={userVotedAt}
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
      <VoteText
        disabled={disabled}
        voted={voted}
        chosenSide={chosenSide}
        userVotedAt={userVotedAt}
      />
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

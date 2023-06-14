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
  padding: 20px;
  height: 720px;
  width: 620px;
  text-align: center;
  box-shadow: 0px 12px 20px -1px rgba(0, 0, 0, 0.18);
`;

const ExtensionModalVote = props => {
  let user = props.user;
  let repo = props.repo;
  let issue_id = props.issueID;
  let contributor_id = props.contributorID;
  let contributor_name = props.contributorName;
  let vote_totals = props.voteTotals;
  let githubUser = props.githubUser;
  const [loading, setLoading] = useState(true);
  let toggleModal = props.toggleModal;
  let getVotes = props.getVotes;
  const [disabled, setDisabled] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [voted, setVoted] = useState(false);
  const [forkBranch, setForkBranch] = useState('');
  const [title, setTitle] = useState('');
  const [baseBranch, setBaseBranch] = useState('');
  const [votePower, setVotePower] = useState(0);
  const [totalYesVotes, setTotalYesVotes] = useState(0);
  const [totalNoVotes, setTotalNoVotes] = useState(0);
  const [res, setRes] = useState({});
  const [allVotes, setAllVotes] = useState([]);
  const [chosenSide, setChosenSide] = useState(''); //yes or no
  const [yesPercent, setYesPercent] = useState(0);
  const [noPercent, setNoPercent] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const [quorum, setQuorum] = useState(0.5);
  const [userVotedAt, setUserVotedAt] = useState(''); //date
  const voteableStates = new Set(['vote', 'pre-open', 'open']);
  const notVoteableStates = new Set(['conflict', 'merge', 'close']);
  const [clickVoteHandler, setClickVoteHandler] = useState(false);
  const socketEvents = props.socketEvents
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
    setLoading(true);
  }, [props.voteRes]);
  /*
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
  }, [props.voteRes]); */

  const updateVotesHandler = async () =>
    await getVotes().then(res => {
      setVoted(res.voteData.contributor.voted);
      setVotePower(res.voteData.contributor.votePower);
      setTotalYesVotes(res.voteData.voteTotals.totalYesVotes);
      setTotalNoVotes(res.voteData.voteTotals.totalNoVotes);
      setChosenSide(res.voteData.contributor.side);
      setUserVotedAt(res.voteData.contributor.createdAt);
      setYesPercent(res.voteData.voteTotals.yesPercent);
      setAllVotes(res.voteData.votes);
      setNoPercent(res.voteData.voteTotals.noPercent);
      setTotalPercent(res.voteData.voteTotals.totalVotePercent);
    });
/*
  useEffect(() => {
    updateVotesHandler();
  }, [clickVoteHandler, socketEvents]);
 */
  return (
    <ModalContent>
      {loading ? (
        <>
          <SkeletonModal />
        </>
      ) : (
        <>
          <ExtensionVoteTotalMain
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
            toggleModal={toggleModal}
            id="vote-total-main"
          >
            <h2>Vote Total</h2>
          </ExtensionVoteTotalMain>
          <ExtensionVoteText disabled={disabled} voted={voted} chosenSide={chosenSide} userVotedAt={userVotedAt} />
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
            repo={repo}
            issueID={issue_id}
            contributorID={contributor_id}
            contributorName={contributor_name}
            voteTotals={vote_totals}
            githubUser={githubUser}
          />
          <ExtensionVoteTotalResults
            totalPercent={totalPercent}
            yesPercent={yesPercent}
            noPercent={noPercent}
            yesVotes={totalYesVotes}
            noVotes={totalNoVotes}
            totalVotes={totalYesVotes + totalNoVotes}
            quorum={quorum}
            id="vote-total-results"
          />
          <ExtensionVotesTable allVotes={allVotes} />
        </>
      )}
    </ModalContent>
  );
};

export default ExtensionModalVote;
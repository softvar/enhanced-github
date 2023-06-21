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

const ExtensionModalVote = props => {
  let repo_id = props.repo;
  let issue_id = props.issueID;
  let contributor_id = props.contributorID;
  let contributor_name = props.contributorName;
  let vote_totals = props.voteTotals;
  let githubUser = "";
  let yes = props.yes;
    let no = props.no;
    

    

 
  const [loading, setLoading] = useState(true);
  let toggleModal = props.toggleModal;
  let getVotes = props.getVotes;
  const [disabled, setDisabled] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [voted, setVoted] = useState(props.voted);
  const [forkBranch, setForkBranch] = useState(props.forkBranch);
  const [title, setTitle] = useState('');
  const [baseBranch, setBaseBranch] = useState(props.baseBranch);
  const [votePower, setVotePower] = useState(props.votePower);
  const [totalYesVotes, setTotalYesVotes] = useState(props.yesVotes);
  const [totalNoVotes, setTotalNoVotes] = useState(props.noVotes);
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");
  const [res, setRes] = useState({});
  const [allVotes, setAllVotes] = useState(props.votesArray);
  const [chosenSide, setChosenSide] = useState(''); //we need this in the res under contributor
  const [yesPercent, setYesPercent] = useState(props.yesPercent);
  const [noPercent, setNoPercent] = useState(props.noPercent);
  const [totalPercent, setTotalPercent] = useState(0); 
  const [quorum, setQuorum] = useState(0.5);
  const [userVotedAt, setUserVotedAt] = useState(props.createdAt); //date
  const voteableStates = new Set(['vote', 'pre-open', 'open']);
  const notVoteableStates = new Set(['conflict', 'merge', 'close']);
  const [clickVoteHandler, setClickVoteHandler] = useState(false);
  const [pullRequests, setPullRequests] = useState(props.votesArray); //pull requests for repo
  const socketEvents = props.socketEvents
  useEffect(() => {
    //setTimeout(() => setLoading(false), 1500);
    setPullRequests(props.votesArray);
    setLoading(false);
    console.log(props.pullRequests);
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
/*
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
    }); */
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
            yesPercent={yes}
            noPercent={no}
            yesVotes={totalYesVotes}
            noVotes={totalNoVotes}
            totalVotes={totalYesVotes + totalNoVotes}
            quorum={quorum}
            id="vote-total-results"
          />
          <ExtensionVotesTable allVotes={pullRequests} />
        </>
      )}
    </ModalContent>
  );
};

export default ExtensionModalVote;
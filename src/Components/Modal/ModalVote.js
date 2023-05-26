import React, { useState, useEffect } from 'react';
import VoteTotalMain from './VoteTotalMain';
import styled from 'styled-components';
import VotesTable from './VotesTable';
import VoteTotalResults from './VoteTotalResults';
import VoteButtonGroup from './VoteButtonGroup';
import VoteText from './VoteText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const ModalContent = styled.div`
  background-color: #fff;
  margin: auto;
  padding: 20px;
  height: 720px;
  width: 620px;
  text-align: center;
  box-shadow: 0px 12px 20px -1px rgba(0, 0, 0, 0.18);
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr 1fr 3fr;
  gap: 0px 0px;
  `;

  const SkeletonButton = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  `;

  const SkeletonVotePower = styled(SkeletonButton)`
  justify-content: flex-end;
  `;

const ModalVote = props => {
  let user = props.user;
  let repo = props.repo;
  let issue_id = props.issueID;
  let contributor_id = props.contributorID;
  let contributor_name = props.contributorName;
  let vote_totals = props.voteTotals;
  let githubUser = props.githubUser;
  const [loading, setLoading] = useState(true);
  let toggleModal = props.toggleModal;
  let getVotes = props.getVotes
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
  const [clickVoteHandler, setClickVoteHandler] = useState(false)
  useEffect(() => {
    
    setTimeout(()=> setLoading(false), 1500);
    setLoading(true);
  } , [props.voteRes]);

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
  
  const updateVotesHandler = async () => await getVotes().then(res => {
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
  })

  useEffect(()=>{
    updateVotesHandler()
  },[clickVoteHandler])

  //userVotedAt={userVotedAt}
  return (
    <ModalContent> 
      { loading ? (
      <>
        <SkeletonGrid>
            <div>
              <Skeleton animation="wave" variant="text" width={350} height={60} />
              <Skeleton animation="wave" variant="text" width={150} height={40} />
              <Skeleton animation="wave" variant="text" width={150} height={40} />
              <Skeleton animation="wave" variant="text" width={0} height={20} />
              <Skeleton animation="wave" variant="text" width={580} height={40} />

            </div>
            <SkeletonVotePower>
              <Skeleton animation="wave" variant="rectangular" width={150} height={40} />
            </SkeletonVotePower>
            <SkeletonButton>
              <Skeleton animation="wave" variant="rounded" width={180} height={80} />
            </SkeletonButton>
            <SkeletonButton>
              <Skeleton animation="wave" variant="rounded" width={180} height={80} />
            </SkeletonButton>
            <div>
              <Skeleton animation="wave" variant="text" width={0} height={50} />
              <Skeleton animation="wave" variant="text" width={580} height={50} />
              <Skeleton animation="wave" variant="text" width={0} height={30} />
              <Skeleton animation="wave" variant="text" width={580} height={50} />
              <Skeleton animation="wave" variant="text" width={580} height={50} />
              <Skeleton animation="wave" variant="text" width={580} height={50} />
              <Skeleton animation="wave" variant="text" width={580} height={50} />
              <Skeleton animation="wave" variant="text" width={580} height={50} />
            </div>
            <div></div>
        </SkeletonGrid>
      </>
      ) : (  
      <>
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
        toggleModal={toggleModal}
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
      </>
      )}
    </ModalContent>
  );
};

export default ModalVote;

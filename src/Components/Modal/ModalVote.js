import React, { useState, useEffect } from 'react';
import VoteTotalMain from './VoteTotalMain';
import VoteButton from './VoteButton';
import styled from 'styled-components';
import VotesTable from './VotesTable';
import VoteTotalResults from './VoteTotalResults';

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

  const BtnGroupVote = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row; /* Display buttons horizontally in flexbox */
  
  &:after {
    content: "";
    clear: both;
    display: table;
  }
  &:not(:last-child) {
    border-right: none; /* Prevent double borders */
  }`;

  const YesButton = styled(VoteButton)`
    background-color: #04AA6D; /* Green background */
    border: 1px solid green; /* Green border */
    color: black; 
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side - Still needed ? */
    margin: 1rem;
    `;

    const NoButton = styled(YesButton)`
        background-color: #f44336;
    `;


const ModalVote = (props) => {
    let user = props.user;
    let repo = props.repo;
    let issue_id = props.issueID;
    let contributor_id = props.contributorID;
    let contributer_name = props.contributerName;
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
    const [res, setRes] = useState({});//[yesVotes, noVotes]
    const [allVotes, setAllVotes] = useState([]);//[yesVotes, noVotes
    const [chosenSide, setChosenSide] = useState(''); //yes or no
    const [yesPercent, setYesPercent] = useState(0);
    const [noPercent, setNoPercent] = useState(0);
    const [totalPercent, setTotalPercent] = useState(0);
    const [quorum, setQuorum] = useState(.5);
    const voteableStates = new Set([
      'vote',
      'pre-open',
      'open'
    ]);
    const notVoteableStates = new Set([
      'conflict',
      'merge',
      'close'
    ])  ;

      //console.log('get votes res:', props.voteRes)
      useEffect(() => {
        setForkBranch(props.voteRes.forkBranch);
      setBaseBranch(props.voteRes.baseBranch);
      setTitle(props.voteRes.title);
      if (props.voteRes.voteData){
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



    
    
    //make new component called voteTotalResults.js to display the red and green vote totals + progress bar

    //input side={"yes"}, voted={false}, chosenSide={""}
    return (
  
        <ModalContent>
            <VoteTotalMain user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} githubUser={githubUser} title={title} forkBranch={forkBranch} yesVotes={totalYesVotes} noVotes={totalNoVotes} votePower={votePower} baseBranch={baseBranch} id="vote-total-main">
                <h2>Vote Total</h2>
            </VoteTotalMain>
          <BtnGroupVote>

            <VoteButton disabled={disabled} voted={voted} side={'yes'} chosenSide={chosenSide} user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} githubUser={githubUser} id="yes_vote_button">
            </VoteButton>
            <VoteButton disabled={disabled} voted={voted} side={'no'} chosenSide={chosenSide} user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} githubUser={githubUser} id="no_vote_button">
            </VoteButton>
          </BtnGroupVote>
          <VoteTotalResults totalPercent={totalPercent} yesPercent={yesPercent} noPercent={noPercent} yesVotes={totalYesVotes} noVotes={totalNoVotes} totalVotes={totalYesVotes + totalNoVotes} quorum={quorum} id="vote-total-results" />

          <VotesTable allVotes={allVotes}/>
        </ModalContent>
    );
}

export default ModalVote;
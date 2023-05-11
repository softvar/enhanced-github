import React, { useState, useEffect } from 'react';
//import ModalVoteStyles from './ModalVoteStyles.css';
import VoteTotalMain from './VoteTotalMain';
import VoteButton from './VoteButton';
import styled from 'styled-components';
import VotesTable from './VotesTable';
import VoteTotalResults from './VoteTotalResults';
const { postGetVotes } = require('../requests');

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
    const [voted, setVoted] = useState(false);
    const [forkBranch, setForkBranch] = useState('');
    const [title, setTitle] = useState('');
    const [baseBranch, setBaseBranch] = useState('');
    const [votePower, setVotePower] = useState(0);
    const [totalYesVotes, setTotalYesVotes] = useState(0);
    const [totalNoVotes, setTotalNoVotes] = useState(0);
    const [res, setRes] = useState({});//[yesVotes, noVotes]
    const [allVotes, setAllVotes] = useState([]);//[yesVotes, noVotes
    let repoID = `${user}/${repo}`

    const getVotes = async () => {
      try {
        const res = await postGetVotes(repoID, issue_id, contributor_id)
        console.log('get votes res:', res)
        setVoted(res.voteData.contributor.voted);
        setForkBranch(res.forkBranch);
        setBaseBranch(res.baseBranch);
        setTitle(res.title);
        setVotePower(res.voteData.contributor.votePower);
        setTotalYesVotes(res.voteData.voteTotals.totalYesVotes);
        setTotalNoVotes(res.voteData.voteTotals.totalNoVotes);
        setRes(res);
        setAllVotes(res.voteData.votes);

      } catch (error) {
        console.log('res get votes error:', error) 
      }
    }

    useEffect(()=> {
      getVotes()
      }
    ,[]);
    console.log('res:', res)
    console.log('voted in modalvote:', voted);
    //make new component called voteTotalResults.js to display the red and green vote totals + progress bar
    return (
  
        <ModalContent>
            <VoteTotalMain user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} githubUser={githubUser} title={title} forkBranch={forkBranch} yesVotes={totalYesVotes} noVotes={totalNoVotes} votePower={votePower} baseBranch={baseBranch} id="vote-total-main">
                <h2>Vote Total</h2>
            </VoteTotalMain>
          <BtnGroupVote>
            <VoteButton user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} side={'yes'}  githubUser={githubUser} id="yes_vote_button" voted={voted}>
            </VoteButton>
            <VoteButton user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} side={'no'} githubUser={githubUser} id="no_vote_button" voted={voted}>
            </VoteButton>
          </BtnGroupVote>
          <VoteTotalResults yesVotes={totalYesVotes} noVotes={totalNoVotes} totalVotes={totalYesVotes + totalNoVotes} id="vote-total-results" />

          <VotesTable allVotes={allVotes}/>
        </ModalContent>
    );
}

export default ModalVote;
import React, { useState, useEffect } from 'react';
//import ModalVoteStyles from './ModalVoteStyles.css';
import VoteTotalMain from './VoteTotalMain';
import VoteButton from './VoteButton';
import styled from 'styled-components';
import VotesTable from './VotesTable';
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

    let repoID = `${user}/${repo}`

    const getVotes = async () => {
      try {
        const res = await postGetVotes(repoID, issue_id, contributor_id)
        console.log('get votes res:', res)
      } catch (error) {
        console.log('res get votes error:', error) 
      }
    }

    useEffect(()=> {
      getVotes()
    }
    )
    

    return (
  
        <ModalContent>
            <VoteTotalMain user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} githubUser={githubUser} id="vote-total-main">
                <h2>Vote Total</h2>
            </VoteTotalMain>
          <BtnGroupVote>
            <VoteButton user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} side={'yes'}  githubUser={githubUser} id="yes_vote_button">
            </VoteButton>
            <VoteButton user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} side={'no'} githubUser={githubUser} id="no_vote_button">
            </VoteButton>
          </BtnGroupVote>
          <VotesTable />
        </ModalContent>
    );
}

export default ModalVote;
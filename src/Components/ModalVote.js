import React, { useState, useEffect } from 'react';
//import ModalVoteStyles from './ModalVoteStyles.css';
import VoteTotalMain from './VoteTotalMain';
import VoteButton from './VoteButton';
import styled from 'styled-components';

const ModalContent = styled.div`
background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  height: 100%;
  width: 33%;
  text-align: center;
  `;

  const BtnGroupVote = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row; /* Display buttons horizontally in flexbox */
  button {
    background-color: #04AA6D; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side - Still needed ? */
    margin: 1rem;
  }`;

const ModalVote = (props) => {
    let user = props.user;
    let repo = props.repo;
    let issue_id = props.issueID;
    let contributor_id = props.contributorID;
    let contributer_name = props.contributerName;
    let vote_totals = props.voteTotals;
    let githubUser = props.githubUser;

    

    return (
  
        <ModalContent>
            <VoteTotalMain user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} githubUser={githubUser} id="vote-total-main">
                <h2>Vote Total</h2>
            </VoteTotalMain>
          <BtnGroupVote>
            <VoteButton user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} side={'yes'}  githubUser={githubUser} id="yes_vote_button">
                <button>Yes</button>
            </VoteButton>
            <VoteButton user={user} repo={repo} issueID={issue_id} contributorID={contributor_id} contributerName={contributer_name} voteTotals={vote_totals} side={'no'} githubUser={githubUser} id="no_vote_button">
                <button>No</button>
            </VoteButton>
          </BtnGroupVote>
        </ModalContent>
    );
}

export default ModalVote;
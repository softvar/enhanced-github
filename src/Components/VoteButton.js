import React, { useState, useEffect } from 'react';
import { postSetVote } from '../requests';
import styled from 'styled-components';

const Vote = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
    ${props => props.$voted == true && `
    /* Disable the opposite button when a vote has been cast */
    ${props.$chosenSide === 'yes' && props.$option === 'no' ? 'background-color: #B7B7B7;' : ''}
    ${props.$chosenSide === 'no' && props.$option === 'yes' ? 'background-color: #B7B7B7;' : ''}
   
  `}
  &:disabled {
    background-color: #B7B7B7; 
  }

  ${props => props.$voted == true && `
    /* Disable the opposite button when a vote has been cast */
    ${props.$chosenSide === 'yes' && props.$option === 'yes' ? 'background-color: #038800;' : ''}
    ${props.$chosenSide === 'no' && props.$option === 'no' ? 'background-color: #038800;' : ''}
  `}

  ${props => !props.$voted && `
    /* Styles for when no vote has been cast */
    ${props.$option === 'yes' ? 'background-color: #038800;' : 'background-color: #D33131;'}
  `}
    border: none;
    color: white; 
    padding: 10px 34px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side - Still needed ? */
    margin: 1rem;
    font-family: 'Inter', sans-serif;
    font-size:24px;
    border-radius: 5px;
    `;

    const SelectedVote = styled(Vote)`
      &:disabled{
        ${props => !props.$voted && `
          /* Styles for when no vote has been cast */
          ${props.$option === 'yes' ? 'background-color: #038800;' : 'background-color: #D33131;'}
        `}
      }
    `;

function VoteButton(props) {
  const [voted, setVoted] = useState('');
  const [lastIssueId, setLastIssueId] = useState('');
  const [side, setSide] = useState(props.side.toLowerCase());
  const [disabledButton, setDisabledButton] = useState(false);
  const [issueVoted, setIssueVoted] = useState(props.voted);
  const [chosenSide, setChosenSide] = useState(props.chosenSide);
  const [option, setOption] = useState(props.side);

  useEffect(() => {
    if (props.disabled === true || props.voted == true && props.chosenSide != props.side) {
      setDisabledButton(true);
    }
  }, [props.disabled, props.voted, props.chosenSide, props.side]);

  return props.voted && props.chosenSide === props.side ? (
    <SelectedVote
    $voted={issueVoted}
    $chosenSide={chosenSide}
    $option={option}
      disabled={true}
      
      >
        {props.side.toUpperCase()}
        </SelectedVote>
    
  ) : (

    <Vote 
      $voted={issueVoted}
      $chosenSide={chosenSide}
      $option={option}
      disabled={disabledButton}

      onClick={async () => {
        setVoted('valid');
        setLastIssueId(props.issueID);
        await postSetVote(props.user, props.repo, props.issueID, props.issueID, false, props.contributorID, side, props.githubUser.token);
        
        setVoted('done');
      }}>
      {props.side.toUpperCase()}
    </Vote>
  );
}

export default VoteButton;

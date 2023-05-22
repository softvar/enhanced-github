import React, { useState, useEffect } from 'react';
import { postSetVote } from '../../requests';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 1rem;
  display: flex;
  align-items: center;

  img {
    position: relative;
    right: 10%;
    width: 30px;
    height: auto;
  }
`;

const Button = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  border: none;
  color: white;
  padding: 10px 34px;
  cursor: pointer;
  float: left;
  margin: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  border-radius: 5px;
`;

const VoteYesButton = styled(Button)`
  background-color: #038800;
`;
const VoteNoButton = styled(Button)`
  background-color: #d33131;
`;
const SelectedYesButton = styled(VoteYesButton)`
  &:disabled {
    background-color:lightgreen;
    cursor: auto;
  }
`;
const SelectedNoButton = styled(VoteNoButton)`
  &:disabled {
    background-color:hotpink;
    cursor: auto;
  }
`;
const DisabledVoteYesButton = styled(Button)`
  &: disabled {
    background-color: #b7b7b7;
  }
`;
const DisabledVoteNoButton = styled(Button)`
  &: disabled {
    background-color: #b7b7b7;
  }
`;

//The VotButton react component renders a Button styled component with the below variations based on a switch case:
//Button:
//VoteYesButton
//VotedYesButton
//VoteNoButton
//VotedNoButton
//DisabledVoteYesButton

function VoteButton({
  disabled,
  setDisabled,
  voted,
  setVoted,
  side,
  chosenSide,
  setChosenSide,
  user,
  repo,
  issueID,
  contributorID,
  contributerName,
  githubUser
}) {
  const [disabledButton, setDisabledButton] = useState(false);
  const [option, setOption] = useState(side);
  const [buttonType, setButtonType] = useState('VoteButton');

  useEffect(() => {
   
  }, [disabled, voted, chosenSide, side]);

  const voteHandler = async e => {
    e.preventDefault();
    console.log(user, repo, issueID, contributorID, side, githubUser.token);
    await postSetVote(user, repo, issueID, false, true, contributorID, side, githubUser.token);
    //also needs to setSide, setVoted, setDisabled...?
  };

  //Set switch case use effect:
  useEffect(() => {

   
    // disabled handler possibly not needed as disabled can be set in parent component ModalVote based on voted prop or status prop
    if (disabled === true || (voted == true && chosenSide !== side)) {
      setDisabledButton(true);
    }
    
    if (side === 'yes' && !voted) {
      setButtonType('VoteYesButton');
    }
    if (side === 'no' && !voted) {
      setButtonType('VoteNoButton');
    }
    
    if (side === 'yes' && (disabled || (voted == true && chosenSide !== side))) {
      setButtonType('DisabledYesButton');
    }
    if (side === 'no' && (disabled || (voted == true && chosenSide !== side))) {
      setButtonType('DisabledNoButton');
    }
    if ((side === 'yes' && voted && chosenSide === 'yes')) {
      setButtonType('SelectedYesButton');
    }
    //logic for above buttons...:
    if (side === 'no' && voted && chosenSide === 'no') {
      setButtonType('SelectedNoButton');
    }
    console.log(buttonType + "button type type type");

  }, [disabled, voted, chosenSide, side, buttonType]);

  switch (buttonType) {
    case 'VoteYesButton':
      return (
        <VoteYesButton value={side} onClick={e => voteHandler(e)}>
          {side.toUpperCase()}
        </VoteYesButton>
      );
    case 'VoteNoButton':
      return <VoteNoButton onClick={e => voteHandler(e)}>{side.toUpperCase()}</VoteNoButton>;
    case 'SelectedYesButton':
      return <SelectedYesButton disabled={true}>{side.toUpperCase()}</SelectedYesButton>;
    case 'SelectedNoButton':
        return <SelectedNoButton disabled={true}>{side.toUpperCase()}</SelectedNoButton>;
    case 'DisabledYesButton':
      return <DisabledVoteYesButton disabled={true}>{side.toUpperCase()}</DisabledVoteYesButton>;
    case 'DisabledNoButton':
        return <DisabledVoteNoButton disabled={true}>{side.toUpperCase()}</DisabledVoteNoButton>;
    //etc...
    default:
      return <VoteYesButton>{side.toUpperCase()}</VoteYesButton>;
  }
}
// return props.voted && props.chosenSide === props.side ? (
//   <SelectedVote $voted={issueVoted} $chosenSide={chosenSide} $option={option} disabled={true}>
//     {props.side.toUpperCase()}
//   </SelectedVote>
// ) : (
//   <Vote
//     $voted={issueVoted}
//     $chosenSide={chosenSide}
//     $option={option}
//     disabled={disabledButton}
//     onClick={async () => {
//       setVoted('valid');
//       await postSetVote(
//         props.user,
//         props.repo,
//         props.issueID,
//         false,
//         props.contributorID,
//         side,
//         props.githubUser.token
//       );
//       setVoted('done');
//     }}
//   >
//     {props.side.toUpperCase()}
//   </Vote>
// );

export default VoteButton;

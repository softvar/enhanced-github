import React, { useState, useEffect } from 'react';
import { postSetVote } from '../../requests';
import styled from 'styled-components';
import { io } from "socket.io-client";
const socket = io("http://localhost:4000/", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
}
  );
const Wrapper = styled.div`
  margin: 0rem 2rem 0rem 2rem;
  display: flex;
  align-items: center;
  width: 120px;

  img {
    position: relative;
    right: 15%;
    width: 40px;
    height: auto;
  }
`;

const Button = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  border: none;
  color: white;
  padding: 8px 34px;
  cursor: pointer;
  float: left;
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
    background-color:#038800;
    cursor: default;
  }
`;
const SelectedNoButton = styled(VoteNoButton)`
  &:disabled {
    background-color:#d33131;
    cursor: default;
  }
`;
const DisabledVoteYesButton = styled(Button)`
  &: disabled {
    background-color: #b7b7b7;
    cursor: default;
  }
`;
const DisabledVoteNoButton = styled(Button)`
  &: disabled {
    background-color: #b7b7b7;
    cursor: default;
  }
`;

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
  githubUser,
  clickVoteHandler,
  setClickVoteHandler
}) {
  const [disabledButton, setDisabledButton] = useState(false);
  const [option, setOption] = useState(side);
  const [buttonType, setButtonType] = useState('VoteButton');

  useEffect(() => {
   
  }, [disabled, voted, chosenSide, side]);

  const voteHandler = async e => {
    e.preventDefault();
    await postSetVote(user, repo, issueID, issueID, false, contributorID, side, githubUser.token);
    // Toggle clickVoteHandler to update vote data
    setClickVoteHandler(!clickVoteHandler)
    socket.emit('vote cast', user, repo, issueID)
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
      return (<Wrapper>
        <VoteYesButton value={side} onClick={e => voteHandler(e)}>
          {side.toUpperCase()}
        </VoteYesButton>
        </Wrapper>
      );
    case 'VoteNoButton':
      return <Wrapper>
       <VoteNoButton onClick={e => voteHandler(e)}>{side.toUpperCase()}</VoteNoButton>
       </Wrapper>;
    case 'SelectedYesButton':
      return <Wrapper>
        <SelectedYesButton disabled={true}>{side.toUpperCase()}</SelectedYesButton>
        <img src="https://reibase.rs/greencheck.png" />
      </Wrapper>;
    case 'SelectedNoButton':
        return  <Wrapper><SelectedNoButton disabled={true}>{side.toUpperCase()}</SelectedNoButton>
        <img src="https://reibase.rs/redcheck.png" />
        </Wrapper>;
    case 'DisabledYesButton':
      return  <Wrapper><DisabledVoteYesButton disabled={true}>{side.toUpperCase()}</DisabledVoteYesButton>
      </Wrapper>;
    case 'DisabledNoButton':
        return  <Wrapper><DisabledVoteNoButton disabled={true}>{side.toUpperCase()}</DisabledVoteNoButton></Wrapper>;
    //etc...
    default:
      return  <Wrapper><VoteYesButton>{side.toUpperCase()}</VoteYesButton> </Wrapper>;
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

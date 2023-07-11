import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Unit = styled.span`
font-size: 10px;
`
function getDurationSince(timestamp) {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInMs = now - createdAt;
    const diffInSeconds = Math.round(diffInMs / 1000);
  
    if (diffInSeconds < 60) {
      return (<>{diffInSeconds} <Unit>S</Unit></>);
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return (<>{diffInMinutes} <Unit>MIN</Unit></>);
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return (<>{diffInHours} <Unit>HR</Unit></>);
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return (<>{diffInDays} <Unit>D</Unit></>);
    }
  }
  
  

const VoteRow = styled.div`
    display: grid;
    grid-template-columns: 176px 80px 46px 47px;
    padding: 4px 2px 4px 2px;
    justify-items: center;
    background-color: ${props => props.$option ? "#FFF" : "#F1F1F1"}
`;

const Centered = styled.span`
  text-align: center;
`;

const OverflowText = styled.span`
overflow: hidden;
text-overflow: ellipsis;
min-width: 0;
max-width: 100%;
letter-spacing: 0.6px;
`;

const Text = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
font-weight: 300;
font-size: 10px;
color: #313131;
overflow: hidden;
text-overflow: ellipsis;
min-width: 0;
max-width: 100%;
`;

const SideText = styled(Text)`
    color: ${props => props.$option ? "#038800" : "#D33131"};
`;

function makeAllCaps(str) {
    return str.toUpperCase();
  }

  function addCommas(num) {
    // convert the number to a string
    let numStr = num.toString();
  
    // split the string into an array of characters
    let numArr = numStr.split("");
  
    // determine the position of the first comma
    let firstCommaPos = numArr.length > 3 ? numArr.length % 3 || 3 : 0;
  
    // add commas after every third digit starting from the first comma position
    for (let i = firstCommaPos; i < numArr.length; i += 4) {
      numArr.splice(i, 0, ",");
    }
  
    // join the array of characters back into a string
    return numArr.join("");
  }
  
  
  
export default function Row(props){    
  let [ticker, setTicker] = useState(0)

  useEffect(()=>{
    setTimeout(()=>{setTicker(ticker+=1)}, 1000)
  },[ticker])
    return(
        <div>
            <VoteRow $option={props.index % 2 == 0}>
                <Text>
                  <OverflowText>{props.id}</OverflowText>
                </Text>
                <Text>
                  <Centered>{props.votepower}</Centered>
                </Text>
                <SideText $option={props.side === 'yes'}>{makeAllCaps(props.side)}</SideText>
                <Text>{getDurationSince(props.age)}</Text>
            </VoteRow>
        </div>
    )
}
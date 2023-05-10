import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function getDurationSince(timestamp) {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInMs = now - createdAt;
    const diffInSeconds = Math.round(diffInMs / 1000);
  
    if (diffInSeconds < 60) {
      return diffInSeconds + " S";
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return diffInMinutes + " MIN";
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return diffInHours + " HR";
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return diffInDays + " D";
    }
  }
  
  

const VoteRow = styled.div`
    display: grid;
    grid-template-columns: 46% 23% 22% 9%;
    padding: 4px;
    justify-items: start;
    background-color: ${props => props.$option ? "#FFF" : "#F1F1F1"}
`;

const Text = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
font-weight: 300;
font-size: 12px;
color: #313131; //add conditional for red/green color
margin-top: 5px;
margin-bottom: 5px;

`;

const SideText = styled(Text)`
    color: ${props => props.$option ? "#038800" : "#D33131"};
`;

function makeAllCaps(str) {
    return str.toUpperCase();
  }
  
export default function row(props){    
    return(
        <div>
            <VoteRow $option={props.index % 2 == 0}>
                <Text>{props.id}</Text>
                <Text>{props.votepower}</Text>
                <SideText $option={props.side === 'yes'}>{makeAllCaps(props.side)}</SideText>
                <Text>{getDurationSince(props.age)}</Text>
            </VoteRow>
        </div>
    )
}
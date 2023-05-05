import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function getMinutesSince(timestamp) {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInMs = now - createdAt;
    const diffInMinutes = Math.round(diffInMs / 1000 / 60);
    return diffInMinutes;
  }
  

const VoteRow = styled.div`
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    background-color: ${props => props.$option ? "#FFF" : "#F1F1F1"}
`;

const Text = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
font-weight: 400;
font-size: 12px;
color: #313131; //add conditional for red/green color
margin-top: 5px;
margin-bottom: 5px;

`;

const SideText = styled(Text)`
    color: ${props => props.$option ? "#038800" : "#D33131"};
`;

export default function row(props){    
    return(
        <div>
            <VoteRow $option={props.index % 2 == 0}>
                <Text>{props.id}</Text>
                <Text>{props.votepower}</Text>
                <SideText $option={props.side === 'yes'}>{props.side}</SideText>
                <Text>{props.age}</Text>
            </VoteRow>
        </div>
    )
}
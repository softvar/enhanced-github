import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatusBadge from './StatusBadge';

const DividerLine = styled.span`
  display: block;
  height: 1px;
  background: #D9D9D9;
`;

const RowPR = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
    font-family: 'Inter', sans-serif;
    display: grid;
    grid-template-columns: 20% 60% 10% 10%;
    color: black;
    font-size: 15px;
    padding: 10px 0;
    transition: background-color 0.3s ease; /* Add transition effect */
    cursor: pointer;
    &:hover {
        background-color: #F5F5F5; /* Set background color on hover */
    }
    
    `;

const PullReqTitle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    font-size: 12px;

    `;        

    const GreenText = styled.p`
    color: #038800;
    `;

    const RedText = styled.p`
    color: #D33131;
    `;
    
    const Index = styled.p`
    color: #B7B7B7;
    overflow: visible;
    `;

    const TitleOverflow = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    `;

// Usage:



export default function PullRequestRow({index, issue_id, state, forkBranch, title, yes, no}){
    const [yesPercent, setYesPercent] = useState(yes);
    const [noPercent, setNoPercent] = useState(no);
    useEffect(() => {
        setYesPercent(yes);
        setNoPercent(no);
    }, [yes, no]);
    return(
        <div>
            <DividerLine />
            <RowPR>
                <StatusBadge
                 state={state}
                 />
                <PullReqTitle>
                    <Index>#{issue_id.split('_')[1]}&nbsp;</Index>
                   <TitleOverflow>{title}</TitleOverflow>
                </PullReqTitle>
                <GreenText>{yesPercent}%</GreenText>
                <RedText>{noPercent}%</RedText>
            </RowPR>
        </div>
    )
}
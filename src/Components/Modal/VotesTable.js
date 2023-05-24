import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Row from './Row.js';

const VotesTableRow = styled.div`
    display: grid;
    grid-template-columns: 63% 20% 10% 7%;
    color: black;
    justify-items: start;
    padding: 4px 10px 4px 10px;
`;

const RowHeading = styled.h2`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
font-weight: 300;
font-size: 12px;
color: black;
`;

const VoteTableSection = styled.div`
    margin-top: 20px;
    height: 300px;
    overflow-y: auto;
`; 


export default function VotesTable(props){
    const { allVotes } = props;
    return(
        <VoteTableSection>
            <VotesTableRow>
                <RowHeading>CONTRIBUTOR ID</RowHeading>
                <RowHeading>VOTEPOWER</RowHeading>
                <RowHeading>SIDE</RowHeading>
                <RowHeading>AGE</RowHeading>
            </VotesTableRow>
            {allVotes.map((vote, index) => (
                <Row 
                id={vote.contributor_id} 
                votepower={vote.votePower}
                side={vote.side} 
                age={vote.createdAt}
                key={vote.contributor_id}
                index={index}

                />
            ))}
        </VoteTableSection>

    )
}
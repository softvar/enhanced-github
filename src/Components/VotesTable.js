import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Row from './Row.js';

const voteDataFromAPI = [
    {
   "contributor_id": "0x028ddb3289ebe60e9d9a207e623a78e451d881de",
   "side": "yes",
   "votePower": "500000",
   "createdAt": "2023-05-04T15:23:49.279Z"
   },
   {
   "contributor_id": "0x022424432460e9d9a223rr3f23ff32207d322331",
   "side": "no",
   "votePower": "40000",
   "createdAt": "2023-05-04T15:23:50.279Z"
   },
   {
   "contributor_id": "0x049842905ee8be71d8e0387f731a60c1e7f99233",
   "side": "yes",
   "votePower": "300000",
   "createdAt": "2023-05-04T15:25:49.279Z"
   },
   {
   "contributor_id": "0x049842905ee8be71d8e0387f731a60c1e7f99533",
   "side": "yes",
   "votePower": "300000",
   "createdAt": "2023-05-04T15:25:49.279Z"
   },
   {
   "contributor_id": "0x01a3d9216a1fb3c3f3988b7320f244c6b9e2e0c6",
   "side": "no",
   "votePower": "75000",
   "createdAt": "2023-05-04T15:27:50.279Z"
   },
   {
   "contributor_id": "0x033b4d2d4a93e80810429c1e98d63c67b1f15f29",
   "side": "yes",
   "votePower": "200000",
   "createdAt": "2023-05-04T15:29:51.279Z"
   },
   {
   "contributor_id": "0x04e5cb06240d31fba95639e07b8e91d56f22e9d1",
   "side": "no",
   "votePower": "60000",
   "createdAt": "2023-05-04T15:31:52.279Z"
   },
   {
   "contributor_id": "0x023cf3c6e8d6eaae6d16280fc9c2fc5548f6bbd0",
   "side": "yes",
   "votePower": "350000",
   "createdAt": "2023-05-04T15:33:53.279Z"
   },
   ];

const VotesTableRow = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    color:black;

`;

const RowHeading = styled.h2`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
font-family: 'Inter', sans-serif;
font-weight: 400;
font-size: 15px;
color: black;
`;

export default function VotesTable(props){
    return(
        <div className='votes-table'>
            <VotesTableRow>
                <RowHeading>CONTRIBUTOR ID</RowHeading>
                <RowHeading>VOTEPOWER</RowHeading>
                <RowHeading>SIDE</RowHeading>
                <RowHeading>AGE</RowHeading>
            </VotesTableRow>
            {voteDataFromAPI.map((vote, index) => (
                <Row 
                id={vote.contributor_id} 
                votepower={vote.votePower}
                side={vote.side} 
                age={vote.createdAt}
                key={vote.contributor_id}
                index={index}

                />
            ))}
        </div>

    )
}
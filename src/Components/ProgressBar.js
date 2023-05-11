import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const YesBar = styled.div`
    background-color: #038800;
    flex-basis:50%;
`;

const NoBar = styled(YesBar)`
    background-color: #D33131;
    flex-basis:25%;
`;

const RemainingBar = styled(YesBar)`
    background-color: #D9D9D9;
    flex-basis:25%;
`;

const VoteBar = styled.div`
display: flex; 
    height: 5px;
    width: 75%;
    margin: 10px 0 10px 0;
`;

const ProgressBar = (props) => {
    const { yesVotes, noVotes, totalVotes } = props;

    return (
        <VoteBar>
            <YesBar />
            <NoBar />
            <RemainingBar />
        </VoteBar>
    )
}

export default ProgressBar;
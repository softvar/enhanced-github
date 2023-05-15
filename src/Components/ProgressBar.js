import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const YesBar = styled.div`
    background-color: #038800;
    flex-basis:${props => props.flexBasis}%;
`;

const NoBar = styled(YesBar)`
    background-color: #D33131;
    flex-basis:${props => props.flexBasis}%;
`;

const RemainingBar = styled(YesBar)`
    background-color: #D9D9D9;
    flex-basis:${props => props.flexBasis}%;
`;

const VoteBar = styled.div`
display: flex; 
    height: 7px;
    width: 100%;
    margin: 10px auto;
`;

const ProgressBar = (props) => {
    const { yesVotes, noVotes, totalVotes } = props;
    let yesVotesPercent = yesVotes*100;
    let noVotesPercent = noVotes*100;
    let remainingVotesPercent = Math.abs(1 - totalVotes)*100; 

    return (
        <VoteBar>
            <NoBar flexBasis={noVotesPercent} />
            <YesBar flexBasis={yesVotesPercent}/>
            <RemainingBar flexBasis={remainingVotesPercent} />
        </VoteBar>
    )
}

export default ProgressBar;
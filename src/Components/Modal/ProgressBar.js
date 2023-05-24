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
    margin: 15px auto 25px auto;
`;

const ProgressBar = (props) => {
    const { yesVotes, noVotes, totalVotes, quorum } = props;
    let difference = 1/quorum
    let yesVotesPercent = yesVotes*100*difference;
    let noVotesPercent = noVotes*100*difference;
    let remainingVotesPercent = (quorum - totalVotes)*100*difference;

//use conditional jsx to render correct order of bars based on which has the most votes
    return (
        <VoteBar>
        {yesVotesPercent >= noVotesPercent ? (
            <>
                <NoBar flexBasis={noVotesPercent} />
                <YesBar flexBasis={yesVotesPercent} />
            </>
        ) 
        : (
            <>
                <YesBar flexBasis={yesVotesPercent} />
                <NoBar flexBasis={noVotesPercent} />
            </>
        )}
        <RemainingBar flexBasis={remainingVotesPercent} />
    </VoteBar>
    )
}

export default ProgressBar;
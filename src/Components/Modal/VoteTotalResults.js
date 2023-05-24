import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';

const YesVoteFirstNumbers = styled.div`
    display: grid;
    grid-template-columns: ${props => `${props.yesNumbers}% ${props.noNumbers}% ${props.remainingNumbers}%`};
    width: 100%;
    margin: 0 auto;
    justify-items: start;
`;

const NoVoteFirstNumbers = styled(YesVoteFirstNumbers)`
    grid-template-columns: ${props => `${props.noNumbers}% ${props.yesNumbers}% ${props.remainingNumbers}%`};
`;

const Yes = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap');
    color: #038800;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 14px;
    text-align: left;
    margin-top: 6px;
`;

const No = styled(Yes)`
    color: #D33131;
`;

const Results = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
`;

function addCommas(num) {
    let numStr = num.toString();
    let numArr = numStr.split("");
    let firstCommaPos = numArr.length % 3;
    for (let i = firstCommaPos; i < numArr.length; i += 4) {
      numArr.splice(i, 0, ",");
    }
    return numArr.join("");
  }
  
    

const VoteTotalResults = (props) => {
    const { yesPercent, noPercent, totalPercent, yesVotes, noVotes, totalVotes, quorum } = props;
    console.log(yesPercent, noPercent, totalPercent, quorum + "VOTE TOTAL RESULTS");
    let difference = 1/quorum;
    let yesVotesPercent = yesPercent*100;
    let noVotesPercent = noPercent*100;
    let remainingVotesPercent = (totalPercent - yesPercent - noPercent)*100;

    return (
        <Results>
            {yesPercent < noPercent ? (
                <>
                    <YesVoteFirstNumbers
                        yesNumbers={yesVotesPercent}
                        noNumbers={noVotesPercent}
                        remainingNumbers={0.1} >
                                <Yes>{yesVotes}</Yes>
                                <No>{noVotes}</No>
                                <div></div>
                    </YesVoteFirstNumbers>
                </>
            ) : (
                <>
                    <NoVoteFirstNumbers
                        yesNumbers={yesVotesPercent}
                        noNumbers={noVotesPercent}
                        remainingNumbers={0.1} >
                                <No>{noVotes}</No>
                                <Yes>{yesVotes}</Yes>
                                <div></div>
                    </NoVoteFirstNumbers>
               </>
            )}
            
            <ProgressBar yesVotes={yesPercent} noVotes={noPercent} totalVotes={totalPercent} quorum={quorum} />
        </Results>
    )
}
export default VoteTotalResults;
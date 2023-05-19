import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
//create progress bar

const Yes = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
    color: #038800;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
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
    // convert the number to a string
    let numStr = num.toString();
  
    // split the string into an array of characters
    let numArr = numStr.split("");
  
    // determine the position of the first comma
    let firstCommaPos = numArr.length % 3;
  
    // add commas after every third digit starting from the first comma position
    for (let i = firstCommaPos; i < numArr.length; i += 4) {
      numArr.splice(i, 0, ",");
    }
  
    // join the array of characters back into a string
    return numArr.join("");
  }
  

const VoteTotalResults = (props) => {
    const { yesPercent, noPercent, totalPercent, yesVotes, noVotes, totalVotes, quorum } = props;

    return (
        <Results>
            <Yes>{yesVotes}</Yes>
            <No>{noVotes}</No>
            <ProgressBar yesVotes={yesPercent} noVotes={noPercent} totalVotes={totalPercent} quorum={quorum} />
        </Results>
    )
}

export default VoteTotalResults;
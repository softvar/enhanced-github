import React from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';

const Results = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 60px;
  margin-top: 10px;
  `;

const VoteTotalResults = props => {
  const { yesPercent, noPercent, totalPercent, yesVotes, noVotes, totalVotes, quorum } = props;

  return (
    <Results>
      <ProgressBar
        yesPercent={yesPercent}
        yesVotes={yesVotes}
        noPercent={noPercent}
        noVotes={noVotes}
        totalPercent={totalPercent}
        quorum={quorum}
      />
    </Results>
  );
};
export default VoteTotalResults;

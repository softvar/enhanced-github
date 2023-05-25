import React from 'react';
import styled from 'styled-components';

const YesBar = styled.div`
  height: 5px;
  background-color: #038800;
  flex-basis: ${props => props.flexBasis}%;
`;

const NoBar = styled(YesBar)`
  background-color: #d33131;
  flex-basis: ${props => props.flexBasis}%;
`;

const YesTotals = styled(YesBar)`
  background-color: #fff;
  color: #038800;
  height: 10px;
  text-align: right;
  margin-bottom: 2px;
  font-weight: 300;
  flex-basis: ${props => props.flexBasis}%;
`;

const NoTotals = styled(YesTotals)`
  background-color: #fff;
  color: #d33131;
  height: 10px;
  text-align: right;
  margin-bottom: 2px;
  font-weight: 300;
  flex-basis: ${props => props.flexBasis}%;
`;

const RemainingBar = styled(YesBar)`
  background-color: #d9d9d9;
  flex-basis: ${props => props.flexBasis}%;
`;

const VoteBar = styled.div`
  display: flex;
  height: 17px;
  width: 100%;
  margin-bottom: 4px;
  padding: 0px 10px;
`;

const ProgressBar = ({ yesPercent, yesVotes, noPercent, noVotes, totalPercent, quorum }) => {
  let difference = 1 / quorum;
  yesPercent = yesPercent * 100 * difference;
  noPercent = noPercent * 100 * difference;
  let remainingVotesPercent = (quorum - totalPercent) * 100 * difference;

  return (
    <>
      <VoteBar>
        {yesPercent >= noPercent ? (
          <>
            <NoTotals flexBasis={noPercent}>{noVotes >= 1 && noVotes}</NoTotals>
            <YesTotals flexBasis={yesPercent}>{yesVotes >= 1 && yesVotes}</YesTotals>
          </>
        ) : (
          <>
            <YesTotals flexBasis={yesPercent}>{yesVotes >= 1 && yesVotes}</YesTotals>
            <NoTotals flexBasis={noPercent}>{noVotes >= 1 && noVotes}</NoTotals>
          </>
        )}
      </VoteBar>
      <VoteBar>
        {yesPercent >= noPercent ? (
          <>
            <NoBar flexBasis={noPercent} />
            <YesBar flexBasis={yesPercent} />
          </>
        ) : (
          <>
            <YesBar flexBasis={yesPercent} />
            <NoBar flexBasis={noPercent} />
          </>
        )}
        <RemainingBar flexBasis={remainingVotesPercent} />
      </VoteBar>
    </>
  );
};

export default ProgressBar;

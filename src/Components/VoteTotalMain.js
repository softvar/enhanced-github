import React, { useState, useEffect } from 'react';
import { postSetVote, postGetPullRequest, postGetPRvoteYesTotals, postGetPRvoteNoTotals, postGetPRvoteTotals, postCreateRepo, postNewPullRequest, postGetContributorID, postGetContributorName, getGitHubPullRequest } from '../requests';
import styled from 'styled-components';
//import LinearProgress from '@mui/material/LinearProgress';

const VoteText = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
font-family: 'Inter', sans-serif;
color: black;
`;

function VoteTotalMain(props) {
  const [votes, setVotes] = useState(['0.0', '0.0']);
  const { user, repo, issueID, contributorID, contributorName, side } = props;

  useEffect(() => {
    const fetchVoteTotals = async () => {
      try {
        var voteTotalsReact = await postGetPRvoteTotals(user, repo, issueID, contributorID, side);
        var voteYesTotals = await postGetPRvoteYesTotals(user, repo, issueID, contributorID, side);
        var voteNoTotals = await postGetPRvoteNoTotals(user, repo, issueID, contributorID, side);
        console.log('voteYestotals: ' + voteYesTotals);
        console.log('voteNototals: ' + voteNoTotals);
        console.log(props)
        voteTotalsReact = (Number(voteTotalsReact) * 100).toFixed(1).toString();
        if (voteYesTotals && voteNoTotals) {
          voteYesTotals = Number(voteYesTotals);
          voteNoTotals = Number(voteNoTotals);
          voteYesTotals = ((voteYesTotals / (voteYesTotals + voteNoTotals)) * 100).toFixed(1);
          voteNoTotals = (100 - voteYesTotals).toFixed(1);
          const voteArray = [voteYesTotals.toString(), voteNoTotals.toString(), voteTotalsReact];
          setVotes(voteArray);
        } else {
          setVotes(['0.0', '0.0']);
        }
        console.log('status CDMV: ' + voteTotalsReact);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVoteTotals();
  }, [user, repo, issueID, contributorID, side]);

  const handleClick = (e) => {
  };
  return (
    <div>
      <VoteText>Yes {votes[0]}% | No {votes[1]}% </VoteText>
      <VoteText>Total Voted {votes[2]}%</VoteText>


    </div>
  );
}
// progress bar code
// uninstall npm pckgs
//      <LinearProgress color="success" variant="determinate" value={votes[0]} />
//      <LinearProgress color="secondary" variant="determinate" value={votes[1]} /> 

export default VoteTotalMain;

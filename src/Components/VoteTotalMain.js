import React, { useState, useEffect } from 'react';
import { postSetVote, postGetPullRequest, postGetPRvoteYesTotals, postGetPRvoteNoTotals, postGetPRvoteTotals, postCreateRepo, postNewPullRequest, postGetContributorID, postGetContributorName, getGitHubPullRequest } from '../requests';

function VoteTotalMain(props) {
  const [votes, setVotes] = useState(['0.0', '0.0']);
  const { user, repo, issue_id, contributor_id, contributor_name, side } = props;

  useEffect(() => {
    const fetchVoteTotals = async () => {
      try {
        var voteTotalsReact = await postGetPRvoteTotals(user, repo, issue_id, contributor_id, side);
        var voteYesTotals = await postGetPRvoteYesTotals(user, repo, issue_id, contributor_id, side);
        var voteNoTotals = await postGetPRvoteNoTotals(user, repo, issue_id, contributor_id, side);

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
  }, [user, repo, issue_id, contributor_id, side]);

  const handleClick = (e) => {
  };

  return (
    <div>
      <p>Yes {votes[0]}% | No {votes[1]}% </p>
      <p>Total Voted {votes[2]}%</p>
    </div>
  );
}

export default VoteTotalMain;

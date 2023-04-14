import React, { useState } from 'react';
import { postSetVote } from '../requests';

function VoteButton(props) {
  const [voted, setVoted] = useState('');
  const [lastIssueId, setLastIssueId] = useState('');
  const [side, setSide] = useState(props.side);

  if (voted === 'pull' && props.issueID === lastIssueId) {
    return 'Verifying. This may take a few a couple minutes...';
  }
  if (voted === 'problem' && props.issueID === lastIssueId) {
    return 'Something went wrong';
  }
  if (voted === 'notOnGithub' && props.issueID === lastIssueId) {
    return "Pull request isn't valid on github (path to fork doesn't exist).";
  }
  if (voted === 'done' && props.issueID === lastIssueId) {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        user: {props.user} <br />
        repo: {props.repo} <br />
        issue_id: {props.issueID} <br />
        contributor: {props.contributorName} <br />
        side: {props.side} <br />
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        setVoted('valid');
        setLastIssueId(props.issueID);
        setSide(side);
        await postSetVote(props.user, props.repo, props.issueID, props.issueID, false, props.contributorID, side, props.githubUser.token);
        
        setVoted('done');
        setLastIssueId(props.issueID);
        setSide(side);
      }}>
      {props.side}
    </button>
  );
}

export default VoteButton;

import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { postGetPullRequest, postGetPRvoteYesTotals, postGetPRvoteNoTotals } from '../requests';
import commonUtil from '../utils/commonUtil';
import mathUtil from '../utils/mathUtil';
import { Button } from 'react-bootstrap';

export default function VoteStatusButton(props){

    const [user, setUser] = useState(props.user);
    const [repo, setRepo] = useState(props.repo);
    const [issueID, setIssueID] = useState(props.issueID);
    const [contributorID, setContributorID] = useState(props.contributorID);
    const [voteStatusButton, setVoteStatusButton] = useState({ color: 'gray', text: '?' });
    const [tsrcPRStatus, setTsrcPRStatus] = useState(props.tsrcPRstatus || {state: 'vote', mergeableCodeHost: true});
    const [voteYesTotalState, setVoteYesTotalState] = useState(0.0);
    const [voteNoTotalState, setVoteNoTotalState] = useState(0.0);
    const [voteTotals, setVoteTotals] = useState(0);
    const [side, setSide] = useState(props.side);
    const [clicked, setClicked] = useState(props.clicked);
    const buttonStyle = {
      vote: ['lightgreen', 'vote'],
      'pre-open': ['green', voteTotals],
      open: ['orchid', voteTotals],
      conflict: ['orange', 'conflict'],
      merge: ['darkorchid', 'merged'],
      close: ['red', 'closed']
    };

    useEffect(() => {
      const fetchVoteStatus = async () => {
      let textMath = voteStatusButton.textMath;
      let tsrcPRStatusComponent
      try {
          tsrcPRStatusComponent = await postGetPullRequest(
          user,
          repo,
          issueID,
          contributorID,
          side
          );
        const voteYesTotal = await postGetPRvoteYesTotals(
          user,
          repo,
          issueID,
          contributorID,
          ""
        );
        const voteNoTotal = await postGetPRvoteNoTotals(
          user,
          repo,
          issueID,
          contributorID,
          ""
        );
        const resYes = mathUtil.votePercentToMergeInteger(voteYesTotal);
        const resNo = mathUtil.votePercentToMergeInteger(voteNoTotal);
        if (resYes !== null && resNo !== null) {
          textMath = resYes / 2 + resNo / 2;
          setVoteTotals(`${textMath}%`);
        }
        setVoteYesTotalState(voteYesTotal);
        setVoteNoTotalState(voteNoTotal);
        setTsrcPRStatus(tsrcPRStatusComponent);
      } catch (error) {
        console.log('fetchVoteStatus error:', error)
        textMath = "";
      }
        };

        fetchVoteStatus();
    }, [props.clicked]);

    useEffect(() => {
      console.log('tsrcPRStatus:', tsrcPRStatus)
        if(!tsrcPRStatus) {
          return;
        }
        if(!tsrcPRStatus.mergeableCodeHost) {
          tsrcPRStatus.state = 'conflict';
        }
        const buttonColor = buttonStyle[tsrcPRStatus.state][0]
        const buttonText = buttonStyle[tsrcPRStatus.state][1]
        setVoteStatusButton({color: buttonColor, text: buttonText});
    }, [voteYesTotalState, voteNoTotalState, tsrcPRStatus, voteTotals]);

    const handleClick = (e) => {
        e.preventDefault();
    };

    return (
        <Button
        style={{ color: 'white', background: voteStatusButton.color }}
        onClick={handleClick}
        >
        {voteStatusButton.text}
        </Button>
    );
};

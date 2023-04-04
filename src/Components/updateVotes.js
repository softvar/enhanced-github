const updateVotes = async (PR_user, PR_repo, PR_issueID, PR_contributerID, PR_side, PR_status, voteButton_textMath) => {            
  let tsrcPRstatusComponent = await postGetPullRequest(
    PR_user, PR_repo, PR_issueID, PR_contributerID, PR_side
    );
//var textMath = this.state.voteButton.textMath
var textMath = voteButton_textMath
try {
    const voteYesTotal = await postGetPRvoteYesTotals(
      PR_user, PR_repo, PR_issueID, PR_contributerID, ""
    );
    const voteNoTotal = await postGetPRvoteNoTotals(
      PR_user, PR_repo, PR_issueID, PR_contributerID, ""
    );

    const resYes = mathUtil.votePercentToMergeInteger(voteYesTotal)
    const resNo = mathUtil.votePercentToMergeInteger(voteNoTotal)

if (resYes !== null && resNo !== null) {
  textMath = resYes/2 + resNo/2
}
} catch(error) {
textMath = ""
}


  const statusProblemComponent = (tsrcPRstatusComponent === null || tsrcPRstatusComponent  === undefined)

if (statusProblemComponent) {
tsrcPRstatusComponent = {}
     tsrcPRstatusComponent.status = this.state.tsrcPRstatus.status
     tsrcPRstatusComponent.state = this.state.tsrcPRstatus.state
}

  const statusPreOpenComponent = (tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state  === "pre-open")
  //const statusOpenComponent = commonUtil.isObjEqual(tsrcPRstatusComponent, { status: 200, type: 0 } );
  const statusOpenComponent = (tsrcPRstatusComponent.status === 200 &&  tsrcPRstatusComponent.state  === "open")
  //const statusClosedComponent = commonUtil.isObjEqual(tsrcPRstatusComponent, { status: 200, type: 1 } );
  const statusClosedComponent = (tsrcPRstatusComponent.status === 200 &&  tsrcPRstatusComponent.state  === "close")
  //const statusMergedComponent = commonUtil.isObjEqual(tsrcPRstatusComponent, { status: 200, type: 2 } );
  const statusMergedComponent = (tsrcPRstatusComponent.status === 200 &&  tsrcPRstatusComponent.state === "merge")

//const checkVoteButtonOpen = (textMath !== null && textMath !== textMathLast);
const checkVoteButtonPreOpen = commonUtil.isObjEqual(this.state.voteButton, { color: 'green', text: `${textMath}%` } );
const checkVoteButtonOpen = commonUtil.isObjEqual(this.state.voteButton, { color: 'orchid', text: `${textMath}%` } );
const checkVoteButtonClosed = commonUtil.isObjEqual(this.state.voteButton, { color: 'red', text: 'closed' } );
const checkVoteButtonMerged = commonUtil.isObjEqual(this.state.voteButton, { color: 'darkorchid', text: 'merged' } );
const checkVoteButtonVote = commonUtil.isObjEqual(this.state.voteButton, { color: 'lightgreen', text: 'vote' } );
const checkVoteButtonConflict = commonUtil.isObjEqual(this.state.voteButton, { color: 'orange', text: 'conflict' } );
const checkVoteButtonProblem = commonUtil.isObjEqual(this.state.voteButton, { color: 'gray', text: '?' } );

modalDisplay = 'hide' // only show modal if open or on vote.
  if (statusPreOpenComponent) {
modalDisplay = 'show'
  //if (statusOpenComponent && gitHubPRstatus.mergeable) {
if (!checkVoteButtonPreOpen) {
       this.setState({ voteButton: { color: 'green', text: `${textMath}%` } });
} else {
      this.setState({tsrcPRstatus: tsrcPRstatusComponent });
}
} else if (statusOpenComponent) {
  //if (statusOpenComponent && gitHubPRstatus.mergeable) {
modalDisplay = 'show'
if (!checkVoteButtonOpen) {
       this.setState({ voteButton: { color: 'orchid', text: `${textMath}%` } });
} else {
      this.setState({tsrcPRstatus: tsrcPRstatusComponent });
}
  } else if (statusClosedComponent) {
if (!checkVoteButtonClosed) {
      this.setState({ voteButton: { color: 'red', text: 'closed' } });
} else {
      this.setState({tsrcPRstatus: tsrcPRstatusComponent });
}
  } else if (statusMergedComponent) {
if (!checkVoteButtonMerged) {
      this.setState({ voteButton: { color: 'darkorchid', text: 'merged' } });
} else {
      this.setState({tsrcPRstatus: tsrcPRstatusComponent });
}
} else if (tsrcPRstatusComponent.mergeableCodeHost === true) {
modalDisplay = 'show'
if (!checkVoteButtonVote) {
      this.setState({ voteButton: { color: 'lightgreen', text: 'vote' } });
} else {
      this.setState({tsrcPRstatus: tsrcPRstatusComponent });
}
} else if (tsrcPRstatusComponent.mergeableCodeHost === false) {
if (!checkVoteButtonConflict) {
      this.setState({ voteButton: { color: 'orange', text: 'conflict' } });
} else {
      this.setState({tsrcPRstatus: tsrcPRstatusComponent });
}
} else if (tsrcPRstatusComponent.mergeableCodeHost === true) {
      this.setState({ voteButton: { color: 'lightgreen', text: 'vote' } });
  } else {
if (!checkVoteButtonProblem) {
      this.setState({ voteButton: { color: 'gray', text: '?' } });
} else {
      this.setState({tsrcPRstatus: tsrcPRstatusComponent });
}
}

};

import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { postGetPullRequest, postGetPRvoteYesTotals, postGetPRvoteNoTotals } from '../../requests';
import commonUtil from '../../utils/commonUtil';
import mathUtil from '../../utils/mathUtil';
import { Button } from 'react-bootstrap';
import RefreshButton from './RefreshButton';
//let modalDisplay = 'hide';
let clickedRefresh = false;

export default function FuncTurboSrcButtonOpen(props){
  const [user, setUser] = useState(props.user);
  const [repo, setRepo] = useState(props.repo);
  const [issueID, setIssueID] = useState(props.issueID);
  const [contributorName, setContributorName] = useState(props.contributorName);
  const [contributorID, setContributorID] = useState(props.contributorID);
  const [background, setBackground] = useState('white');
  const [voteButton, setVoteButton] = useState({ color: 'gray', text: '?' });
  const [tsrcPRstatus, setTsrcPRstatus] = useState(props.tsrcPRstatus);
  const [voteYesTotalState, setVoteYesTotalState] = useState(0.0);
  const [voteNoTotalState, setVoteNoTotalState] = useState(0.0);
  const [textMath, setTextMath] = useState(0);
  const [side, setSide] = useState(props.side);
  const [clicked, setClicked] = useState(props.clicked);
  const handleClick = e => {
    e.preventDefault();
    //modal.style.display = "none";
  };
  //lifting state up from refresh button component in order to detect mouseclicks 
  //render(React.createElement(RefreshButton, {refresh: handleRefresh}), document.getElementById('js-flash-container'));
  useEffect(() => {
    
    (async () => {
      //setClicked(props.clicked);
      console.log("It's working!");
      let tsrcPRstatusComponent = tsrcPRstatus;
      let textMath = voteButton.textMath;
      try {
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
        }
        setVoteYesTotalState(voteYesTotal);
        setVoteNoTotalState(voteNoTotal);
        setTextMath(textMath);

      } catch (error) {
        textMath = "";
      }
      console.log("tsrcPRstatusComponent: ", tsrcPRstatusComponent);
      
      setTsrcPRstatus(tsrcPRstatusComponent);
          
        })();
  }, [props.clicked]);

  useEffect(() => {
    if (props.tsrcPRstatus.status === 404 || props.tsrcPRstatus === undefined){
      setVoteButton({ color: 'gray', text: '?' });
    }
    if (tsrcPRstatus.status === 200 && tsrcPRstatus.state === "pre-open"){
      setVoteButton({ color: 'green', text: `${textMath}%` });
    }
    else if (tsrcPRstatus.status === 200 && tsrcPRstatus.state === "open"){
      setVoteButton({ color: 'orchid', text: `${textMath}%` });
    }
    else if (tsrcPRstatus.status === 200 && tsrcPRstatus.state === "close"){
      setVoteButton({ color: 'red', text: 'closed' });
    }
    else if (tsrcPRstatus.status === 200 && tsrcPRstatus.state === "merge"){
      setVoteButton({ color: 'darkorchid', text: 'merged' });
    }
    else if (tsrcPRstatus.status === 200 && tsrcPRstatus.state === "vote"){
      setVoteButton({ color: 'lightgreen', text: 'vote' });
    }
    else if (tsrcPRstatus.status === 200 && tsrcPRstatus.state === "conflict"){
      setVoteButton({ color: 'orange', text: 'conflict' });
    }
  }, [tsrcPRstatus, props.tsrcPRstatus]);

  return (
    <Button
      // variant="open" className="textColor bgColor"
      style={{ color: 'white', background: voteButton.color }}
      onClick={handleClick}
    >
      {voteButton.text}
    </Button>
  );
}

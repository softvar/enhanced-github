import React from 'react';
const { postGetPullRequest, // updated
    postGetPRvoteYesTotals,
    postGetPRvoteNoTotals
  } = require('../requests')
const commonUtil = require('../utils/commonUtil');
const mathUtil = require('../utils/mathUtil');
const { Button } = require('react-bootstrap');
var modalDisplay = 'hide';
export default class TurboSrcButtonOpen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: this.props.user,
        repo: this.props.repo,
        issueID: this.props.issueID,
        contributorName: this.props.contributorName,
        contributorID: this.props.contributorID,
        background: 'white',
        dynamicBool: true,
    voteButton: { color: 'gray', text: '?' },
    tsrcPRstatus: this.props.tsrcPRstatus,
    voteYesTotal: 0.0,
    textMath: 0,
    side: this.props.side
      };
    }

    componentDidMount() {
      setTimeout(() => {
        (async () => {
            console.log(this.state.user,
                this.state.repo,
                this.state.issueID,
                this.state.contributorID,
                this.state.side + "All I have at the very very begnmning of the component did mount")
      let tsrcPRstatusComponent = this.state.tsrcPRstatus
      console.log(this.state.tsrcPRstatus + "this is tsrcPRstatusComponent");

      var textMath = this.state.voteButton.textMath
      try {
            const voteYesTotal = await postGetPRvoteYesTotals(
                /*owner:*/ this.state.user,
                /*repo:*/ this.state.repo,
                /*pr_id:*/ this.state.issueID,
                /*contributor_id:*/ this.state.contributorID,
                /*side:*/ "",
            );
            const voteNoTotal = await postGetPRvoteNoTotals(
                /*owner:*/ this.state.user,
                /*repo:*/ this.state.repo,
                /*pr_id:*/ this.state.issueID,
                /*contributor_id:*/ this.state.contributorID,
                /*side:*/ "",
            );
            const resYes = mathUtil.votePercentToMergeInteger(voteYesTotal)
            const resNo = mathUtil.votePercentToMergeInteger(voteNoTotal)
    if (resYes !== null && resNo !== null) {
          textMath = resYes/2 + resNo/2
    }
      } catch(error) {
      }
      console.log('tsrcPRstatusComponent ', tsrcPRstatusComponent)
          const statusProblemComponent = (tsrcPRstatusComponent === null || tsrcPRstatusComponent  === undefined)
      if (statusProblemComponent) {
     tsrcPRstatusComponent = {}
             tsrcPRstatusComponent.mergeableCodeHost = true
             tsrcPRstatusComponent.status = 404
             tsrcPRstatusComponent.state = ""
      }

          //const statusOpenComponent = commonUtil.isObjEqual(tsrcPRstatusComponent, { status: 200, type: 0 } );
          const statusPreOpenComponent = (tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state  === "pre-open")
          const statusOpenComponent = (tsrcPRstatusComponent.status === 200 &&  tsrcPRstatusComponent.state  === "open")
          //const statusClosedComponent = commonUtil.isObjEqual(tsrcPRstatusComponent, { status: 200, type: 1 } );
          const statusClosedComponent = (tsrcPRstatusComponent.status === 200 &&  tsrcPRstatusComponent.state  === "close")
          //const statusMergedComponent = commonUtil.isObjEqual(tsrcPRstatusComponent, { status: 200, type: 2 } );
          const statusMergedComponent = (tsrcPRstatusComponent.status === 200 &&  tsrcPRstatusComponent.state === "merge")
      
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
    }
      } else if (statusOpenComponent) {
        modalDisplay = 'show'
          //if (statusOpenComponent && gitHubPRstatus.mergeable) {
    if (!checkVoteButtonOpen) {
               this.setState({ voteButton: { color: 'orchid', text: `${textMath}%` } });
    }
          } else if (statusClosedComponent) {
    if (!checkVoteButtonClosed) {
              this.setState({ voteButton: { color: 'red', text: 'closed' } });
        }
          } else if (statusMergedComponent) {
    if (!checkVoteButtonMerged) {
              this.setState({ voteButton: { color: 'darkorchid', text: 'merged' } });
        }
      } else if (tsrcPRstatusComponent.mergeableCodeHost === true) {
        modalDisplay = 'show'
    if (!checkVoteButtonVote) {
              this.setState({ voteButton: { color: 'lightgreen', text: 'vote' } });
    }
      } else if (tsrcPRstatusComponent.mergeableCodeHost === false) {
    if (!checkVoteButtonConflict) {
              this.setState({ voteButton: { color: 'orange', text: 'conflict' } });
    }
          } else {
    if (!checkVoteButtonProblem) {
              this.setState({ voteButton: { color: 'gray', text: '?' } });
    }
          }

      // For modal.style.display (how it knows to popup if vote button clicked).
        })();
      });
    }

    componentDidUpdate() {
      setTimeout(() => {
        (async () => {
            console.log(this.state.user,
                this.state.repo,
                this.state.issueID,
                this.state.contributorID,
                this.state.side + "this is everything")
          let tsrcPRstatusComponent = await postGetPullRequest(
              this.state.user,
              this.state.repo,
              this.state.issueID,
              this.state.contributorID,
              this.state.side
            );
      var textMath = this.state.voteButton.textMath
      try {
            const voteYesTotal = await postGetPRvoteYesTotals(
                /*owner:*/ this.state.user,
                /*repo:*/ this.state.repo,
                /*pr_id:*/ this.state.issueID,
                /*contributor_id:*/ this.state.contributorID,
                /*side:*/ "",
            );
            const voteNoTotal = await postGetPRvoteNoTotals(
                /*owner:*/ this.state.user,
                /*repo:*/ this.state.repo,
                /*pr_id:*/ this.state.issueID,
                /*contributor_id:*/ this.state.contributorID,
                /*side:*/ "",
            );
    console.log('voteYes ', voteYesTotal)
    console.log('voteYNo ', voteNoTotal)
            const resYes = mathUtil.votePercentToMergeInteger(voteYesTotal)
            const resNo = mathUtil.votePercentToMergeInteger(voteNoTotal)
    console.log('resYes ', resYes)
    console.log('resNo ', resNo)
    if (resYes !== null && resNo !== null) {
          textMath = resYes/2 + resNo/2
    }
      } catch(error) {
    textMath = ""
      }


      console.log('update tsrcPRstatusComponent ', tsrcPRstatusComponent)
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
    console.log('made it')
    if (!checkVoteButtonProblem) {
              this.setState({ voteButton: { color: 'gray', text: '?' } });
    } else {
              this.setState({tsrcPRstatus: tsrcPRstatusComponent });
        }
      }
        })();
      }, 5000);
    }
    render() {
      const handleClick = e => {
        e.preventDefault();
        //modal.style.display = "none";
      };
      return (
        <Button
          // variant="open" className="textColor bgColor"
          style={{ color: 'white', background: this.state.voteButton.color }}
          onClick={handleClick}
        >
          {this.state.voteButton.text}
        </Button>
      );
    }
  }

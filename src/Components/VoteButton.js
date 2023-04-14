import React from 'react';
const { postSetVote } = require('../requests');
const ce = React.createElement;
export default class VoteButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = { voted: '', lastIssueId: '', side: this.props.side };
    }

    render() {
      if (this.state.voted === 'pull' && this.props.issueID === this.state.lastIssueId) {
        return 'Verifying. This may take a few a couple minutes...';
      }
      if (this.state.voted === 'problem' && this.props.issueID === this.state.lastIssueId) {
        return 'Something went wrong';
      }
      if (this.state.voted === 'notOnGithub' && this.props.issueID === this.state.lastIssueId) {
        return "Pull request isn't valid on github (path to fork doesn't exist).";
      }
      if (this.state.voted === 'done' && this.props.issueID === this.state.lastIssueId) {
        //const voteData = votes.closest("[data-index]")
        //console.log(JSON.parse(voteJSON).issue_id)

        //return turboBtnData['turbo-btn-data']['issue_id']

        return (
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            user: {this.props.user} <br />
            repo: {this.props.repo} <br />
            issue_id: {this.props.issueID} <br />
            contributor: {this.props.contributorName} <br />
            side: {this.props.side} <br />
          </div>
        );
      }

      return ce(
        'button',
        {
          onClick: () => {
            (async () => {

              this.setState({ voted: 'valid', lastIssueId: this.props.issueID, side: this.state.side });
              
              await postSetVote(this.props.user, this.props.repo, this.props.issueID, this.props.issueID, false, this.props.contributorID, this.state.side, this.props.githubUser.token);
              this.setState({ voted: 'done', lastIssueId: this.props.issueID, side: this.state.side });
              //var forkStatus = await postGetPRforkStatus(user, repo, issue_id, contributor_id);
              //console.log('fork status');
              //console.log(forkStatus);
              //if (forkStatus === 'notOnGithub') {
              //  console.log('notOnGithub');
              //  this.setState({ voted: 'notOnGithub', lastIssueId: issue_id, side: this.state.side });
              //} else if (forkStatus === 'valid') {
              //  console.log('valid', user, repo, issue_id, contributor_id, this.state.side);
              //  await postSetVote(user, repo, issue_id, contributor_id, this.state.side);
              //  this.setState({ voted: 'done', lastIssueId: issue_id, side: this.state.side });
              //} else if (forkStatus === 'pull') {
              //  console.log('i 201');
              //  this.setState({ voted: 'pull', lastIssueId: issue_id, side: this.state.side });
              //  console.log('i 203');
              //  console.log(user);
              //  console.log(repo);
              //  console.log(issue_id);
              //  console.log(contributor_id);
              //  console.log(this.state.side);
              //  console.log('i 209');
              //  await postPullFork(user, repo, issue_id, contributor_id, this.state.side);
              //  console.log('i 211');
              //  forkStatus = await postGetPRforkStatus(user, repo, issue_id, contributor_id, this.state.side);
              //  console.log('i 213');
              //  if (forkStatus === 'valid') {
              //    this.setState({ voted: 'valid', lastIssueId: issue_id, side: this.state.side });
              //    await postSetVote(user, repo, issue_id, contributor_id, this.state.side);
              //    this.setState({ voted: 'done', lastIssueId: issue_id, side: this.state.side });
              //  } else {
              //    this.setState({ voted: 'problem', lastIssueId: issue_id, side: this.state.side });
              //  }
              //} else {
              //  this.setState({ voted: 'problem', lastIssueId: issue_id, side: this.state.side });
              //}
            })();
          }
        },
        this.props.side
      );
    }
  } 

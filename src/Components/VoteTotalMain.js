import React from 'react';
const { postSetVote,
  postGetPullRequest, // updated
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
  postGetPRvoteTotals,
  postCreateRepo,
  postNewPullRequest,
  postGetContributorID,
  postGetContributorName,
  getGitHubPullRequest
} = require('../requests')
export default class VoteTotalMain extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        user: this.props.user,
        repo: this.props.repo,
        issueID: this.props.issue_id,
        contributorID: this.props.contributor_id,
        contributorName: this.props.contributor_name,
        votes: ['0.0', '0.0']
      }; 
    }

    componentDidMount() {
      console.log(this.props);
      setTimeout(() => {
        (async () => {
          var voteTotalsReact = await postGetPRvoteTotals(
            this.props.user,
            this.props.repo,
            this.props.issueID,
            this.props.contributorID,
            this.props.side
          );
          var voteYesTotals = await postGetPRvoteYesTotals(
            this.props.user,
            this.props.repo,
            this.props.issueID,
            this.props.contributorID,
            this.props.side
          );
          var voteNoTotals = await postGetPRvoteNoTotals(
            this.props.user,
            this.props.repo,
            this.props.issueID,
            this.props.contributorID,
            this.props.side
          );

          voteTotalsReact = (Number(voteTotalsReact) * 100).toFixed(1).toString();
          if (voteYesTotals && voteNoTotals) {
            voteYesTotals = Number(voteYesTotals);
            voteNoTotals = Number(voteNoTotals);
            voteYesTotals = ((voteYesTotals / (voteYesTotals + voteNoTotals)) * 100).toFixed(1);
            voteNoTotals = (100 - voteYesTotals).toFixed(1);
            //this.setState({voteTotals: voteTotalsReact})
            const voteArray = [voteYesTotals.toString(), voteNoTotals.toString(), voteTotalsReact];
            this.setState({ votes: voteArray });
            //this.setState({voteNoTotals: voteNoTotals})
          } else {
            //this.setState({voteTotals: "0.0"})
            this.setState({ votes: ['0.0', '0.0'] });
            //this.setState({voteNoTotals: "0.0"})
          }
          console.log('status CDMV: ' + voteTotalsReact);
        })();
        //this.setState({background: "yellow"})
      });
    }

    componentDidUpdate() {
      setTimeout(() => {
        //(async () => {
        //  var voteTotalsReact = await postGetPRvoteTotals(
        //    this.state.user,
        //    this.state.repo,
        //    this.state.issueID,
        //    this.state.contributorID,
        //    this.state.side
        //  );
        //  var voteYesTotals = await postGetPRvoteYesTotals(
        //    this.state.user,
        //    this.state.repo,
        //    this.state.issueID,
        //    this.state.contributorID,
        //    this.state.side
        //  );
        //  var voteNoTotals = await postGetPRvoteNoTotals(
        //    this.state.user,
        //    this.state.repo,
        //    this.state.issueID,
        //    this.state.contributorID,
        //    this.state.side
        //  );

        //  voteTotalsReact = (Number(voteTotalsReact) * 100).toFixed(1).toString();
        //  if (voteYesTotals && voteNoTotals) {
        //    voteYesTotals = Number(voteYesTotals);
        //    voteNoTotals = Number(voteNoTotals);
        //    voteYesTotals = ((voteYesTotals / (voteYesTotals + voteNoTotals)) * 100).toFixed(1);
        //    voteNoTotals = (100 - voteYesTotals).toFixed(1);
        //    //this.setState({voteTotals: voteTotalsReact})
        //    const voteArray = [voteYesTotals.toString(), voteNoTotals.toString(), voteTotalsReact];
        //    this.setState({ votes: voteArray });
        //    //this.setState({voteNoTotals: voteNoTotals})
        //  } else {
        //    //this.setState({voteTotals: "0.0"})
        //    this.setState({ votes: ['0.0', '0.0'] });
        //    //this.setState({voteNoTotals: "0.0"})
        //  }
        //  //console.log('status CDUV: ' + voteTotalsReact)
        //})();
      }, 5000);
    }
    render() {
      const handleClick = e => {
        //console.log('handleClick')
        //modal.style.display = "none";
      };
      return (
        <div>
          <p>
            Yes {this.state.votes[0]}% | No {this.state.votes[1]}%{' '}
          </p>
          <p>Total Voted {this.state.votes[2]}%</p>
        </div>
      );
    }
  }
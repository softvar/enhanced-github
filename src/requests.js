const superagent = require('superagent');
const CONFIG = require('./config.js');

//const port = "http://localhost:4000";

//const port = "https://turbosrc-service.fly.dev"
//const port = "https://turbosrc-marialis.dev";

const url = CONFIG.url;
const turboSrcID = CONFIG.turboSrcID

async function postCreateUser(owner, repo, contributor_id, contributor_name, contributor_signature, token) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ createUser(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}", token: "${token}") }`
    })
    .set('accept', 'json');

  const json = JSON.parse(res.text);
  return json.data.createUser;
}

async function postGetContributorName(owner, repo, defaultHash, contributor_id) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getContributorName(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  console.log('gqlr 123');
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getContributorName;
}

async function postGetContributorID(owner, repo, defaultHash, contributor_name) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getContributorID(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_name: "${contributor_name}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  console.log('gqlr 123');
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getContributorID;
}

async function postGetContributorSignature(owner, repo, defaultHash, contributor_id) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getContributorSignature(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  console.log('gqlr 145');
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getContributorSignature;
}
async function postFindOrCreateUser(owner, repo, contributor_id, contributor_name, contributor_signature, token) {
  console.log('extension findOrCreateUser called');
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ findOrCreateUser(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}", token: "${token}") {contributor_name, contributor_id, contributor_signature, token}}`
    })
    .set('accept', 'json');
  const json = JSON.parse(res.text);
  return json.data.findOrCreateUser;
}
async function postCheckGithubTokenPermissions(owner, repo, contributor_name, token) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ checkGithubTokenPermissions(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", contributor_name: "${contributor_name}", token: "${token}") { public_repo_scopes, push_permissions }}`
    })
    .set('accept', 'json');
  const json = JSON.parse(res.text);
  return json.data.checkGithubTokenPermissions;
}
async function postCreateRepo(owner, repo, defaultHash, contributor_id, side, token) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ createRepo(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}", token: "${token}") }`
    })
    .set('accept', 'json');

  const json = JSON.parse(res.text);
  return json.data.createRepo;
}

async function postGetVotePowerAmount(owner, repo, defaultHash, contributor_id, side, token) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getVotePowerAmount(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}", token: "${token}") { status, amount } }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body

    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getVotePowerAmount;
}

async function postTransferTokens(owner, repo, from, to, amount, token) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ transferTokens(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", from: "${from}", to: "${to}", amount: ${amount}, token: "${token}") { status, repo, from, to, amount, createdAt, network, id } }`
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  return json.data.transferTokens;
}

async function postNewPullRequest(owner, repo, defaultHash, contributor_id, side) {
  superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ newPullRequest(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json')
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function postSetVote(owner, repo, defaultHash, childDefaultHash, mergeable, contributor_id, side, token) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ setVote(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", childDefaultHash: "${childDefaultHash}", mergeable: ${mergeable}, contributor_id: "${contributor_id}", side: "${side}", token: "${token}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //   .end((err, res) => {
  //      Calling the end function will send the request
  //   });
  const json = JSON.parse(res.text);
  return json.data.setVote;
}

async function getRepoStatus(repo_id) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ getRepoStatus(turboSrcID: "${turboSrcID}", repo_id: "${repo_id}" ) { status, exists } }`
    })
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  return json.data.getRepoStatus;
}

async function get_authorized_contributor(contributor_id, repo_id) {
  return await superagent
    .post(`${url}`)
    .send({
      query: `{ getAuthorizedContributor(turboSrcID: "${turboSrcID}", contributor_id: "${contributor_id}", repo_id: "${repo_id}") }`
    })
    .set('accept', 'json');
}

async function postPullFork(owner, repo, issue_id, contributor_id) {
  return await superagent
    .post('http://localhost:4001/graphql')
    .send({
      query: `{ getPRfork(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`
    }) // sends a JSON post body
    .set('accept', 'json');
}

async function postGetPRforkStatus(owner, repo, issue_id, contributor_id) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ getPRforkStatus(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`
    }) // sends a JSON post body
    .set('accept', 'json');
  //const resJSON = JSON.parseFromString(res.text)
  //console.log(resJSON)
  //return resJSON.data.getPRforkStatus
  const json = JSON.parse(res.text);
  return json.data.getPRforkStatus;
}

async function postGetPullRequest(owner, repo, defaultHash, contributor_id, side) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ getPullRequest(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") { status, state, repo_id, fork_branch, defaultHash, childDefaultHash, mergeableCodeHost } }`
    })
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  return json.data.getPullRequest;
}

async function postGetPRpercentVotedQuorum(owner, repo, defaultHash, contributor_id, side) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getPRvoteTotals(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.percentVotedQuorum;
}

async function postGetPRvoteTotals(owner, repo, defaultHash, contributor_id, side) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getPRvoteTotals(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getPRvoteTotals;
}

async function postGetPRvoteYesTotals(owner, repo, defaultHash, contributor_id, side) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getPRvoteYesTotals(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  //console.log(json)
  return json.data.getPRvoteYesTotals;
}

async function postGetPRvoteNoTotals(owner, repo, defaultHash, contributor_id, side) {
  const res = await superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getPRvoteNoTotals(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  //console.log(json)
  return json.data.getPRvoteNoTotals;
}

async function postClosePullRequest(owner, repo, defaultHash, contributor_id, side) {
  superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ closePullRequest(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json')
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function postMergePullRequest(owner, repo, defaultHash, contributor_id, side) {
  superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(defaultHash: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(defaultHash: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(defaultHash: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ mergePullRequest(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`
      }
      //{ query: '{ setVote(defaultHash: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json')
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function postCreatePullRequest(owner, repo, fork_branch, issue_id, title) {
  superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ createPullRequest(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", fork_branch: "${fork_branch}", pr_id: "${issue_id}", title: "${title}") }`
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json')
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function postFork(owner, repo, org) {
  superagent
    .post(`${url}`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      { query: `{ fork(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", org: "${org}") }` }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set('accept', 'json')
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function getGitHubPullRequest(owner, repo, defaultHash) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ getGitHubPullRequest(turboSrcID: "${turboSrcID}", owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}") { status, mergeable, mergeCommitSha, state, baseBranch } }`
    })
    .set('accept', 'json');
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  return json.data.getGitHubPullRequest;
}

async function postGetRepoData(repo_id, contributor_id) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `{ getRepoData(turboSrcID: "${turboSrcID}", repo_id: "${repo_id}", contributor_id: "${contributor_id}")
    {   
      status, 
      repo_id,
      owner,
      contributor_id,
      head,
      quorum,
      contributor { 
        contributor_id,
        contributor,
        votePower,
      }, 
    pullRequests { 
      state,
      repo_id,
      issue_id,
      title,
      forkBranch,
      baseBranch,
      defaultHash,
      childDefaultHash,
      head,
      defaultHash,
      remoteURL
    voteData {
      contributor {
      contributor_id,
      voted,
      side,
      votePower,
      createdAt,
      },
    voteTotals {
      yesPercent,
      noPercent,
      totalVotes,
      totalYesVotes,
      totalNoVotes,
    },
    votes {
      contributor_id,
      side,
      votePower,
      createdAt
    }
  }
} 
} 
}`
    })
    .set('accept', 'json');
  const json = JSON.parse(res.text);
  return json.data.getRepoData;
}
async function postGetVotes(repo, defaultHash, contributor_id) {
  const res = await superagent
    .post(`${url}`)
    .send({
      query: `
      { getVotes(turboSrcID: "${turboSrcID}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id:"${contributor_id}") 
      { status, repo_id, title, head, remoteURL, baseBranch, forkBranch, childDefaultHash, defaultHash, mergeable, state
        voteData {
          contributor {
            voted, side, votePower, createdAt, contributor_id
          },
          voteTotals {
            totalVotes, totalYesVotes, totalNoVotes, votesToQuorum, votesToMerge, votesToClose, totalVotePercent, yesPercent, noPercent, quorum
          },
          votes { contributor_id, side, votePower, createdAt }
          },
        }
}
    `
    })
    .set('accept', 'json');
  const json = JSON.parse(res.text);
  return json.data.getVotes;
}

export {
  postCreateUser,
  postGetContributorName,
  postGetContributorID,
  postGetContributorSignature,
  postCheckGithubTokenPermissions,
  postFindOrCreateUser,
  postCreateRepo,
  postGetVotePowerAmount,
  postTransferTokens,
  postNewPullRequest,
  postSetVote,
  getRepoStatus,
  get_authorized_contributor,
  postPullFork,
  postGetPRforkStatus,
  postGetPullRequest,
  postGetPRpercentVotedQuorum,
  postGetPRvoteTotals,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
  postMergePullRequest,
  postCreatePullRequest,
  postFork,
  getGitHubPullRequest,
  postGetRepoData,
  postGetVotes
};

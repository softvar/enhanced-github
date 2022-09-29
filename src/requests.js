const superagent = require("superagent");

const port = "http://localhost:4000"

async function postCreateUser(
  owner,
  repo,
  contributor_id,
  contributor_name,
  contributor_signature,
  token
) {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createUser(owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}", token: "${token}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createUser;
}

async function postGetContributorName(owner, repo, issue_id, contributor_id) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getContributorName(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  console.log("gqlr 123");
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getContributorName;
}

async function postGetContributorID(owner, repo, issue_id, contributor_name) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getContributorID(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_name: "${contributor_name}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  console.log("gqlr 123");
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getContributorID;
}

async function postGetContributorSignature(
  owner,
  repo,
  issue_id,
  contributor_id
) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getContributorSignature(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  console.log("gqlr 145");
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getContributorSignature;
}

async function postCreateRepo(owner, repo, issue_id, contributor_id, side) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ createRepo(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.createRepo;
}

async function postGetContributorTokenAmount(
   owner,
   repo,
   pr_id,
   contributor_id,
   side,
   token
) {
  const res = await superagent
    .post(`${port}/graphql`)
      .send({
        query: `{ getContributorTokenAmount(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}", token: "${token}") { status, amount } }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorTokenAmount;
}

async function postTransferTokens(owner, repo, from, to, amount, token) {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ transferTokens(owner: "${owner}", repo: "${repo}", from: "${from}", to: "${to}", amount: "${amount}", token: "${token}") }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //   .end((err, res) => {
    // Calling the end function will send the request
    //   });
    const json = JSON.parse(res.text);
    return json.data.transferTokens;
  }

async function postNewPullRequest(owner, repo, issue_id, contributor_id, side) {
  superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ newPullRequest(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json")
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function postSetVote(owner, repo, issue_id, contributor_id, side) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ setVote(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //   .end((err, res) => {
  //      Calling the end function will send the request
  //   });
  const json = JSON.parse(res.text);
  return json.data.setVote;
} 

  async function getRepoStatus(repo_id) {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getRepoStatus(repo_id: "${repo_id}" ) { status, exists } }`
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getRepoStatus;
  }

async function get_authorized_contributor(contributor_id, repo_id) {
  return await superagent
    .post(`${port}/graphql`)
    .send({
      query: `{ getAuthorizedContributor(contributor_id: "${contributor_id}", repo_id: "${repo_id}") }`,
    })
    .set("accept", "json");
}

async function postPullFork(owner, repo, issue_id, contributor_id) {
  return await superagent
    .post("http://localhost:4001/graphql")
    .send({
      query: `{ getPRfork(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`,
    }) // sends a JSON post body
    .set("accept", "json");
}

async function postGetPRforkStatus(owner, repo, issue_id, contributor_id) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send({
      query: `{ getPRforkStatus(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`,
    }) // sends a JSON post body
    .set("accept", "json");
  //const resJSON = JSON.parseFromString(res.text)
  //console.log(resJSON)
  //return resJSON.data.getPRforkStatus
  const json = JSON.parse(res.text);
  return json.data.getPRforkStatus;
}

async function postGetPRvoteStatus(owner, repo, pr_id, contributor_id, side) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send({
      query: `{ getPRvoteStatus(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") { status, type } }`,
    })
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  return json.data.getPRvoteStatus;
}

async function postGetPRpercentVotedQuorum(
  owner,
  repo,
  issue_id,
  contributor_id,
  side
) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getPRvoteTotals(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.percentVotedQuorum;
}

async function postGetPRvoteTotals(owner, repo, issue_id, contributor_id, side) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getPRvoteTotals(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  console.log(json);
  return json.data.getPRvoteTotals;
}

async function postGetPRvoteYesTotals(
  owner,
  repo,
  issue_id,
  contributor_id,
  side
) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getPRvoteYesTotals(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  //console.log(json)
  return json.data.getPRvoteYesTotals;
}

async function postGetPRvoteNoTotals(
  owner,
  repo,
  issue_id,
  contributor_id,
  side
) {
  const res = await superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ getPRvoteNoTotals(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json");
  //.end((err, res) => {
  // Calling the end function will send the request
  //});
  const json = JSON.parse(res.text);
  //console.log(json)
  return json.data.getPRvoteNoTotals;
}

async function postClosePullRequest(owner, repo, issue_id, contributor_id, side) {
  superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ closePullRequest(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json")
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function postMergePullRequest(owner, repo, issue_id, contributor_id, side) { 
  superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ mergePullRequest(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json")
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function postCreatePullRequest(owner, repo, fork_branch, issue_id, title) {
  superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      {
        query: `{ createPullRequest(owner: "${owner}", repo: "${repo}", fork_branch: "${fork_branch}", pr_id: "${issue_id}", title: "${title}") }`,
      }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json")
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function postFork(owner, repo, org) {
  superagent
    .post(`${port}/graphql`)
    .send(
      //{ query: '{ name: 'Manny', species: 'cat' }' }
      //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
      //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
      //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
      //{ query: `{ getVoteEverything }` }
      { query: `{ fork(owner: "${owner}", repo: "${repo}", org: "${org}") }` }
      //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
    ) // sends a JSON post body
    .set("accept", "json")
    .end((err, res) => {
      // Calling the end function will send the request
    });
}

async function getGitHubPullRequest(owner, repo, pr_id)  {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getGitHubPullRequest(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}") { status, mergeable, mergeCommitSha, state, baseBranch } }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getGitHubPullRequest;
}

export {
	postCreateUser,
	postGetContributorName,
	postGetContributorID,
	postGetContributorSignature,
	postCreateRepo,
	postGetContributorTokenAmount,
	postTransferTokens,
	postNewPullRequest,
	postSetVote,
	getRepoStatus,
	get_authorized_contributor,
	postPullFork,
	postGetPRforkStatus,
	postGetPRvoteStatus,
	postGetPRpercentVotedQuorum,
	postGetPRvoteTotals,
	postGetPRvoteYesTotals,
	postGetPRvoteNoTotals,
	postMergePullRequest,
	postCreatePullRequest,
	postFork,
        getGitHubPullRequest
}

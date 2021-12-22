## Agnostic pull requests

Don't want to rely on a single git service provider. We'll track pull requests by a hashes.

### Get pull request

We want the OID of the pull request and other info to cryptographically confirm it.

/repos/{owner}/{repo}/pulls/{pull_number}

await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}')
{
  owner: 'octocat',
  repo: 'hello-world',
  pull_number: 42
})

head: {
        label: 'Bruno-366:patch-1',
        ref: 'patch-1',
        sha: '1adf4063258b0f3dd325f625b87b0b2d519908e2',
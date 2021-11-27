const commonUtil = require('./commonUtil');
const storageUtil = require('./storageUtil');
const CommonEnum = require('../enums/CommonEnum');

const GITHUB_API_REPOS_BASE_URI = 'https://api.github.com/repos/';

const apiUtil = {
  checkStatus: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw Error(
      `GitHub returned a bad status: ${response.status}. Please set API token if Rate limiting is the cause(explained in README).`
    );
  },
  parseJSON: function(response) {
    return response === null ? null : response.json();
  },
  getRepoContent: function(callback, contentPath, isRepoMetaData) {
    const path = commonUtil.getUsernameWithReponameFromGithubURL();
    if (!path.user || !path.repo) {
      return;
    }

    const userRepo = path.user + '/' + path.repo;
    // No longer needed, put keep in function args.
    //contentPath = contentPath || commonUtil.getContentPath() || '';
    const token = storageUtil.get(CommonEnum.TOKEN) || localStorage.getItem('x-github-token');
    let headers = {};
    // No need for branch, as it's irrelevant to pulls page.
    //const branch = commonUtil.getBranch() || storageUtil.get('defaultBranch') || 'master';
    //let contentParams = '';
    let contentParams = '/pulls'

    if (!isRepoMetaData) {
      /*How it used to be
        https://api.github.com/repos/{owner}/{repo}/contents/{dir}?ref={branch}
        What it is now
        https://api.github.com/repos/{owner}/{repo}/pulls
      */
      //contentParams = '/pulls'
    }

    if (token) {
      headers = {
        Authorization: 'token ' + token,
        'User-Agent': 'Awesome-Octocat-App'
      };
    }

    window
      .fetch(GITHUB_API_REPOS_BASE_URI + userRepo + contentParams, {
        headers: headers
      })
      .then(apiUtil.checkStatus)
      .then(apiUtil.parseJSON)
      .then(function(data) {
        callback(data === null ? null : data);
      })
      .catch(function(error) {
        if (error) {
          console.error('Error in enhanced-github', error);
        }
        callback(null);
      });
  }
};

module.exports = apiUtil;

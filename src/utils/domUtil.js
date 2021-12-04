var ClipboardLib = require('clipboard');
var https = require('https');

const apiUtil = require('./apiUtil');
const commonUtil = require('./commonUtil');
const handlersUtil = require('./handlersUtil');
const storageUtil = require('./storageUtil');

function getVote() {
  const data = JSON.stringify({
    query: `{
      vote(way: true)
    }`,
  });

  const options = {
    hostname: 'localhost',
    path: '/graphql',
    port: 4000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
  };
  const req = https.request(options, (res) => {
    let data = '';
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
      data += d;
    });
    res.on('end', () => {
      console.log(JSON.parse(data).data);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();

  return "hello";
}

function fetchDataAndCreateDOMElements() {
  domUtil.addCopyAndDownloadButton();
  domUtil.addFileSizeAndDownloadLink();
}

const domUtil = {
  selectText: function() {
    const container = 'tbody';
    if (document.selection) {
      const range = document.body.createTextRange();
      range.moveToElementText(document.querySelectorAll(container)[0]);
      range.select();
    } else if (window.getSelection) {
      const range = document.createRange();
      range.selectNode(document.querySelectorAll(container)[0]);
      window.getSelection().addRange(range);
    }
  },
  hasClass: function(elem, className) {
    const elemClass = elem.getAttribute('class') || '';

    return elemClass.split(' ').indexOf(className) > -1;
  },
  // Function to check if something was clicked with id element.
  hasId: function(elem, idName) {
    const elemId = elem.getAttribute('id') || '';

    return elemId.split(' ').indexOf(idName) > -1;
  },
  getId: function(elem, idName) {
    return elem.getAttribute(idName);
  },
  appendRepoSizeElement: function() {
    commonUtil.removePrevInstancesOf('.eg-repo-size');

    const formattedFileSize = commonUtil.convertSizeToHumanReadableFormat(storageUtil.get('repoSize') * 1024); // GitHub API return size in KB for repo
    let elem;

    if (document.querySelector('readme-toc') && document.querySelectorAll('readme-toc').length) {
      elem = document.querySelectorAll('a[href="#readme"]:not(#user-content-readme)')[1];
    } else {
      const readmeEls = document.querySelectorAll('a[href="#readme"]:not(#user-content-readme)');
      if (readmeEls && readmeEls.length && readmeEls.length === 2) {
        elem = readmeEls[1];
      } else {
        elem = readmeEls[0];
      }
    }

    if (elem) {
      const html = `
        <div class="mt-3 eg-repo-size">
          <a class="Link--muted">
            <svg class="octicon octicon-database mr-2" mr="2" aria-hidden="true" height="16" version="1.1" viewBox="0 0 12 16" width="16">
              <path d="M6 15c-3.31 0-6-.9-6-2v-2c0-.17.09-.34.21-.5.67.86 3 1.5 5.79 1.5s5.12-.64 5.79-1.5c.13.16.21.33.21.5v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V7c0-.11.04-.21.09-.31.03-.06.07-.13.12-.19C.88 7.36 3.21 8 6 8s5.12-.64 5.79-1.5c.05.06.09.13.12.19.05.1.09.21.09.31v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V3c0-1.1 2.69-2 6-2s6 .9 6 2v2c0 1.1-2.69 2-6 2zm0-5c-2.21 0-4 .45-4 1s1.79 1 4 1 4-.45 4-1-1.79-1-4-1z"></path>
            </svg>
              <span>${formattedFileSize.size}</span>
              <span>${formattedFileSize.measure}</span>
          </a>
        </div>
      `;

      elem.parentElement.insertAdjacentHTML('beforeend', html);
    }
  },
  addRepoData: function() {
    setTimeout(() => {
      const path = commonUtil.getUsernameWithReponameFromGithubURL();
      const userRepo = `${path.user}/${path.repo}`;

      if (
        storageUtil.get('defaultBranch') &&
        window.location.href &&
        window.location.href !== 'https://github.com/' + userRepo
      ) {
        fetchDataAndCreateDOMElements();
        return;
      }

      //if (storageUtil.get('repoSize')) {
      //  fetchDataAndCreateDOMElements();
      //  domUtil.appendRepoSizeElement();
      //  return;
      //}

      apiUtil.getRepoContent(
        function(data) {
          if (!data) {
            return;
          }

          //storageUtil.set('repoSize', data.size);
          //storageUtil.set('defaultBranch', data.default_branch);

          fetchDataAndCreateDOMElements();
          //domUtil.appendRepoSizeElement();
        },
        '',
        true
      );
    }, 0);
  },
  addCopyAndDownloadButton: function() {
    const btnGroup = document.querySelectorAll('.BtnGroup:not(.d-md-none)')[0];

    //https://github.com/turbo-src/extension/blob/master/src/inject.js
    // Previous conditional
    //if (btnGroup && window.location.href && window.location.href.indexOf('blob/' + commonUtil.getBranch()) > -1) {
    // New conditional
    if (btnGroup && window.location.href && window.location.href.indexOf('pulls') > -1) {
      // instantiate copy to clipborad
      new ClipboardLib('.js-file-clipboard'); // eslint-disable-line no-new

      apiUtil.getRepoContent(function(data) {
        handlersUtil.onPathContentFetchedForBtns(data);
      }, commonUtil.getContentPath());
    }
  },
  addFileSizeAndDownloadLink: function() {
    apiUtil.getRepoContent(function(data) {
      handlersUtil.onPathContentFetched(data);
    });
  }
};

module.exports = domUtil;

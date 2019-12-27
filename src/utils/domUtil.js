var ClipboardLib = require('clipboard');

const apiUtil = require('./apiUtil');
const commonUtil = require('./commonUtil');
const handlersUtil = require('./handlersUtil');
const storageUtil = require('./storageUtil');

function fetchDataAndCreateDOMElements() {
  domUtil.addCopyAndDownloadButton();
  domUtil.addFileSizeAndDownloadLink();
}

let domUtil = {
  selectText: function() {
    let container = 'tbody';
    if (document.selection) {
      let range = document.body.createTextRange();
      range.moveToElementText(document.querySelectorAll(container)[0]);
      range.select();
    } else if (window.getSelection) {
      let range = document.createRange();
      range.selectNode(document.querySelectorAll(container)[0]);
      window.getSelection().addRange(range);
    }
  },
  hasClass: function(elem, className) {
    let elemClass = elem.getAttribute('class') || '';

    return elemClass.split(' ').indexOf(className) > -1;
  },
  appendRepoSizeElement: function() {
    commonUtil.removePrevInstancesOf('.repo-size');

    let formattedFileSize = commonUtil.convertSizeToHumanReadableFormat(storageUtil.get('repoSize') * 1024); // GitHub API return size in KB for repo
    let elem = document.querySelector('ul.numbers-summary');

    if (elem) {
      let html = `
        <li class="repo-size">
          <a>
            <svg class="octicon octicon-database" aria-hidden="true" height="16" version="1.1" viewBox="0 0 12 16" width="12">
              <path d="M6 15c-3.31 0-6-.9-6-2v-2c0-.17.09-.34.21-.5.67.86 3 1.5 5.79 1.5s5.12-.64 5.79-1.5c.13.16.21.33.21.5v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V7c0-.11.04-.21.09-.31.03-.06.07-.13.12-.19C.88 7.36 3.21 8 6 8s5.12-.64 5.79-1.5c.05.06.09.13.12.19.05.1.09.21.09.31v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V3c0-1.1 2.69-2 6-2s6 .9 6 2v2c0 1.1-2.69 2-6 2zm0-5c-2.21 0-4 .45-4 1s1.79 1 4 1 4-.45 4-1-1.79-1-4-1z"></path>
            </svg>
            <span class="num text-emphasized">
              ${formattedFileSize.size}
            </span>
          ${formattedFileSize.measure}
          </a>
        </li>`;
      elem.insertAdjacentHTML('beforeend', html);
    }
  },
  addRepoData: function() {
    setTimeout(() => {
      let path = commonUtil.getUsernameWithReponameFromGithubURL();
      let userRepo = `${path.user}/${path.repo}`;

      if (
        storageUtil.get('defaultBranch') &&
        window.location.href &&
        window.location.href !== 'https://github.com/' + userRepo
      ) {
        fetchDataAndCreateDOMElements();
        return;
      }

      if (storageUtil.get('repoSize')) {
        fetchDataAndCreateDOMElements();
        domUtil.appendRepoSizeElement();
        return;
      }

      apiUtil.getRepoContent(
        function(data) {
          if (!data) {
            return;
          }

          storageUtil.set('repoSize', data.size);
          storageUtil.set('defaultBranch', data.default_branch);

          fetchDataAndCreateDOMElements();
          domUtil.appendRepoSizeElement();
        },
        '',
        true
      );
    }, 0);
  },
  addCopyAndDownloadButton: function() {
    let btnGroup = document.querySelectorAll('.BtnGroup:not(.d-md-none)')[0];

    if (btnGroup && window.location.href && window.location.href.indexOf('blob/' + commonUtil.getBranch()) > -1) {
      // instantiate copy to clipborad
      new ClipboardLib('.js-file-clipboard'); // eslint-disable-line no-new

      apiUtil.getRepoContent(function(data) {
        handlersUtil.onPathContentFetchedForBtns(data);
      }, commonUtil.getContentPath());
    }
  },
  addFileSizeAndDownloadLink: function() {
    let links = document.querySelectorAll('tr.js-navigation-item > td.content a');
    let elems = document.querySelectorAll('tr.js-navigation-item > td.age');

    if (elems.length && elems.length === links.length) {
      // verify length for showing in-sync
      apiUtil.getRepoContent(function(data) {
        handlersUtil.onPathContentFetched(data);
      });
    }
  }
};

module.exports = domUtil;

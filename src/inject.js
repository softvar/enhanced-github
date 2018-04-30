/*!
 * github-plus
 * https://github.com/softvar/github-plus
 *
 * Licensed MIT © Varun Malhotrs
 */

/***********************
    CODE BEGINS HERE
***********************/

var GITHUB_API_REPOS_BASE_URI = 'https://api.github.com/repos/';
var storedGithubToken, defaultBranch, repoSize;

var utils = {
  getContentPath: function () {
    var str = window.location.href;
    var result = str.match(/.*[bt][lr][oe][be]\/[^//]+\/(.*)/); // blob/tree :D
    return result && result.length && result[1];
  },
  getBranch: function () {
    var str = window.location.href;
    var result = str.match(/.*(blob|tree|commits)\/([^//]+).*$/); // just after blob/tree
    return result && result.length && result[2];
  },
  getUsernameWithReponameFromGithubURL: function () {
    var pathnames = window.location.pathname.split('/');
    var user = pathnames[1];
    var repo = pathnames[2]

    return {
      user: user,
      repo: repo
    };
  },
  sortOn: function (arr, key) {
    return arr.sort(function (a, b) {
      if (a[key] < b[key]) { return -1; }
      if (a[key] > b[key]) { return 1; }
      return 0;
    });
  },
  sortFileStructureAsOnSite: function (data) {
    if (!data) { return; }

    var folders = [], files = [], others = [], dataAfterSorting = [];

    data.forEach(function(item) {
      if (item.type === 'dir') {
        folders.push(item);
      } else if (item.type === 'file') {
        files.push(item);
      } else {
        others.push(item);
      }
    })

    folders = utils.sortOn(folders, 'name');
    files = utils.sortOn(files, 'name');
    others = utils.sortOn(others, 'name');

    dataAfterSorting = dataAfterSorting.concat(folders).concat(files).concat(others);
    return dataAfterSorting;
  },
  convertSizeToHumanReadableFormat: function (bytes) {
    if (bytes === 0) {
      return {
        size: 0,
        measure: 'Bytes'
      };
    }

    bytes *= 1024;

    const K = 1024;
    const MEASURE = ['', 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(K));

    return {
      size: parseFloat((bytes / Math.pow(K, i)).toFixed(2)),
      measure: MEASURE[i]
    };
  },
  getFileSizeAndUnit: function (data) {
    var formatBytes = utils.convertSizeToHumanReadableFormat(data.size);
    var size = formatBytes.size;
    var unit = formatBytes.measure;

    return size + ' ' + unit;
  },
  removePrevInstancesOf: function (selector) {
    if (!selector) { return; }

    [].forEach.call(document.querySelectorAll(selector), function (el) {
      el.parentNode.removeChild(el);
    });
  }
};

var apiUtils = {
  checkStatus: function (response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw Error(`GitHub returned a bad status: ${response.status}. Please set API token if Rate limiting is the cause(explained in README).`);
  },
  parseJSON: function (response) {
    return response === null ? null : response.json();
  },
  getRepoContent: function (callback, contentPath, isRepoMetaData) {
    var path = utils.getUsernameWithReponameFromGithubURL();
    if (!path.user || !path.repo) { return; }

    var userRepo = path.user + '/' + path.repo;
    var contentPath = contentPath || utils.getContentPath() || '';
    var token = storedGithubToken || localStorage.getItem('x-github-token');
    var headers = {};
    var branch = utils.getBranch() || defaultBranch || 'master';
    var contentParams = '';

    if (!isRepoMetaData) {
      contentParams = '/contents/' + contentPath + '?ref=' + branch;
    }

    if (token) {
      headers = {
        'Authorization': 'token ' + token,
        'User-Agent': 'Awesome-Octocat-App'
      }
    }

    window.fetch(GITHUB_API_REPOS_BASE_URI + userRepo + contentParams, {
        headers: headers
      })
      .then(apiUtils.checkStatus)
      .then(apiUtils.parseJSON)
      .then(function (data) {
        callback(data === null ? null : data);
      }).catch(function (error) {
        if (error) {}
        callback(null);
      });
  }
};

var webNavigationUtils = {
  hashHandler: function () {
    this.oldHash = window.location.pathname;
    this.Check;

    var self = this;
    var detect = function() {
        if (self.oldHash !== window.location.pathname) {
          self.oldHash = window.location.pathname;
          setTimeout(function () {
            // fetchDataAndCreateDOMElements();
            domUtils.addRepoData();
          }, 2000);
        }
    };
    this.Check = setInterval(function() { detect() }, 100);
  }
};

var domUtils = {
  selectText: function (container) {
    var container = 'tbody'
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.querySelectorAll(container)[0]);
      range.select();
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.querySelectorAll(container)[0]);
      window.getSelection().addRange(range);
    }
  },
  hasClass: function (elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
  },
  appendRepoSizeElement: function () {
    var elem = document.querySelector('ul.numbers-summary');

    utils.removePrevInstancesOf('.repo-size');
    var formattedFileSize = utils.convertSizeToHumanReadableFormat(repoSize * 1024); // Github API return size in KB for repo

    var html = '<li class="repo-size">' +
      '<a>' +
        '<svg class="octicon octicon-database" aria-hidden="true" height="16" version="1.1" viewBox="0 0 12 16" width="12">' +
        '<path d="M6 15c-3.31 0-6-.9-6-2v-2c0-.17.09-.34.21-.5.67.86 3 1.5 5.79 1.5s5.12-.64 5.79-1.5c.13.16.21.33.21.5v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V7c0-.11.04-.21.09-.31.03-.06.07-.13.12-.19C.88 7.36 3.21 8 6 8s5.12-.64 5.79-1.5c.05.06.09.13.12.19.05.1.09.21.09.31v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V3c0-1.1 2.69-2 6-2s6 .9 6 2v2c0 1.1-2.69 2-6 2zm0-5c-2.21 0-4 .45-4 1s1.79 1 4 1 4-.45 4-1-1.79-1-4-1z"></path>' +
        '</svg>' +
        '<span class="num text-emphasized"> ' +
          formattedFileSize.size +
        '</span> ' +
        formattedFileSize.measure +
      '</a>' +
      '</li>';
    elem.insertAdjacentHTML('beforeend', html);
  },
  addRepoData: function () {
    var path = utils.getUsernameWithReponameFromGithubURL();
    var userRepo = path.user + '/' + path.repo;
    if (defaultBranch && window.location.href &&
      window.location.href !== 'https://github.com/' +userRepo
    ) {
      fetchDataAndCreateDOMElements();
      return;
    }

    if (repoSize) {
      fetchDataAndCreateDOMElements();
      domUtils.appendRepoSizeElement();
      return;
    }

    apiUtils.getRepoContent(
      function (data) {
        if (!data) {
          return;
        }
        repoSize = data.size;
        defaultBranch = data.default_branch;

        fetchDataAndCreateDOMElements();
          domUtils.appendRepoSizeElement();
    }, '', true);
  },
  addCopyAndDownloadButton: function () {
    var btnGroup = document.querySelectorAll('.BtnGroup')[0];
    if (btnGroup && window.location.href && window.location.href.indexOf('blob/' + utils.getBranch()) > -1) {
      new Clipboard('.js-file-clipboard'); // instantiate copy to clipborad

      apiUtils.getRepoContent(
        function (data) {
          var formattedFileSize = utils.getFileSizeAndUnit(data);

          utils.removePrevInstancesOf('.js-file-clipboard');
          utils.removePrevInstancesOf('.js-file-download');

          btnGroupHtml = '' +
          '<button aria-label="Copy file contents to clipboard" class="js-file-clipboard btn btn-sm BtnGroup-item file-clipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button" click="selectText()" data-clipboard-target="tbody">' +
            'Copy File' +
          '</button>' +
          '<a href="' + data.download_url + '" download="' + data.name + '" aria-label="(Cmd/Ctr + Click) to download File" class="js-file-download btn btn-sm BtnGroup-item file-download-button tooltipped tooltipped-s">' +
            '<span style="margin-right: 5px;">' + formattedFileSize + '</span>' +
              '<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16">' +
              '<path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path>' +
              '</svg>' +
          '</a>';

          btnGroup.insertAdjacentHTML('beforeend', btnGroupHtml);
        },
        utils.getContentPath()
      );
    }
  },
  addFileSizeAndDownloadLink: function  () {
    var links = document.querySelectorAll('tr.js-navigation-item > td.content a');
    var elems = document.querySelectorAll('tr.js-navigation-item > td.age');
    var uptree = document.querySelectorAll('tr.up-tree > td');
    var isAnyFilePresent = false;

    if (elems.length && elems.length === links.length) { // verify length for showing in-sync
      apiUtils.getRepoContent(function (data) {
        data = utils.sortFileStructureAsOnSite(data);

        if (!data) { return; }

        utils.removePrevInstancesOf('.download'); // remove before adding new ones

        for (var i = 0; i < data.length; i++) {
          if (data[i].type === 'file') {
            isAnyFilePresent = true;
            break;
          }
        }

        if (!isAnyFilePresent) {
          return;
        }

        if (uptree && uptree[3]) {
          uptree[3].insertAdjacentHTML('afterend', '<td class="download"></td>');
        }

        for (var i = 0; i < elems.length; i++) {
          if (data[i].type === 'file') {
            var formattedFileSize = utils.getFileSizeAndUnit(data[i]);

            var html = '<td class="download" style="width: 20px;padding-right: 10px;color: #888;text-align: right;white-space: nowrap;">' +
              '<span class="css-truncate css-truncate-target">' +
                '<span style="margin-right: 5px;">' + formattedFileSize + '</span>' +
                '<a href="' + data[i].download_url + '" title="(Cmd/Ctr + Click) to download File" aria-label="(Cmd/Ctr + Click) to download File" class="tooltipped tooltipped-s" download="' + data[i].name + '">' +
                  '<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16">' +
                  '<path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path>' +
                  '</svg>' +
                '</a>' +
              '</span>'
            '</td>';
            elems[i].insertAdjacentHTML('afterend', html);
          } else {
            elems[i].insertAdjacentHTML('afterend', '<td class="download"></td>');
          }
        }
      });
    }
  }
};

function fetchDataAndCreateDOMElements () {
  domUtils.addCopyAndDownloadButton();
  domUtils.addFileSizeAndDownloadLink();
}

window.chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)

      document.addEventListener('click', function (e) {
        if (domUtils.hasClass(e.target, 'js-file-clipboard')) {
          domUtils.selectText();
        }
      }, false);

      var hashDetection = new webNavigationUtils.hashHandler();

      window.chrome.storage.sync.get({
        'x-github-token': ''
      }, function(storedData) {
        storedGithubToken = storedData['x-github-token'];
        domUtils.addRepoData();
      });
    }
  }, 10)
});

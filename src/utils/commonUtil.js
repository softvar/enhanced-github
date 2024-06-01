const commonUtil = {
  getContentPath: function() {
    const str = window.location.href;
    const result = str.match(/.*[bt][lr][oe][be]\/[^//]+\/(.*)/); // blob/tree :D
    return result && result.length && result[1];
  },
  getBranch: function() {
    const str = window.location.href;
    const result = str.match(/.*(blob|tree|commits)\/([^//]+).*$/); // just after blob/tree
    return result && result.length && result[2];
  },
  getUsernameWithReponameFromGithubURL: function() {
    const pathnames = window.location.pathname.split('/');
    const user = pathnames[1];
    const repo = pathnames[2];

    return {
      user: user,
      repo: repo
    };
  },
  sortOn: function(arr, key) {
    return arr.sort(function(a, b) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  },
  sortFileStructureAsOnSite: function(data) {
    if (!data || Object.prototype.toString.call(data) !== '[object Array]') {
      return;
    }

    let folders = [];
    let files = [];
    let others = [];
    let dataAfterSorting = [];

    data.forEach(function(item) {
      if (item.type === 'dir') {
        folders.push(item);
      } else if (item.type === 'file' && item.size === 0) {
        folders.push(item);
      } else if (item.type === 'file' || item.type === 'symlink') {
        files.push(item);
      } else {
        others.push(item);
      }
    });

    folders = commonUtil.sortOn(folders, 'name');
    files = commonUtil.sortOn(files, 'name');
    others = commonUtil.sortOn(others, 'name');

    dataAfterSorting = dataAfterSorting
      .concat(folders)
      .concat(files)
      .concat(others);
    return dataAfterSorting;
  },
  convertSizeToHumanReadableFormat: function(bytes) {
    if (bytes === 0) {
      return {
        size: 0,
        measure: 'Bytes'
      };
    }

    bytes *= 1024;

    const K = 1024;
    const MEASURE = ['', 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(K));

    return {
      size: parseFloat((bytes / Math.pow(K, i)).toFixed(2)),
      measure: MEASURE[i]
    };
  },
  getFileSizeAndUnit: function(data) {
    const formatBytes = commonUtil.convertSizeToHumanReadableFormat(data.size);
    const size = formatBytes.size;
    const unit = formatBytes.measure;

    return size + ' ' + unit;
  },
  removePrevInstancesOf: function(selector) {
    if (!selector) {
      return;
    }

    [].forEach.call(document.querySelectorAll(selector), function(el) {
      el.parentNode.removeChild(el);
    });
  }
};

module.exports = commonUtil;

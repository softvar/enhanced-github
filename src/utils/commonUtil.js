const https = require('https');

const commonUtil = {
  getVote: function() {
    const data = JSON.stringify({
      query: `{
        characters(isMonster:true) {
          name
          episode {
            name
          }
        }
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
  },
  getContentPath: function() {
    const str = window.location.href;
    // New definition
    const result = str.match(/.*[p][ul][l][l]\/(.*)/); // pull :D
    // Previous definition
    //const result = str.match(/.*[bt][lr][oe][be]\/[^//]+\/(.*)/); // blob/tree :D
    return result && result.length && result[1];
  },
  // There is no branch in pulls path (window.location.href)
  /*getBranch: function() {
    const str = window.location.href;
    const result = str.match(/.*(blob|tree|commits)\/([^//]+).*$/); // just after blob/tree
    return result && result.length && result[2];
  },
  */
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
    const MEASURE = ['', 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(K));

    return {
      size: parseFloat((bytes / Math.pow(K, i)).toFixed(2)),
      measure: MEASURE[i]
    };
  },
  getFileSizeAndUnit: function(data) {
    // We don't care anymore about file sizes
    //const formatBytes = commonUtil.convertSizeToHumanReadableFormat(data.size);
    const size = 10;
    const unit = 'votes';

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

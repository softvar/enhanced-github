/* global chrome, fetch*/

/*!
 * clipboard.js v1.5.12
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){var o=t("matches-selector");e.exports=function(t,e,n){for(var i=n?t:t.parentNode;i&&i!==document;){if(o(i,e))return i;i=i.parentNode}}},{"matches-selector":5}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e,!0),n.delegateTarget&&o.call(t,n)}}var r=t("closest");e.exports=o},{closest:1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t,e){if(r)return r.call(t,e);for(var n=t.parentNode.querySelectorAll(e),o=0;o<n.length;++o)if(n[o]==t)return!0;return!1}var i=Element.prototype,r=i.matchesSelector||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector;e.exports=o},{}],6:[function(t,e,n){function o(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),o=document.createRange();o.selectNodeContents(t),n.removeAllRanges(),n.addRange(o),e=n.toString()}return e}e.exports=o},{}],7:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;i>o;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;a>r;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if("undefined"!=typeof o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){this.text?this.selectFake():this.target&&this.selectTarget()},t.prototype.selectFake=function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=(0,i.default)(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},a(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==("undefined"==typeof e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:6}],9:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if("undefined"!=typeof o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=i(e),u=i(n),f=i(o),d=function(t){function e(n,o){r(this,e);var i=a(this,t.call(this));return i.resolveOptions(o),i.listenClick(n),i}return c(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return s("action",e)},e.prototype.defaultTarget=function t(e){var n=s("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return s("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(u.default);t.exports=d})},{"./clipboard-action":8,"good-listener":4,"tiny-emitter":7}]},{},[9])(9)});

/***********************
    CODE BEGINS HERE
***********************/

var GITHUB_API_REPOS_BASE_URI = 'https://api.github.com/repos/';

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
  formatKiloBytes: function (bytes) {
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
    var formatBytes = utils.formatKiloBytes(data.size);
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
  getRepoContent: function (callback, contentPath) {
    var path = utils.getUsernameWithReponameFromGithubURL();
    if (!path.user || !path.repo) { return; }

    var userRepo = path.user + '/' + path.repo;
    var contentPath = contentPath || utils.getContentPath() || '';
    var token = localStorage.getItem('x-github-token');
    var headers = {};
    var branch = utils.getBranch() || 'master';

    if (token) {
      headers = {
        'Authorization': 'token ' + token,
        'User-Agent': 'Awesome-Octocat-App'
      }
    }

    fetch(GITHUB_API_REPOS_BASE_URI + userRepo + '/contents/' + contentPath + '?ref=' + branch, {
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
            fetchDataAndCreateDOMElements();
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
  addCopyAndDownloadButton: function () {
    var btnGroup = document.querySelectorAll('.js-zeroclipboard')[0];
    if (btnGroup && window.location.href && window.location.href.indexOf('blob/' + utils.getBranch()) > -1) {
      new Clipboard('.js-file-clipboard'); // instantiate copy to clipborad

      apiUtils.getRepoContent(
        function (data) {
          var formattedFileSize = utils.getFileSizeAndUnit(data);

          utils.removePrevInstancesOf('.js-file-clipboard');
          utils.removePrevInstancesOf('.js-file-download');

          btnGroupHtml = '' +
          '<button aria-label="Copy file contents to clipboard" class="js-file-clipboard btn btn-sm file-clipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button" click="selectText()" data-clipboard-target="tbody">' +
            'Copy File' +
          '</button>' +
          '<a href="' + data.download_url + '" download="' + data.name + '" aria-label="Download File" class="js-file-download btn btn-sm file-download-button tooltipped tooltipped-s">' +
            '<span style="margin-right: 5px;">' + formattedFileSize + '</span>' +
              '<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16">' +
              '<path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path>' +
              '</svg>' +
          '</a>';

          btnGroup.insertAdjacentHTML('afterend', btnGroupHtml);
        },
        utils.getContentPath()
      );
    }
  },
  addFileSizeAndDownloadLink: function  () {
    var links = document.querySelectorAll('tr.js-navigation-item > td.content a');
    var ns = document.querySelectorAll('tr.js-navigation-item > td.age');
    var uptree = document.querySelectorAll('tr.up-tree > td');

    if (ns.length && ns.length === links.length) { // verify length for showing in-sync
      apiUtils.getRepoContent(function (data) {
        data = utils.sortFileStructureAsOnSite(data);

        if (!data) { return; }

        utils.removePrevInstancesOf('.download'); // remove before adding new ones
        
        if (uptree && uptree[3]) {
          uptree[3].insertAdjacentHTML('afterend', '<td class="download"></td>');
        }

        for (var i = 0; i < ns.length; i++) {
          if (data[i].type === 'file') {
            var formattedFileSize = utils.getFileSizeAndUnit(data[i]);

            var html = '<td class="download" style="width: 20px;padding-right: 10px;color: #888;text-align: right;white-space: nowrap;">' +
              '<span class="css-truncate css-truncate-target">' +
                '<span style="margin-right: 5px;">' + formattedFileSize + '</span>' +
                '<a href="' + data[i].download_url + '" title="Download File" aria-label="Download File" class="tooltipped tooltipped-s" download="' + data[i].name + '">' +
                  '<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16">' +
                  '<path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path>' +
                  '</svg>' +
                '</a>' +
              '</span>'
            '</td>';
            ns[i].insertAdjacentHTML('afterend', html);
          } else {
            ns[i].insertAdjacentHTML('afterend', '<td></td>');
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

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)

      document.addEventListener('click', function (e) {
        if (domUtils.hasClass(e.target, 'js-file-clipboard')) {
          domUtils.selectText();
        }
      }, false);

      var hashDetection = new webNavigationUtils.hashHandler();

      fetchDataAndCreateDOMElements();
    }
  }, 10)
});

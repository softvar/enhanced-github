const React = require('react');
const ReactDOM = require('react-dom');
import App from './App.js';
const commonUtil = require('./utils/commonUtil');

const e = React.createElement;
var issueId = 'waiting...';


var currentRepo = {}

chrome.tabs.query(
{active:true, lastFocusedWindow:true},
tabs=>{
const tab=tabs[0];
const pathnames = tab.url.split('/');
const user = pathnames[3];
const repo = pathnames[4];

fetch(`https://api.github.com/repos/${user}/${repo}`).then((response) => response.json())
.then((data) => currentRepo = data)
}
)

document.addEventListener('DOMContentLoaded', function() {
  const domContainer = document.querySelector('#rootcontainer');

  ReactDOM.render(e(App,{currentRepo: currentRepo}), domContainer);
});

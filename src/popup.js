const React = require('react');
const ReactDOM = require('react-dom');
import App from './App.js';

const e = React.createElement;
var issueId = 'waiting...';
chrome.tabs.query(
  {active:true, lastFocusedWindow:true},
  tabs=>{
    const tab=tabs[0];
    const pathnames = tab.url.split('/');
    const user = pathnames[3];
    const repo = pathnames[4];

    fetch(`https://api.github.com/repos/${user}/${repo}`).then((response) => response.json())
    .then((data) => {
      console.log('data', data)
      if(data?.message === 'Not Found'){
        data = {owner: {login: 'none'}, repo: 'none'}
      }
      const domContainer = document.querySelector('#rootcontainer');
      ReactDOM.render(e(App, {currentRepo: data}), domContainer);
    })

  }
)
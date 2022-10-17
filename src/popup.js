const React = require('react');
const ReactDOM = require('react-dom');
import App from './App.js';

const e = React.createElement;
var issueId = 'waiting...';
chrome.tabs.query(
                 {active:true, lastFocusedWindow:true},
                 tabs=>{
                            const tab=tabs[0];
                            console.log("URL:", tab)
                            }
                             )


document.addEventListener('DOMContentLoaded', function() {
  const domContainer = document.querySelector('#rootcontainer');

  ReactDOM.render(e(App), domContainer);
});

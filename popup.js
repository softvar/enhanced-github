'use strict';

// // Button react component
// const e = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e('button', { onClick: () => this.setState({ liked: true }) }, 'Like');
//   }
// }

// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(LikeButton), domContainer);

const setUser = info => {
  if (info) {
    localStorage.setItem('user', info?.user);
    chrome.storage.local.set({ user: info?.user });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'Github User' },
        // ...also specifying a callback to be called
        //    from the receiving end (content script).
        setUser
      );
    }
  );
});

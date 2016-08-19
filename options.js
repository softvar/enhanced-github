function validateUserToken(token) {
  var invalidTokenMsg;
  if (typeof token !== 'string') {
    invalidTokenMsg = 'Access Token should be a String eg: 17c1a8d5b399d66b6212382d98d4c67a94d58955'
  } else if (token.length < 30) {
    invalidTokenMsg = 'Access Token length appears wrong!';
  }

  if (invalidTokenMsg) {
    document.getElementById('validation-block').style.display = 'inline-block';
  } else {
    document.getElementById('validation-block').style.display = 'none';
  }

  return invalidTokenMsg;
}

// Saves options to chrome.storage
function saveOptions() {
  document.getElementById('save-btn').setAttribute('disabled', 'disabled');
  document.getElementById('save-btn').style.background = '#DEDEDE';
  var token = document.getElementById('x-github-token').value;
  chrome.storage.sync.set({
    'x-github-token': token
  }, function() {
    // Update statusText to let user know options were saved.
    var statusText = document.getElementById('status--text');
    var validationWarning = document.getElementById('validation-warning');

    statusText.textContent = 'Options saved!!';
    validationWarning.textContent = validateUserToken(token);

    document.getElementById('status').style.display = 'inline-block';
    setTimeout(function() {
      statusText.textContent = '';
      document.getElementById('status').style.display = 'none';
      document.getElementById('save-btn').removeAttribute('disabled');
      document.getElementById('save-btn').style.background = '#3fb594';
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  var token;

  chrome.storage.sync.get({
    'x-github-token': ''
  }, function(storedData) {
    token = storedData['x-github-token'];
    document.getElementById('x-github-token').value = token;
    var validationWarning = document.getElementById('validation-warning');
    validationWarning.textContent = validateUserToken(token);

    document.getElementById('save-btn').style.background = '#3fb594';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save-btn').addEventListener('click', saveOptions);
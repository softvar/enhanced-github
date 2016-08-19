document.getElementById('settings-btn').addEventListener('click', function () {
	chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});
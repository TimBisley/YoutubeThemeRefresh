let isEnabled = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'toggleEnabled') {
    isEnabled = request.isEnabled;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.url.includes('youtube.com')) {
        chrome.tabs.sendMessage(activeTab.id, { message: 'updateUrl', isEnabled: isEnabled }, () => {
          if (isEnabled) {
            chrome.tabs.reload(activeTab.id);
          } else {
            // Clear the cache before reloading the page.
            chrome.browsingData.removeCache({}, () => {
              chrome.tabs.reload(activeTab.id);
            });
          }
        });
      }
    });
  } else if (request.message === 'getToggleState') {
    sendResponse({ isEnabled: isEnabled });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isEnabled && changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
    chrome.tabs.sendMessage(tabId, { message: 'updateUrl', isEnabled: isEnabled });
  }
});

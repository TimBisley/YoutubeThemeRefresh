function isMainPage(url) {
    const path = new URL(url).pathname;
    return path === '/' || path === '/feed/trending';
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'updateUrl') {
      const currentUrl = window.location.href;
  
      if (isMainPage(currentUrl)) {
        return;
      }
  
      if (request.isEnabled) {
        if (!currentUrl.includes('&themeRefresh=1')) {
          const updatedUrl = currentUrl + '&themeRefresh=1';
          window.history.replaceState(null, null, updatedUrl);
        }
      } else {
        if (currentUrl.includes('&themeRefresh=1')) {
          const updatedUrl = currentUrl.replace('&themeRefresh=1', '');
          window.history.replaceState(null, null, updatedUrl);
        }
      }
    }
  });
  
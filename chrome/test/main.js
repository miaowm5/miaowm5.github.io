
chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.tabs.getSelected(function(tab){
    var url = tab.url
    if( /.*moeimg.*/.test(url) ){
      chrome.tabs.executeScript({ file: 'jquery.js' });
      chrome.tabs.executeScript({ file: 'moeimg.js' });
      return;
    }
    if( /.*erogetrailers.*/.test(url) ){
      chrome.tabs.executeScript({ file: 'jquery.js' });
      chrome.tabs.executeScript({ file: 'erogetrailers.js' });
      return;
    }
    chrome.tabs.executeScript({ file: 'open_image.js' });
  })

});
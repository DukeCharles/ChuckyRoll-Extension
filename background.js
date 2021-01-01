console.log("Background Script coming in")
//Test
 chrome.runtime.onInstalled.addListener(pageActionEvent());
 
 chrome.runtime.onMessage.addListener((msg, sender) => {
  // First, validate the message's structure.
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab.
    chrome.pageAction.show(sender.tab.id);
  }
});
 
 
	  function pageActionEvent(){
		  
        chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
          chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {hostEquals: 'www.crunchyroll.com'},
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
          }]);
        });
      }
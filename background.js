chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	// When we receive a request, trigger a reload of every extensions that are saved in the extension localStorage.
	var to_reload = extensionsToReload();

	for (var ext_id in to_reload) {
		if ( to_reload[ext_id] ) {
		
			// Disable the function, and when it's done, re-activate the extension and let the sender know that we're done.
			chrome.management.setEnabled(ext_id, false, function() {
				chrome.management.setEnabled(ext_id, true);
				
				sendResponse(); // trigger window refresh
			});
		}
	}

});

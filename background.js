chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	var to_reload = extensionsToReload(); // Read config from localStorage

	for (var ext_id in to_reload) {
		if ( to_reload[ext_id] ) { // Only reload selected extensions
			chrome.management.setEnabled(ext_id, false, function() { // Disable extension
				chrome.management.setEnabled(ext_id, true); // Enable extension once disabled
				sendResponse(); // Let sender know to trigger a refresh
			});
		}
	}

});

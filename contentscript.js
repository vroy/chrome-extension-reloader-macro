$(document).ready(function() {

	$(window).keypress(function(e) {
		// alt + r == 174
		if ( e.keyCode == 174 ) {
			// Send a request to the background page that triggers a reload of the selected extensions in the options page.
			chrome.extension.sendRequest({}, function() {
				// When the background page is done triggering the reload, refresh the page.
				window.location.reload();
			});
		}

	});

});

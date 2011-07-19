$(document).ready(function() {

	// Tries to return the path to the 48px icon if possible.
	function findIcon(icons) {
		var icon = null;
		for ( var i in icons ) {
			var tmp = icons[i];
			if ( tmp.size == 48 ) {
				return tmp.url;
			} else {
				icon = tmp.url;
			}
		}
		return icon;
	}

	$(".reload").live("change", function() {
		var to_reload = extensionsToReload();
		var ext_id = $(this).attr("id");

		if ( $(this).attr("checked") ) { // append when checked
			to_reload[ext_id] = true;
		} else { // remove when unchecked
			to_reload[ext_id] = false;
		}

		localStorage["to_reload"] = JSON.stringify(to_reload);
	});
	
	
	chrome.management.getAll(function(extensions) {
		var to_reload = extensionsToReload();

		var sorted_extensions = [ ];
		for (var i in extensions) {
			var extension = extensions[i];
			if (extension.name == "Chrome Extension Reloader Macro") continue;
			sorted_extensions.push( [extension.name.toLowerCase(), extension] );
		}
		sorted_extensions.sort();

		for (var i in sorted_extensions) {
			var extension = sorted_extensions[i][1];

			// get a visible copy of the stub.
			var stub = $(".extension.stub").clone().removeClass("stub").show();
			
			// setup label with ids.
			stub.find(".reload").attr("id", extension.id);
			stub.find("label").attr("for", extension.id);

			// check the box if the extension is setup to be reloaded.
			if ( to_reload[extension.id] ) {
				stub.find(".reload").attr("checked", true);
			}

			// setup name.
			stub.find(".name").text(extension.name);

			// setup icon if available.
			if ( typeof extension.icons != "undefined" ) {
				stub.find(".icon").attr("src", findIcon(extension.icons)).show();
			}

			$("#extensions").append(stub);
		}
	});

});

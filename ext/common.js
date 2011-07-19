function extensionsToReload() {
	var to_reload = { }; // default
	
	if ( localStorage["to_reload"] ) { // load config if available.
		to_reload = JSON.parse( localStorage["to_reload"] );
	}

	return to_reload;
}

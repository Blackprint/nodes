// We don't have graphics node for non-browser :3
// Let's just use this file to load .sf.mjs and .sf.css

let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,

	// This will autoload (*.sf.mjs) and (*.sf.css) file for Browser
	hasInterface: true,
});

// Global shared context
let Context = Blackprint.getContext('Example');

// This is needed to avoid duplicated event listener when using hot reload
// Event listener that registered with same slot will be replaced
Context.EventSlot = {slot: 'my-private-event-slot'};

let consoleStyle = "color: yellow";
Context.log = function(which, ...text){
	if(Blackprint.Environment.isBrowser)
		console.log(`%c${which}:`, consoleStyle, ...text);
	else
		console.log(`\x1b[1m\x1b[33m${which}:\x1b[0m`, ...text);
}
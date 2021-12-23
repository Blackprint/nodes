// This script will run first, and then the other files
// depends on blackprint.config.js configuration

// Because .js and .sf is separated
// we also need to call loadScope just like _init.js
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,
});

// Global shared context
let Context = Blackprint.createContext('Input');

// This is needed to avoid duplicated event listener when using hot reload
// Event listener that registered with same slot will be replaced
Context.EventSlot = {slot: 'my-private-event-slot'};

// Shared function
let objLength = Context.objLength = function(obj){
	var i = 0;
	for(var k in obj)
		i++;

	return i;
}
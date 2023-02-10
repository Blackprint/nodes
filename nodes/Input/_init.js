// This script will run first, and then the other files
// depends on blackprint.config.js configuration

// Because .js and .sf is separated
// we also need to call loadScope just like _init.js
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,

	// This will autoload (*.sf.mjs) and (*.sf.css) file for Browser
	hasInterface: true,

	// This will autoload (*.docs.json) for Browser
	hasDocs: true,
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

// Fake Type, for Node.js/Deno
let _fType = {};
let fType = function(name){
	if(_fType[name] == null){
		let temp = _fType[name] = class{};
		Object.defineProperty(temp, 'name', {value: name});
	}

	return _fType[name];
}

// Fix for Node.js/Deno
var {
	HTMLElement = fType('HTMLElement'),
	Event = fType('Event'),
	KeyboardEvent = fType('KeyboardEvent'),
	PointerEvent = fType('PointerEvent'),
	TouchEvent = fType('TouchEvent'),
	MouseEvent = fType('MouseEvent'),
} = window;

let Blob = window.Blob; // Browser/Deno
if(Blob === void 0) // Node.js
	Blob = (await import('node:buffer')).Blob;

let allWindow = window.sf?.Window ?? window.document;
var $ = window.sf?.$;

if(Blackprint.Environment.isBrowser && $ == null){
	await import("https://cdn.jsdelivr.net/npm/scarletsframe@0.35.25/dist/squery.min.js");
	$ = window.sf.$;
}
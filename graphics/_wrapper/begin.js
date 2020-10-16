if(typeof sf === 'undefined' || sf.loader === void 0)
	throw new Error("Graphics nodes only available for browser");

// Load dependencies
sf.loader.js([
    "https://cdn.jsdelivr.net/npm/gifler@0.1.0/gifler.min.js",
    "https://cdn.jsdelivr.net/npm/pixi.js@5.3.3/dist/pixi.js",
]);

// This will run after the browser was loaded all script
$(function(){
// Wrap all .js scripts until end.js

// Don't automatically enable this as we haven't need it
// Start only if Pixi InteractionManager need to be started
PIXI.Ticker.system.autoStart = false;
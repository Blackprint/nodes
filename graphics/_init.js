// This script will run first, and then the other files
// depends on blackprint.config.js configuration

if(typeof sf === 'undefined' || sf.loader === void 0)
	throw new Error("Graphics nodes only available for browser");

// Prepare stuff when the page is loading
// maybe like loading our dependencies for the nodes

// Load dependencies and wait until everything ready
await sf.loader.js([
    "https://cdn.jsdelivr.net/npm/gifler@0.1.0/gifler.min.js",
    "https://cdn.jsdelivr.net/npm/pixi.js-legacy@5.3.3/dist/pixi-legacy.min.js",
]);

// Don't automatically enable this as we haven't need it
// Start only if Pixi InteractionManager need to be started
PIXI.Ticker.system.autoStart = false;
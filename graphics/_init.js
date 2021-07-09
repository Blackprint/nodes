// This script will run first, and then the other files
// depends on blackprint.config.js configuration

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

// Shared context between .js and .sf
let Context = Blackprint.Addons('Graphics');
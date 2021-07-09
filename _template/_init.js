// This script will run first, and then the other files
// depends on blackprint.config.js configuration

// Prepare stuff when the page is loading
// maybe like loading our dependencies for the nodes


/* Load dependencies from CDN here (optional) */
await sf.loader.js([
	"https://cdn.jsdelivr.net/npm/sfmediastream@latest" // Remove if not needed
]);


/* or wait until the browser was loaded all script and the DOM was ready
 * without load another dependency
 */
// await sf.loader.task;


// Shared context between .js and .sf
let Context = Blackprint.Addons('YourTemplate');
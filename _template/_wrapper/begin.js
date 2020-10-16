// If you created new nodes group please make sure you have
// load the compiled script from example/index.html
// And also put the folder path to the compiler on gulpfile.js

// Prepare stuff when the page is loading
// maybe like loading our dependencies for the nodes

// Load dependencies
sf.loader.js([
	"https://cdn.jsdelivr.net/npm/sfmediastream@latest"
]);

// This will run after the browser was loaded all script
$(function(){
// Wrap all .js scripts until end.js

// Prepare stuff after all dependencies was loaded
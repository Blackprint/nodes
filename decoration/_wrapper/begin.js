// Prepare stuff when the page is loading
// maybe like loading our dependencies for the nodes

// Load dependencies
sf.loader.js([
	"https://cdn.jsdelivr.net/npm/marked/marked.min.js",
	"https://cdn.jsdelivr.net/gh/liyasthomas/marcdown/marcdown.min.js",
]);

// This will run after the browser was loaded all script
$(function(){
// Wrap all .js scripts until end.js

// Prepare stuff after all dependencies was loaded
// https://guides.github.com/features/mastering-markdown/
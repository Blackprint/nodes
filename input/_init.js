// This script will run first, and then the other files
// depends on blackprint.config.js configuration

// Wait until all dependencies ready before running all .js files
await sf.loader.task;

function objLength(obj){
	var i = 0;
	for(var k in obj)
		i++;

	return i;
}
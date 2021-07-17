// This script will run first, and then the other files
// depends on blackprint.config.js configuration

// Wait until all dependencies ready before running all .js files
await sf.loader.task;

// Shared context between .js and .sf
let Context = Blackprint.Addons('Input');
let objLength = Context.objLength = function(obj){
	var i = 0;
	for(var k in obj)
		i++;

	return i;
}
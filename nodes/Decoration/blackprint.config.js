module.exports = {
	// Your unique package name, will be the prefix on the Blackprint editor
	name: "Decoration",
	description: "Decoration nodes, this doesn't have functionality except for decoration or comments",

	// This must be set to false if you want to compile this nodes
	disabled: false,

	// Uncomment this if you want to copy /dist/... files to current folder
	// Especially if you want to publish it to NPM Registry
	// hardlinkTo: "./dist",w

	// Unique prefix for .html or .sf template
	// Please use format 'BPIC/LibraryName'
	templatePrefix: "BPIC/Decoration",

	// Optional: Add header to every combined file
	header: "/* Blackprint \n MIT Licensed */",

	// (Required)
	// The .js file probably can be imported for non-browser too
	// Maybe you want to write Node.js compatible node on ".js"
	// and browser compatible node on ".sf" file extension
	js:{
		file:'@cwd/dist/nodes-decoration.mjs', // @cwd = directory where you start the Node.js

		// We're not using `await imports.task()` so let's just use `mjs`
		wrapped: 'mjs', // Wrap the entire .js to .mjs

		combine:[ // Relative to this config's directory
			'./_init.js', // First rule = first priority
			'**/*.js',
		],
	},

	// (Optional)
	// This extension can contain html, scss, and js
	// But only use this if you only develop for browser API
	sf:{
		file: '@cwd/dist/nodes-decoration.sf', // will have sf.css and sf.js

		// We're not using `await imports.task()` so let's just use `mjs`
		wrapped: 'mjs', // Wrap the entire .js with .mjs

		combine: [ // Relative to this config's directory
			'./_init.sf', // First rule = first priority
			'**/*.sf',
		],
	}
}
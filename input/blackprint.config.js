module.exports = {
	// Your unique package name, will be the prefix on the Blackprint editor
	name: "Input",
	description: "Input nodes",

	// This must be set to false if you want to compile this nodes
	disabled: false,

	// Unique prefix for .html or .sf template
	templatePrefix: "BPAO/Input",

	// Optional: Add header to every combined file
	header: "/* Blackprint \n MIT Licensed */",

	// The .js file probably can be imported for non-browser too
	// Maybe you want to write Node.js compatible node on ".js"
	// and browser compatible node on ".sf" file extension
	js:{
		file:'@cwd/dist/nodes-input.min.js', // @cwd = directory where you start the Node.js
		wrapped: 'async', // Wrap the entire .js with async function
		combine:[ // Relative to this config's directory
			'./_init.js', // First rule = first priority
			'**/*.js',
		],
	},

	// This extension can contain html, scss, and js
	// But only use this if you only develop for browser API
	sf:{
		file:'@cwd/dist/nodes-input.sf', // will have sf.css and sf.js
		wrapped: 'async', // Wrap the entire .js with async function
		combine:[ // Relative to this config's directory
			'./_init.sf', // First rule = first priority
			'**/*.sf',
		],
	}
}
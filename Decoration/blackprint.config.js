module.exports = {
	// Your unique package name, will be the prefix on the Blackprint editor
	name: "Decoration",
	description: "Decoration nodes, this doesn't have functionality except for decoration or comments",

	// This must be set to false if you want to compile this nodes
	disabled: false,

	// Unique prefix for .html or .sf template
	// Please use format 'BPAO/LibraryName'
	templatePrefix: "BPAO/Decoration",

	// Optional: Add header to every combined file
	header: "/* Blackprint \n MIT Licensed */",

	// This extension can contain html, scss, and js
	// But only use this if you only develop for browser API
	sf:{
		file: '@cwd/dist/nodes-decoration.sf', // will have sf.css and sf.js
		wrapped: 'async', // Wrap the entire .js with async function
		combine: [ // Relative to this config's directory
			'./_init.sf', // First rule = first priority
			'**/*.sf',
		],
	}
}
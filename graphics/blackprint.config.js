module.exports = {
	// Your unique package name, will be the prefix on the Blackprint editor
	name: "Graphics",
	description: "Graphical User Interface nodes",

	// Unique prefix for .html or .sf template
	templatePrefix: "BPAO/Graphics",

	// Optional: Add header to every combined file
	header: "/* Blackprint \n MIT Licensed */",

	// The .js file probably can be imported for non-browser too
	// Maybe you want to write Node.js compatible node on ".js"
	// and browser compatible node on ".sf" file extension
	js:{
		file:'@cwd/dist/nodes-graphics.min.js', // @cwd = directory where you start the Node.js
		combine:[ // relative to this config's directory
			'_wrapper/begin.js',
			'**/*.js',

			// Remove from match all **/*.js, and add it again
			'!_wrapper/end.js',
			'_wrapper/end.js',
		],
	},

	// This extension can contain html, scss, and js
	// But only use this if you only develop for browser API
	sf:{
		file:'@cwd/dist/nodes-graphics.sf', // will have sf.css and sf.js
		combine:'**/*.sf',// relative to this config's directory
	}
}
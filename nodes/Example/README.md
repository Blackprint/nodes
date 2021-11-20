## Example Nodes
Don't use this for production, but please only use this for experiment and learning 😆

When creating Blackprint Engine on different language, the engine itself must implement similar behavior like this Example Nodes and also can import and execute exported JSON from the Blackprint Sketch normally.

---

This folder contains example node element to be registered into Blackprint. The compiled version of this example nodes can be imported and running on:
- Browser (+ Sketch Node)
- Deno
- Node.js

Any files with `.sf` is ScarletsFrame template, you can design your own node on there for Blackprint Sketch. If you just want to use default template for your node, you may not need to write interface on `.sf` template.

```js
// Example for using default node template
// You can just do this on .js file

// You don't need to register any interface
// Blackprint.registerInterface('BPIC/...');
// Blackprint.Sketch.registerInterface('BPIC/...');

Blackprint.registerNode('Example/Stuff', function(node){
	// Let's use default node interface
	let iface = node.setInterface(/* keep empty */);
	// iface === node.iface

	// You can just write your logic here...
	iface.id = "lalala";
	iface.consumableData = 123;
});

// --- Somewhere on your script ---
// instance = new (Sketch || Engine);
let iface = instance.iface.lalala;
console.log(iface.consumableData); // 123
```

Any files with `.js` is for Deno, Node.js, and Browser. It should know how to handle different environment (Browser).

There are some variation for implementing nodes on this example, you can freely choose the suitable method. The implementation may have changes on the future.
// BPAO/LibraryName is prefix from blackprint.config.js

// Node's logic, don't use browser's API or library here
// Data processing or data/type assignment only
Blackprint.registerNode('LibraryName/FeatureName/Template' function(node, iface){
	iface.title = 'title';
	iface.description = 'description';

	// Interface path
	iface.interface = 'BPAO/LibraryName/FeatureName/Template';

	// Unset 'iface.interface' if using default interface -> 'Blackprint/nodes/default'
	// You don't need to '.registerInterface()' if using default interface

	// If you want to use default template but want to '.registerInterface()'
	// Then you must specify 'Blackprint/nodes/default' template when using '.registerInterface()'

	node.outputs = {
		Test: 123
	};

	// Put logic as minimum as you can in .registerNode
	// You can also put these function on .registerInterface instead
	node.init = function(){
		// Called before iface.init()
	}

	node.update = function(){
		// Triggered when any output value from other node are updated
		// And this node's input connected to that output
	}

	node.request = function(){
		// Triggered when other connected node is requesting
		// output from this node that have empty output
	}

	node.imported = function(){
		// When this node was successfully imported
	}
});

// To be extended by Browser or Engine Interface (Optional)
// Useful if you have similar logic for the browser and engine
class PlaceHolder extends Blackprint.Node{
	static construct(){
		var iface = this;
		console.log('ehlo', iface.title);
	}

	callMe(){
		var iface = this;
		console.log('hello', iface.title);
	}
}

// For Browser Interface, let ScarletsFrame handle this (HotReload available here)
// - first parameter is HTML file path
// - second parameter is optional if using different settings
// - third parameter can be placed on second parameter
Blackprint.registerInterface('BPAO/LibraryName/FeatureName/Template', {
	extend: PlaceHolder,
	// template: 'Blackprint/nodes/default.sf'
}, function(iface){
	/* You can use browser's API or library */
	// iface == iface from .registerNode
	// iface.node == node from .registerNode
	// iface.callMe == extended from PlaceHolder

	// save any value on 'iface' so you can reuse it when this scope's hot reloaded

	iface.init = function(){
		// Run once
		// When ScarletsFrame initialized this HTML element
		iface.keepMe = document.createElement('canvas');

		// Maybe run it if the HTML element also refreshed
		iface.hotReloaded();
	}

	iface.hotReloaded = function(){
		// Run everytime ScarletsFrame hot reload current scope
		iface.$el('.content').append(iface.keepMe);
	}

	// Any property on 'iface' can be binded with the HTML
	iface.log = '123'; // <div attr="{{ log }}">{{ log }}</div>
	// On Intepreter we need to use "bind({get log, set log})"

	// ==========================================================
	// ====== Below can also be used for engine scope ======
	// ==========================================================

	// === Shortcut to get/set node's port value ===
	var IM = iface; // Lazy Shortcut :3
	// IM.init = function(){...}

	const {
		IInput, IOutput, IProperty, // Port interface
		Input, Output, Property, // Port value
	} = IM.const; // IM.const === iface.const

	// Update the port value
	// Can be used for Output, Property
	Output.PortName1 = 123;

	// Get the port value
	// Can be used for Input, Output, Property
	Output.PortName1 = Input.PortName1;
	Property.PortName2 = Property.PortName1;

	// Node event listener can only be registered after node init
	IM.on('cable.connect', function(port1, port2, cable){});

	// Can be used for IInput, IOutput, IProperty
	// Control the port interface (event listener, add new port, etc)
	IInput.PortName1
		// When connected output node have updated the value
		// Also called after 'connect' event
		.on('value', function(port2){})

		// When this port are trying to connect with other node
		.on('connecting', function(port1, port2, enable){
			myLongTask(function(success){
				if(success)
					enable(true) // Cable will be activated
				else enable(false) // Cable will be destroyed
			});

			// Empty = is like we're not giving the answer now
			enable() // Mark as async

			// Or destroy it now
			// enable(false)
		})

		// When connection success
		.on('connect', function(port1, port2, cable){})

		// When connection closed
		// not being called if the connection doesn't happen before
		.on('disconnect', function(port1, port2, cable){});

	// If you're using hot reload feature then you must call .off()
	// To clear the old event listener
	IInput.PortName1.off('value').on('value', function(port2){})

	var Node = iface.node; // 'node' object from .registerNode
	// ...
});

// For Non-browser (Optional)
// - first parameter is named path
// - second parameter is optional if using different settings
// - third parameter can be placed on second parameter
Blackprint.Engine.registerInterface('BPAO/LibraryName/FeatureName/Template', {
	extend: PlaceHolder
}, function(iface, bind){
	/* Assume we're in Node.js or Deno environment */
	// iface == node from .registerNode
	// iface.node == node from .registerNode
	// iface.callMe == extended from PlaceHolder

	iface.init = function(){
		// When Engine initializing this scope
	}

	// Usually (iface.log = 'something') would trigger interface change
	// But Node.js/Deno environment doesn't have browser interface
	// So we need to add callback when the value changes or being retrieved
	// And trigger our API on Node.js or Deno

	var log = '123';
	bind({
		get log(){
			return log
		},
		set log(val){
			log = val
		},
	});

	// ====== Most feature is similar with browser's registerInterface ======
	const {
		IInput, IOutput, IProperty, // Port interface
		Input, Output, Property, // Port value
	} = iface.const;

	var Node = iface.node; // 'node' object from .registerNode
	// ...
});
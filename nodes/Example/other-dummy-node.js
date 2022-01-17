// These registration is using function for constructing nodes
// Using class is more recommended for better performance and memory usage

// We will use 'default' node interface and only being used as an example
Blackprint.registerNode('Example/Math/Multiply', function(node){
	let iface = node.setInterface(); // Let's use default node interface
	iface.title = "Multiply";

	// Handle all output port here
	node.output = {
		Result: Number,
	};

	// Kind of shortcut
	const Output = node.output;

	// Handle all input port here
	const Input = node.input = {
		Exec: Blackprint.Port.Trigger(function(){
			Output.Result = multiply();
			Context.log('Example/Math/Multiply', "Result has been set:", Output.Result);

			if(iface._inactive !== false){
				iface._inactive.destroy();
				iface._inactive = false;
			}
		}),
		A: Number,
		B: null, // Any data type
	};

	// Your own processing mechanism
	function multiply(){
		Context.log('Example/Math/Multiply', 'Multiplying', Input.A, 'with', Input.B);
		return Input.A * Input.B;
	}

	// When any output value from other node are updated
	// Let's immediately change current node result
	node.update = function(cable){
		if(this.iface._inactive) return;
		Output.Result = multiply();
	}

	// Event listener can only be registered after handle init
	node.init = function(){
		iface.on('cable.connect', function({ port, target }){
			Context.log('Example/Math/Multiply', `Cable connected from ${port.iface.title} (${port.name}) to ${target.iface.title} (${target.name})`);
		});

		// $decoration only available for Sketch (Browser)
		iface._inactive = iface.$decoration?.warn("Need activation") || false;
	}

	// If you want to test it or play around from the browser console
	setTimeout(function(){
		if(!Blackprint.Environment.isBrowser) return;

		if(iface.x === undefined)
			console.log('Node from Engine:', iface);
		else
			console.log('Node from Sketch:', iface);
	}, 10);
});

Blackprint.registerNode('Example/Math/Random', function(node){
	let iface = node.setInterface(); // Let's use default node interface
	iface.title = "Random";
	iface.description = "Number (0-100)";

	const Output = node.output = {
		Out: Number
	};

	var executed = false;
	node.input = {
		'Re-seed': Blackprint.Port.Trigger(function(){
			executed = true;
			Output.Out = Math.round(Math.random()*100);
		})
	};

	// When the connected node is requesting for the output value
	node.request = function(port, iface2){
		// Only run once this node never been executed
		// Return false if no value was changed
		if(executed === true)
			return false;

		Context.log('Example/Math/Random', 'Value request for port:', port.name, "from node:", iface2.title);

		// Let's create the value for him
		node.input['Re-seed']();
	}
});

// Does nothing :3
Blackprint.registerNode('Example/Dummy/Test', function(node){
	let iface = node.setInterface(); // Let's use default node interface
	iface.title = "Do nothing";

	// PortName must different any port
	node.input = {
		"Input 1": Boolean,
		"Input 2": String
	};

	node.output = {
		"Output 1": Object,
		"Output 2": Number
	};

	node.property = {
		"Property 1": Boolean,
		"Property 2": Number
	};
});
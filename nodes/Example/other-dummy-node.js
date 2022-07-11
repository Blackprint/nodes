// These registration is using function for constructing nodes
// Using class is more recommended for better performance and memory usage

// We will use 'default' node interface and only being used as an example
Blackprint.registerNode('Example/Math/Multiply', class extends Blackprint.Node {
	// Handle all output port here
	static output = { Result: Number };

	// Handle all input port here
	static input = {
		Exec: Blackprint.Port.Trigger(function(){
			this.output.Result = this.multiply();
			Context.log('Example/Math/Multiply', "Result has been set:", this.output.Result);

			let iface = this.iface;
			if(iface._inactive !== false){
				iface._inactive.destroy();
				iface._inactive = false;
			}
		}),
		A: Number,
		B: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface(); // Let's use default node interface
		iface.title = "Multiply";

		// If you want to test it or play around from the browser console
		setTimeout(function(){
			if(!Blackprint.Environment.isBrowser) return;

			if(iface.x === undefined)
				console.log('Node from Engine:', iface);
			else
				console.log('Node from Sketch:', iface);
		}, 10);
	}

	// Your own processing mechanism
	multiply(){
		let Input = this.input;

		Context.log('Example/Math/Multiply', 'Multiplying', Input.A, 'with', Input.B);
		return Input.A * Input.B;
	}

	// When any output value from other node are updated
	// Let's immediately change current node result
	update(cable){
		if(this.iface._inactive) return;
		this.output.Result = this.multiply();
	}

	// Event listener can only be registered after handle init
	init(){
		let iface = this.iface;

		iface.on('cable.connect', Context.EventSlot, function({ port, target }){
			Context.log('Example/Math/Multiply', `Cable connected from ${port.iface.title} (${port.name}) to ${target.iface.title} (${target.name})`);
		});

		// $decoration only available for Sketch (Browser)
		iface._inactive = iface.$decoration?.warn("Need activation") || false;
	}
});

Blackprint.registerNode('Example/Math/Random', class extends Blackprint.Node {
	executed = false;

	static output = { Out: Number };
	static input = {
		'Re-seed': Blackprint.Port.Trigger(function(){
			this.executed = true;
			this.output.Out = Math.round(Math.random()*100);
		})
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface(); // Let's use default node interface
		iface.title = "Random";
		iface.description = "Number (0-100)";
	}

	// When the connected node is requesting for the output value
	request(cable){
		// Only run once this node never been executed
		// Return false if no value was changed
		if(this.executed === true) return false;

		Context.log('Example/Math/Random', 'Value request for port:', cable.output.name, "from node:", cable.input.iface.title);

		// Let's create the value for him
		this.input['Re-seed']();
	}
});

// Do nothing :3
Blackprint.registerNode('Example/Dummy/Test', class extends Blackprint.Node {
	// PortName must different any port
	static input = {
		"Input 1": Boolean,
		"Input 2": String
	};

	static output = {
		"Output 1": Object,
		"Output 2": Number
	};

	// static property = {
	// 	"Property 1": Boolean,
	// 	"Property 2": Number
	// };

	constructor(instance){
		super(instance);

		let iface = this.setInterface(); // Let's use default node interface
		iface.title = "Do nothing";
	}
});
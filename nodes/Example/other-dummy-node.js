// These registration is using function for constructing nodes
// Using class is more recommended for better performance and memory usage

// We will use 'default' node interface and only being used as an example
Blackprint.registerNode('Example/Math/Multiply', class extends Blackprint.Node {
	// Handle all output port here
	static output = { Result: Number };

	// Handle all input port here
	static input = {
		Exec: Blackprint.Port.Trigger(function({ iface }){
			let node = iface.node;
			node.output.Result = node.multiply();
			Context.log('Example/Math/Multiply', "Result has been set:", node.output.Result);

			if(iface._inactive_){
				iface._inactive_.destroy?.();
				iface._inactive_ = false;
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
	update(){
		if(this.iface._inactive_) return;
		this.output.Result = this.multiply();
	}

	// Event listener can only be registered after handle init
	init(){
		let iface = this.iface;

		iface.on('cable.connect', Context.EventSlot, function({ port, target }){
			Context.log('Example/Math/Multiply', `Cable connected from ${port.iface.title} (${port.name}) to ${target.iface.title} (${target.name})`);
		});

		// $decoration only available for Sketch (Browser)
		iface._inactive_ = iface.$decoration?.warn("Need activation") || true;
	}
});

Blackprint.registerNode('Example/Math/Random', class extends Blackprint.Node {
	executed = false;

	static output = { Out: Number };
	static input = {
		'Re-seed': Blackprint.Port.Trigger(function({ iface: { node } }){
			node.executed = true;
			node.output.Out = Math.round(Math.random()*100);
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

Blackprint.registerNode('Example/Dummy/UpdateTest', class extends Blackprint.Node {
	static input = {
		A1: String,
		A2: String,
	};

	static output = {
		B1: String,
		B2: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface(); // Let's use default node interface
		iface.title = "Pass data only";

		// iface.on('port.value', ({ port, target }) => {
		// 	console.log(port, target);
		// 	if(port.source !== 'input') return;
		// 	this[port.name] = target.value;
		// });
	}

	update(){
		let index = this.iface.id || this.instance.ifaceList.indexOf(this.iface);
		// console.error("UpdateTest "+index+"> Updating ports");

		// if(this.input.A1 !== this.A1) console.error("A1 from event listener value was mismatched");
		// if(this.input.A2 !== this.A2) console.error("A2 from event listener value was mismatched");

		this.output.B1 = this.input.A1;
		this.output.B2 = this.input.A2;
		// console.log("UpdateTest "+index+"> Updated");
	}
});
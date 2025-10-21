// Register Node
// Blackprint will handle data flow between nodes connection
// This should be simple and contain structure only
// Just like creating a template/base and attach an interface for extra control
Blackprint.registerNode('Example/Input/Simple',
class extends Blackprint.Node {
	// Output Port's Template (This will be transformed to it's type after initialized)
	static output = {
		Changed: Blackprint.Types.Trigger,
		Value: String, // Default to empty string
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Example/Input'); // Let's use ./input.js
		iface.title = "Input";
	}

	// Bring value from imported node to handle output
	imported(data){
		let iface = this.iface;

		Context.log('Example/Input/Simple', "Old data:", JSON.stringify(iface.data));
		Context.log('Example/Input/Simple', "Imported data:", JSON.stringify(data));

		if(data === undefined) return;

		// Use object assign to avoid replacing the object reference
		Object.assign(iface.data, data);
		this.output.Value = data.value;
	}

	// Remote sync in
	syncIn(id, data){
		if(id === 'data'){
			Object.assign(this.iface.data, data);
		}
		else if(id === 'value'){
			this.iface.data.value = data;
		}
	}
});


// Register Interface
// Interface will be exposed to public and being attached for a node
// it's just like API or User Interface (on sketch editor)
// Let's think you're creating a library, these properties can be accessed by other developers
Blackprint.registerInterface('BPIC/Example/Input',
Context.IFace.Input = class InputIFace extends Blackprint.Interface{
	constructor(node){
		super(node);

		// You can also use
		this.data = new ExampleInputData(this);
	}

	// Proxy string value from: data.value(setter) -> iface.changed -> output.Value
	// And also call output.Changed() if connected to other node
	changed(text, ev){
		let node = this.node;

		// This node still being imported
		if(this.importing !== false)
			return;

		Context.log('Example/Input/Simple', 'The input box have new value:', text);

		// iface.data.value === text;
		node.output.Value = this.data.value;
		node.syncOut('data', {value: this.data.value});

		// This will call every connected node
		node.output.Changed();
	}
});

class ExampleInputData {
	#iface = null;

	constructor(iface){
		this.#iface = iface;
	}

	// Use underscore "_" or "$" to avoid being exported as JSON
	#value = '';

	get value(){ return this.#value }
	set value(val){
		if(this.#value === val) return;
		this.#value = val;
		this.#iface.changed(val);
		this.#iface.node.routes.routeOut();
	}
}

// Using getter/setter will make the property not enumerable and Blackprint will skip that property when exporting
Blackprint.utils.setEnumerablePrototype(ExampleInputData, {
	value: true,
});
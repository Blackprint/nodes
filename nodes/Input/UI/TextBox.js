// Register Node
// Blackprint will handle data flow between nodes connection
// This should be simple and contain structure only
// Just like creating a template/base and attach an interface for extra control
Blackprint.registerNode('Input/UI/TextBox',
class extends Blackprint.Node {
	// Output Port's Template (This will be transformed to it's type after initialized)
	static output = {
		Changed: Function,
		Value: String, // Default to empty string
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Input/UI/TextBox'); // Let's use ./input.js
		iface.title = "Input";
	}

	// Bring value from imported node to handle output
	imported(data){
		let iface = this.iface;

		if(data === undefined) return;

		// Use object assign to avoid replacing the object reference
		Object.assign(iface.data, data);
		this.output.Value = data.value;
	}

	// Proxy string value from: node.changed -> node.changed -> output.Value
	// And also call output.Changed() if connected to other node
	changed(text, ev){
		let iface = this.iface;

		// This node still being imported
		if(iface.importing !== false)
			return;

		// iface.data.value === text;
		this.output.Value = iface.data.value;
		this.syncOut('data', {value: iface.data.value});

		// This will call every connected node
		this.output.Changed();
	}

	// Remote sync in
	syncIn(id, data){
		if(id === 'data'){
			Object.assign(this.iface.data, data);
			this.changed();
		}
	}
});


// Register Interface
// Interface will be exposed to public and being attached for a node
// it's just like API or User Interface (on sketch editor)
// Let's think you're creating a library, these properties can be accessed by other developers
Blackprint.registerInterface('BPIC/Input/UI/TextBox',
Context.IFace.Input = class InputIFace extends Blackprint.Interface{
	constructor(node){
		super(node);
		this.data = new InputTextBoxData(this);
	}
});

class InputTextBoxData {
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
		this.#iface.node.changed(val);
	}
}

// Using getter/setter will make the property not enumerable and Blackprint will skip that property when exporting
Blackprint.utils.setEnumerablePrototype(InputTextBoxData, {
	value: true,
});
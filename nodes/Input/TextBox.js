// Register Node
// Blackprint will handle data flow between nodes connection
// This should be simple and contain structure only
// Just like creating a template/base and attach an interface for extra control
Blackprint.registerNode('Input/TextBox',
class extends Blackprint.Node {
	// Output Port's Template (This will be transformed to it's type after initialized)
	static output = {
		Changed: Function,
		Value: String, // Default to empty string
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Input/TextBox'); // Let's use ./input.js
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

		// This will call every connected node
		this.output.Changed();
	}
});


// Register Interface
// Interface will be exposed to public and being attached for a node
// it's just like API or User Interface (on sketch editor)
// Let's think you're creating a library, these properties can be accessed by other developers
Blackprint.registerInterface('BPIC/Input/TextBox',
Context.IFace.Input = class InputIFace extends Blackprint.Interface{
	constructor(node){
		super(node);
		let iface = this;
		var theValue = '';

		// You can also use
		// this.data = new ReactiveInputData(this);
		this.data = {
			get value(){ return theValue },
			set value(val){
				if(theValue === val) return;
				theValue = val;

				if(iface.node.changed !== void 0)
					iface.node.changed(val);
			},
		};
	}
});

/*
class ReactiveInputData {
	constructor(iface){
		this._iface = iface;
	}

	// Use underscore "_" or "$" to avoid being exported as JSON
	_value = '';

	get value(){ return this._value }
	set value(val){
		if(this._value === val) return;
		this._value = val;

		if(this._iface.node.changed !== void 0)
			this._iface.node.changed(val);
	}
}
*/
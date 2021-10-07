// You can also use class for better performance and memory
// But you may need to write more code and sacrifice readibility...
// Well, It's depend on you, do the optimization first or
// make a clean and readable code first then optimize later
// let's assume someone want to recreate this node for different language
// they then will use our node code as a reference..
// then for me, the readibilitya and simplicity is the priority...
/*
class ReactiveInputData {
	constructor(iface){
		// Use underscore to avoid being exported as JSON
		this._iface = iface;
		this._value = '...';
	}

	get value(){
		return this._value;
	}
	set value(val){
		if(this._value === val) return;
		this._value = val;

		if(this._iface.node.changed !== void 0)
			this._iface.node.changed(val);
	}
}
Blackprint.registerInterface('BPIC/Example/input', class {
	constructor(){
		this.data = new ReactiveInputData(this);
	}
});
*/

Blackprint.registerNode('Example/Input/Simple', function(node){
	let iface = node.setInterface('BPIC/Example/input'); // Let's use ./input.js
	iface.title = "Input";

	// node = under Blackprint node flow control
	const Output = node.output = {
		Changed: Function,
		Value: String, // Default to empty string
	};

	iface.data = {
		value:'...'
	};

	// Bring value from imported node to handle output
	node.imported = function(data){
		console.warn("Old data:", JSON.stringify(iface.data));
		console.warn("Imported data:", JSON.stringify(data));

		if(data === undefined) return;
		iface.data = data;
		Output.Value = data.value;
	}

	// Proxy string value from: node.changed -> node.changed -> output.Value
	// And also call output.Changed() if connected to other node
	node.changed = function(text, ev){
		// This node still being imported
		if(iface.importing !== false)
			return;

		console.log('The input box have new value:', text);

		// node.data.value === text;
		Output.Value = iface.data.value;

		// This will call every connected node
		Output.Changed();
	}
});

Blackprint.registerInterface('BPIC/Example/input', function(iface){
	var theValue = '...';
	iface.data = {
		set value(val){
			if(theValue === val) return;
			theValue = val;

			if(iface.node.changed !== void 0)
				iface.node.changed(val);
		},
		get value(){
			return theValue;
		}
	};
});
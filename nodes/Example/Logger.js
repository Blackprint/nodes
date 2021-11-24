Blackprint.registerNode('Example/Display/Logger',
class extends Blackprint.Node {
	input = {
		Any: Blackprint.Port.ArrayOf(null) // Any data type, and can be used for many cable
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Example/Logger');
		iface.title = "Logger";
		iface.description = 'Print anything into text';
	}

	_refreshLogger(val){
		let iface = this.iface;

		if(val === null)
			iface.log = 'null';
		else if(val === undefined)
			iface.log = 'undefined';
		else if(val.constructor === Function)
			iface.log = val.toString();
		else if(val.constructor === String || val.constructor === Number)
			iface.log = val;
		else
			iface.log = JSON.stringify(val);
	}

	init(){
		let node = this;
		let iface = this.iface;

		let Input = node.input;

		// Let's show data after new cable was connected or disconnected
		iface.on('cable.connect cable.disconnect', function(){
			Context.log('Example/Display/Logger', "A cable was changed on Logger, now refresing the input element");
			node._refreshLogger(Input.Any);
		});

		iface.input.Any.on('value', function(port){
			Context.log('Example/Display/Logger', "I connected to", port.name, "port from", port.iface.title, "that have new value:", port.value);

			// Let's take all data from all connected nodes
			// Instead showing new single data-> val
			node._refreshLogger(Input.Any);
		});
	}
});

Blackprint.registerInterface('BPIC/Example/Logger',
Context.IFace.Logger = class extends Blackprint.Interface {
	_log = '...';

	get log(){ return this._log }
	set log(val){
		this._log = val;
		Context.log("Logger Data:", val);
	}
});
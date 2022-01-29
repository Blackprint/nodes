Blackprint.registerNode('Example/Display/Logger',
class extends Blackprint.Node {
	static input = {
		Any: Blackprint.Port.ArrayOf(null) // Any data type, and can be used for many cable
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Example/Logger');
		iface.title = "Logger";
		iface.description = 'Print anything into text';
	}

	_refreshLogger(val){
		this.iface.log = JSON.stringify(val);
	}

	init(){
		let node = this;
		let iface = this.iface;

		let Input = node.input;

		// Let's show data after new cable was connected or disconnected
		iface.on('cable.connect cable.disconnect', Context.EventSlot, function(){
			Context.log('Example/Display/Logger', "A cable was changed on Logger, now refresing the input element");
			node._refreshLogger(Input.Any);
		});

		iface.input.Any.on('value', Context.EventSlot, function({ target, cable }){
			Context.log('Example/Display/Logger', "I connected to", target.name, "port from", target.iface.title, "that have new value:", cable.value);

			// Let's take all data from all connected nodes
			// Instead showing new single data-> val
			node._refreshLogger(Input.Any);
		});

		node._refreshLogger(Input.Any);
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
Blackprint.registerNode('Console/Log',
class extends Blackprint.Node {
	input = {
		Any: Blackprint.Port.ArrayOf(null) // Any data type, and can be used for many cable
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Console/Log');
		iface.title = "Log";
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
			node._refreshLogger(Input.Any);
		});

		iface.input.Any.on('value', function(ev){
			// Let's take all data from all connected nodes
			// Instead showing new single data-> val
			node._refreshLogger(Input.Any);
		});

		node._refreshLogger(Input.Any);
	}
});

Blackprint.registerInterface('BPIC/Console/Log',
Context.IFace.Logger = class extends Blackprint.Interface {
	_log = '...';

	get log(){ return this._log }
	set log(val){ this._log = val }
});
Blackprint.registerNode('Console/Log',
class extends Blackprint.Node {
	static input = {
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

		if(!Blackprint.Environment.isBrowser)
			console.log(val);

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
		let { Input } = this.ref;

		// Let's show data after new cable was connected or disconnected
		this.iface.on('cable.disconnect', Context.EventSlot, () => {
			this._refreshLogger(Input.Any);
		});
	}

	update(){
		let { Input } = this.ref;

		// Let's take all data from all connected nodes
		// Instead showing new single data-> val
		this._refreshLogger(Input.Any);
	}

	// Remote sync in
	syncIn(id, data){
		if(id === 'log')
			this.iface.log = data;
	}
});

Blackprint.registerInterface('BPIC/Console/Log',
Context.IFace.Logger = class extends Blackprint.Interface {
	_log = '...';

	get log(){ return this._log }
	set log(val){
		this._log = val;
		this.node.syncOut('log', val);
	}
});
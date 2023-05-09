/**
 * Display value from a port
 * Primitive type will be converted into a string
 * Object will be converted with JSON.stringify
 * @blackprint node
 * @summary Print anything into text
 */
Blackprint.registerNode('Console/Log',
class extends Blackprint.Node {
	static input = {
		/** Any data type, and can be used for many cable */
		Any: Blackprint.Port.ArrayOf(Blackprint.Types.Any),
	};

	// Create interface for puppet node
	// static interfaceSync = [];

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Console/Log');
		iface.title = "Log";
	}

	_refreshLogger(val){
		let iface = this.iface;

		if(!Blackprint.Environment.isBrowser)
			console.log(val);

		if(this.ref.IInput.Any.cables.length > 1)
			iface.log = JSON.stringify(val);
		else {
			let val = this.ref.Input.Any?.[0];

			if(val === null)
				iface.log = "null";
			else if(val === undefined)
				iface.log = "undefined";
			else if(typeof val === 'object')
				iface.log = JSON.stringify(val);
			else iface.log = val;
		}
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
		if(id === 'log') this.iface.log = data;
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
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
		// Let's show data after new cable was connected or disconnected
		this.iface.on('cable.disconnect', Context.EventSlot, () => {
			Context.log('Example/Display/Logger', "A cable was changed on Logger, manual update will be triggered");

			this.update();
		});

		this.iface.input.Any.on('value', Context.EventSlot, ({ target }) => {
			Context.log('Example/Display/Logger', `I connected to Result port from "${target.name}" that have value: ${target.value}`);
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

Blackprint.registerInterface('BPIC/Example/Logger',
Context.IFace.Logger = class extends Blackprint.Interface {
	_log = '...';

	// Template Binding -> https://github.com/ScarletsFiction/ScarletsFrame/wiki/Input-Binding
	get log(){ return this._log }
	set log(val){
		this._log = val;
		Context.log("Logger Data", val);
		this.node.syncOut('log', val);
	}
});
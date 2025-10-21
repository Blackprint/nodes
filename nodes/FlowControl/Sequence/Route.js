/**
 * Trigger a series of route in order
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/Sequence/Route",
class extends Blackprint.Node {
	static type = "flow-control";
	static output = {
		'0': Blackprint.Types.Route,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Sequence";
		iface.data = {total: 1};
	}

	init(){
		let node = this;
		let iface = this.iface;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title: "Create new port", callback(){
				let index = iface.data.total++;
				node.createPort('output', index, Blackprint.Types.Route);
				node.syncOut('addPort', ''+iface.data.total);

				// Let editor know if this iface changed and unsaved
				node.notifyEditorDataChanged();
			}
		}, {
			title: "Delete this port", callback(){
				node.deletePort('output', this.name);
				iface.data.total--;
				node.normalizePortIndex();
				node.syncOut('deletePort', this.name);

				// Let editor know if this iface changed and unsaved
				node.notifyEditorDataChanged();
			}
		}];

		iface.on('port.menu', Context.EventSlot, function({ port, menu }){
			let addMenu;
			if(port.name === '0')
				addMenu = [portMenu[0]];
			else addMenu = portMenu.slice(0);

			for (var i = 0; i < addMenu.length; i++) {
				// Change every callback context to refer current port
				addMenu[i].context = port;
			}

			menu.push(...addMenu);
		});

		if(iface.$el){
			iface.$el('.title .icon').prepend('<i class="fa fa-sign-in-alt"></i>');
		}
	}

	initPorts(data){
		data = Object.assign(this.iface.data, data);

		for (let i=0; i < data.total; i++) {
			this.createPort('output', String(i), Blackprint.Types.Route);
		}
	}

	async update(){
		if(this._begin) return; // Avoid multiple trigger
		this._begin = true;

		let output = this.output;
		for (let key in output)
			await output[key]();

		this._begin = false;
	}

	normalizePortIndex(){
		// Normalize ports index
		let i = 0;
		let output = this.iface.output;
		for (let key in output) {
			let port = output[key];
			if(port.name !== String(i))
				this.renamePort('output', port.name, String(i));

			i++;
		}
	}

	async syncIn(name, value){
		let iface = this.iface;
		if(name === 'deletePort') {
			this.deletePort('output', String(value));
			this.normalizePortIndex();
			iface.data.total--;
		}
		else if(name === 'addPort') {
			let total = iface.data.total;
			if(total < value) {
				for (let i = total; i < value; i++) {
					this.createPort('output', String(i), Blackprint.Types.Route);
					iface.data.total++;
				}
			}
		}
	}
});
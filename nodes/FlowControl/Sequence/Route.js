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
			}
		}, {
			title: "Delete this port", callback(){
				node.deletePort('output', this.name);
				iface.data.total--;

				// Normalize ports index
				let i = 0;
				let input = iface.input;
				for (let key in input) {
					let port = input[key];
					if(port.name !== String(i))
						node.renamePort('input', port.name, String(i));

					i++;
				}
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
});
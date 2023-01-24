/**
 * Trigger a series of route in order
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/MultiGate/Route",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** Reset the order and allow recall */
		Reset: Blackprint.Port.Trigger(port => port.iface.node.reset()),
		/** Choose outputs in random order */
		IsRandom: Blackprint.Port.Default(Boolean, false),
		/**
		 * True: will reset the order and allow recall
		 * False: will diallow port that already called
		 */
		Loop: Blackprint.Port.Default(Boolean, true),
		StartIndex: Blackprint.Port.Default(Number, 0),
	};
	static output = {
		'0': Blackprint.Types.Route,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "MultiGate";
		iface.data = {total: 1};

		this._disabled = false;
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
		if(this._disabled) return;

		let input = this.input;
		let output = this.output;
		let total = this.iface.data.total;
		this._n ??= input.StartIndex;

		if(input.IsRandom){
			if(!input.Loop){
				// ToDo: mark port that have been called and avoid recall
				// Only allow recall after reset or loop is enabled
				throw "ToDo";
			}

			await output[Math.random() * total | 0]();
			return;
		}

		let n = this._n++;
		if(this._n >= total) {
			if(!input.Loop) this._n = input.StartIndex;
			else this._disabled = true;
		}

		await output[n]();
	}

	reset(){
		this._disabled = false;
		this._n = this.input.StartIndex;
	}
});
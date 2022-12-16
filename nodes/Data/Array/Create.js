/**
 * Create a new array
 * Any input update will recreate the array
 * Reusing the outputted array is more recommended than recreate the array
 * @summary Create a new Array
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/Create',
class extends Blackprint.Node {
	static input = {
		/**
		 * You can right click this port to create a new port
		 * Delete every input port if you want to create empty object
		 */
		'0': Blackprint.Types.Any,
	};
	static output = {
		/** Array will be recreated everytime input was changed */
		Array: Array,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Create Array";
	}

	init(){
		let node = this;
		let iface = this.iface;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title:"Create input port", callback(){
				// Always create on last position -> (key, default value)
				node.createPort('input', String(iface.data.length), Blackprint.Types.Any);
				iface.data.length++;
				node.update();
			}
		}, {
			title:"Delete port", callback(){
				if(iface.data.length === 0) throw new Error("There's no input port");

				node.deletePort('input', this.name);
				iface.data.length--;

				let i = 0;
				let input = iface.input;
				for (let key in input) {
					input[key].name = String(i++);
				}

				node.update();
			}
		}];

		iface.on('port.menu', Context.EventSlot, function({ port, menu }){
			// Change callback context to refer current port
			portMenu[0].context = port;
			menu.push(portMenu[0]);

			// Show delete port only when user right clicked input port
			if(port.source === 'output') return;

			// Change callback context to refer current port
			portMenu[1].context = port;
			menu.push(portMenu[1]);
		});

		this.update();
	}

	imported(data){
		let iface = this.iface;
		if(data == null){
			iface.data = {length: 1};
			return;
		}

		this.deletePort('input', '0');
		iface.data = data;

		for (let i=0; i < data.length; i++) {
			this.createPort('input', i, Blackprint.Types.Any);
		}
	}

	update(){
		let { Input, Output } = this.ref;

		if(this.iface.data.length === 0){
			Output.Array = [];
			return;
		}

		// Copy every port data into new array
		Output.Array = Object.values(Input);
	}
});
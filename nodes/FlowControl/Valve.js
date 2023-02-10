/**
 * Pass input value to output when the condition was true
 * Output will automatically resync even value is not changed
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/Valve",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** Value to be streamed through valve */
		Value: Blackprint.Types.Any,
		/** Default value is valve was closed/false */
		Default: Blackprint.Types.Any,
	};
	static output = { };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/FlowControl/Interface');
		iface.title = "Valve";
		iface.data = {total: 1};
		iface.rightPortMargin = '38px 0 0 0';
	}

	init(){
		let node = this;
		let iface = this.iface;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title: "Create new port", callback(){
				let index = iface.data.total++;
				let out = node.createPort('output', index, Blackprint.Types.Any);
				let inp = node.createPort('input', index, Boolean);

				inp.on('value', (ev) => {
					let active = ev.cable.value;
					let input = node.input;

					out.value = active ? input.Value : input.Default;
					out.sync();
				});
			}
		}, {
			title: "Delete this port", callback(){
				node.deletePort('output', this.name);
				node.deletePort('input', this.name);
				iface.data.total--;

				// Normalize ports index
				let i = 0;
				let input = iface.input;
				for (let key in input) {
					let port = input[key];
					if(port.name === 'Value' || port.name === 'Default') continue;

					if(port.name !== String(i))
						node.renamePort('input', port.name, String(i));

					i++;
				}

				i = 0;
				let output = iface.output;
				for (let key in output) {
					let port = output[key];

					if(port.name !== String(i))
						node.renamePort('output', port.name, String(i));

					i++;
				}
			}
		}];

		iface.on('port.menu', Context.EventSlot, function({ port, menu }){
			let addMenu;
			if(port.name === 'Value' || port.name === 'Default')
				addMenu = [portMenu[0]];
			else addMenu = portMenu.slice(0);

			for (var i = 0; i < addMenu.length; i++) {
				// Change every callback context to refer current port
				addMenu[i].context = port;
			}

			menu.push(...addMenu);
		});
	}

	initPorts(data){
		data = Object.assign(this.iface.data, data);

		for (let i=0; i < data.total; i++) {
			let out = this.createPort('output', String(i), Blackprint.Types.Any);
			let inp = this.createPort('input', String(i), Boolean);

			inp.on('value', (ev) => {
				let active = ev.cable.value;
				let input = this.input;

				out.value = active ? input.Value : input.Default;
				out.sync();
			});
		}
	}
});
/**
 * Create a new object
 * Any input update will recreate the object
 * Reusing the outputted object is more recommended than recreate the object
 * @summary Create a new object
 * @blackprint node
 */
Blackprint.registerNode('Data/Object/Create',
class extends Blackprint.Node {
	static input = {
		/**
		 * You can right click this port to create or rename new port
		 * Delete every input port if you want to create empty object
		 */
		key: Blackprint.Types.Any,
	};
	static output = {
		/** Object will be recreated everytime input was changed */
		Object: Object,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Create Object";
	}

	init(){
		let node = this;
		let iface = this.iface;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title: "Create input port", async callback(){
				let { value } = await BPEditor.Dialog({
					title: 'Enter field name',
					input: 'text',
				});

				if(!value) return;

				// Always create on last position -> (key, default value)
				node.createPort('input', value, Blackprint.Types.Any);
				iface.data.list.push(value);

				node.update();

				// Let editor know if this iface changed and unsaved
				node.notifyEditorDataChanged();
			}
		}, {
			title: "Delete port", callback(){
				node.deletePort('input', this.name);

				let list = iface.data.list;
				let i = list.indexOf(this.name);

				if(i !== -1){
					list.splice(i, 1);
					node.update();
				}

				// Let editor know if this iface changed and unsaved
				node.notifyEditorDataChanged();
			}
		}];

		iface.on('port.menu', Context.EventSlot, function({ port, menu }){
			for (var i = 0; i < portMenu.length; i++) {
				// Change every callback context to refer current port
				portMenu[i].context = port;
			}

			menu.push(...portMenu);
		});

		this.update();
	}

	imported(data){
		let iface = this.iface;
		if(data == null){
			iface.data = {list: ['key']};
			return;
		}

		this.deletePort('input', 'key');
		iface.data = data;

		let list = data.list;
		for (let i=0; i < list.length; i++) {
			this.createPort('input', list[i], Blackprint.Types.Any);
		}
	}

	update(){
		let { Input, Output } = this.ref;

		if(this.iface.data.length === 0){
			Output.Object = {};
			return;
		}

		// Copy every port data into new object
		Output.Object = Object.assign({}, Input);
	}
});
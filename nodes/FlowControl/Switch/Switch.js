/**
 * Switch route flow based on input value
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/Switch/Route",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** Value for activating output route */
		Case: Blackprint.Port.Union([String, Number]),
	};
	static output = {
		/** Default route is cases doesn't match */
		"​Defa​ult": Blackprint.Types.Route, // The first and fiveth char is a zero width character
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Switch";
		iface.data = {outputs: []};
	}

	init(){
		let node = this;
		let iface = this.iface;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title: "Create new port", async callback(){
				let name = await BPEditor.Dialog({
					title: "Port name:",
					text: "This port will active when 'Case' does match with this port name",
					input: "text",
				});

				name = name.value;
				if(!name) return;

				node.createPort('output', name, Blackprint.Types.Route);
				iface.data.outputs.push(name);
			}
		}, {
			title: "Delete this port", callback(){
				let outputs = iface.data.outputs;
				let i = outputs.indexOf(this.name);

				if(i === -1) return;
				outputs.splice(i, 1);
				node.deletePort('output', this.name);
			}
		}];

		iface.on('port.menu', Context.EventSlot, function({ port, menu }){
			let addMenu;
			if(port.name === 'Case')
				addMenu = [portMenu[0]];
			else addMenu = portMenu.slice(0);

			for (var i = 0; i < addMenu.length; i++) {
				// Change every callback context to refer current port
				addMenu[i].context = port;
			}

			menu.push(...addMenu);
		});

		if(iface.$el){
			iface.$el('.title .icon').prepend('<i class="fa fa-random"></i>');
		}
	}

	initPorts(data){
		data = Object.assign(this.iface.data, data);
		let outputs = data.outputs;

		for (let i=0; i < outputs.length; i++) {
			this.createPort('output', outputs[i], Blackprint.Types.Route);
		}
	}

	update(){
		let Case = String(this.input.Case);
		if(!Case) return;

		let route = this.output[Case];
		if(route) route();
		else this.output["​Defa​ult"]();
	}
});
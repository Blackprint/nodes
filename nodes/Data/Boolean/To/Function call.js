Blackprint.registerNode("Data/Boolean/To/Function call",
class EmptyNode extends Blackprint.Node {
	static input = { Value: Boolean };
	static output = { Call: Function };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Boolean to function call";

		iface.data = {signal: true};
	}

	update(){
		if(this.ref.Input.Value === this.iface.data.signal)
			this.ref.Output.Call();
	}
});

// Register with default interface
Blackprint.registerInterface("BPIC/Data/Minimal", class extends Blackprint.Interface {});
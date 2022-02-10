Blackprint.registerNode("Data/Any/To/Trigger",
class EmptyNode extends Blackprint.Node {
	static input = { Value: null };
	static output = { Call: Function };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Trigger on any data changes";
		iface.element = document.createTextNode('Fx()');
	}

	update(){
		this.ref.Output.Call();
	}
});

// Register with default interface
Blackprint.registerInterface("BPIC/Data/Minimal", class extends Blackprint.Interface {});
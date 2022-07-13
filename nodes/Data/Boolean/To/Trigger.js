Blackprint.registerNode("Data/Boolean/To/Trigger",
class EmptyNode extends Blackprint.Node {
	static input = { Value: Boolean };
	static output = { Call: Function };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Trigger on true";
		iface.data = {signal: true};
	}

	createIcon(){
		return document.createTextNode('Fx()');
	}

	update(){
		if(this.ref.Input.Value === this.iface.data.signal)
			this.ref.Output.Call();
	}
});
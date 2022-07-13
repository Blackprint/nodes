Blackprint.registerNode("Data/Any/To/Trigger",
class EmptyNode extends Blackprint.Node {
	static input = { Value: Blackprint.Types.Any };
	static output = { Call: Function };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Trigger on any data changes";
	}

	update(){
		this.ref.Output.Call();
	}
});
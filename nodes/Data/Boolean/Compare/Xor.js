Blackprint.registerNode("Data/Boolean/Compare/Xor",
class EmptyNode extends Blackprint.Node {
	static input = { "0": Boolean, "1": Boolean };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Boolean: Xor";
	}

	createIcon(){
		return document.createTextNode('Xor');
	}

	update(){
		let ref = this.ref;
		ref.Output.Value = ref.Input["0"] !== ref.Input["1"];
	}
});
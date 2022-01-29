Blackprint.registerNode("Data/Boolean/Or",
class EmptyNode extends Blackprint.Node {
	static input = { "0": Boolean, "1": Boolean };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Boolean: Or";
	}

	update(){
		let ref = this.ref;
		ref.Output.Value = ref.Input["0"] || ref.Input["1"];
	}
});
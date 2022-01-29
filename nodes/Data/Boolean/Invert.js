Blackprint.registerNode("Data/Boolean/Invert",
class EmptyNode extends Blackprint.Node {
	static input = { Value: Boolean };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Invert Boolean";
	}

	update(){
		let ref = this.ref;
		ref.Output.Value = !ref.Input.Value;
	}
});
Blackprint.registerNode("Data/String/To/LowerCase",
class EmptyNode extends Blackprint.Node {
	static input = { String: String };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "To LowerCase";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {String} = ref.Input;

		if(String == null) return;
		ref.Output.Result = String.toUpperCase();
	}
});
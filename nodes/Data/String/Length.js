Blackprint.registerNode("Data/String/Length",
class EmptyNode extends Blackprint.Node {
	static input = { String: String };
	static output = { Length: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "String: Length";
		iface.w = 95;
	}

	createIcon(){
		return document.createTextNode('Length');
	}

	update(){
		let ref = this.ref;
		let { String } = ref.Input;

		if(String == null) return;
		ref.Output.Length = String.length;
	}
});
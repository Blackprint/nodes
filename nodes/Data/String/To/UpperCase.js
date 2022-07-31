/**
 * Return uppercased letters
 * @blackprint node
 */
Blackprint.registerNode("Data/String/To/UpperCase",
class UpperCase extends Blackprint.Node {
	static input = { In: String };
	static output = { Out: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "To UpperCase";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let { In } = ref.Input;

		if(In == null) return;
		ref.Output.Out = In.toUpperCase();
	}
});
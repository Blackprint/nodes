/**
 * Fill string with string (padding) on left (starts)
 * if the text is less than specified length
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Padding/Start",
class extends Blackprint.Node {
	static input = { A: String, B: Number };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Padding Start";
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Result = A.padStart(B);
	}
});
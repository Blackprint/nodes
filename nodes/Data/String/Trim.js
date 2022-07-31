/**
 * Trim white space from a string at the start and end of string
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Trim",
class extends Blackprint.Node {
	static input = { String: String };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Trim";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {String} = ref.Input;

		if(String == null) return;
		ref.Output.Result = String.trim();
	}
});
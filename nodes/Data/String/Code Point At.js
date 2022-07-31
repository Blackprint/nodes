/**
 * Get char point from a string at index
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Code Point At",
class extends Blackprint.Node {
	static input = { String: String, Index: Number };
	static output = { Result: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Code Point At";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {String, Index} = ref.Input;

		if(String == null || Index == null) return;
		ref.Output.Result = String.codePointAt(Index);
	}
});
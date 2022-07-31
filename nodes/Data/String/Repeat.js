/**
 * Repeat the string few times
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Repeat",
class extends Blackprint.Node {
	static input = { String: String, Count: Number };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Repeat";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {String, Count} = ref.Input;

		if(String == null || Count == null) return;
		ref.Output.Result = String.repeat(Count);
	}
});
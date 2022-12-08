/**
 * Return true if the string have a specified
 * string at the beginning of the string
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/StartsWith",
class extends Blackprint.Node {
	static input = { Haystack: String, Needle: String };
	static output = { Result: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Starts With";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Result = Haystack.startsWith(Needle);
	}
});
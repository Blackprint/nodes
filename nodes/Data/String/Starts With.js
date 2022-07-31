/**
 * Return true if the string have a specified
 * string at the beginning of the string
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Starts With",
class extends Blackprint.Node {
	static input = { Haystack: String, Needle: String };
	static output = { Result: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Starts With";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Result = Haystack.startsWith(Needle);
	}
});
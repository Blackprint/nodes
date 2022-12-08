/**
 * Return index of specified string on a string
 * This will return -1 if not exist
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/IndexOf",
class extends Blackprint.Node {
	static input = { Haystack: String, Needle: String };
	static output = { Index: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Index Of";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Index = Haystack.indexOf(Needle);
	}
});
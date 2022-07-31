/**
 * Return the last index of specified string on a string
 * This will return -1 if not exist
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Last Index Of",
class extends Blackprint.Node {
	static input = { Haystack: String, Needle: String };
	static output = { Index: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Last Index Of";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Index = Haystack.lastIndexOf(Needle);
	}
});
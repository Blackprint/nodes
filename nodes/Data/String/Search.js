/**
 * Find index from a string with RegExp
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Search",
class extends Blackprint.Node {
	static input = {
		Haystack: String,
		Needle: Blackprint.Port.Union([String, RegExp])
	};

	static output = { Index: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Search";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Index = Haystack.search(Needle);
	}
});